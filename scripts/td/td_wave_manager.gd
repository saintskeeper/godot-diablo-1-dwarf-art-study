extends Node
class_name TDWaveManager

signal wave_started(wave_number: int)
signal wave_completed(wave_number: int)
signal enemy_spawned(enemy: TDEnemy)
signal enemy_died(enemy: TDEnemy)
signal enemy_reached_goal(enemy: TDEnemy)
signal all_waves_completed()

@export var spawn_delay: float = 0.5
@export var wave_delay: float = 3.0
@export var auto_start_waves: bool = false

var grid: TDGrid
var enemy_scenes: Dictionary = {}
var enemies_container: Node2D

var current_wave: int = 0
var waves_data: Array[Dictionary] = []
var active_enemies: Array[TDEnemy] = []
var is_spawning: bool = false
var spawn_queue: Array[Dictionary] = []

var spawn_timer: Timer
var wave_timer: Timer


func _ready() -> void:
	spawn_timer = Timer.new()
	spawn_timer.one_shot = true
	spawn_timer.timeout.connect(_on_spawn_timer_timeout)
	add_child(spawn_timer)

	wave_timer = Timer.new()
	wave_timer.one_shot = true
	wave_timer.timeout.connect(_on_wave_timer_timeout)
	add_child(wave_timer)


func setup(td_grid: TDGrid, level_data: TDLevelData, container: Node2D) -> void:
	grid = td_grid
	enemies_container = container
	waves_data.clear()

	for wave_dict in level_data.waves:
		waves_data.append(wave_dict)

	if auto_start_waves and waves_data.size() > 0:
		start_wave()


func register_enemy_scene(enemy_id: String, scene: PackedScene) -> void:
	enemy_scenes[enemy_id] = scene


func start_wave(wave_number: int = -1) -> void:
	if wave_number >= 0:
		current_wave = wave_number
	else:
		current_wave += 1

	if current_wave > waves_data.size():
		all_waves_completed.emit()
		return

	var wave_index = current_wave - 1
	if wave_index < 0 or wave_index >= waves_data.size():
		return

	var wave = waves_data[wave_index]
	_build_spawn_queue(wave)

	is_spawning = true
	wave_started.emit(current_wave)
	_spawn_next_enemy()


func start_all_waves() -> void:
	current_wave = 0
	start_wave()


func pause_spawning() -> void:
	is_spawning = false
	spawn_timer.stop()


func resume_spawning() -> void:
	if spawn_queue.size() > 0:
		is_spawning = true
		_spawn_next_enemy()


func _build_spawn_queue(wave: Dictionary) -> void:
	spawn_queue.clear()
	var groups = wave.get("groups", [])

	for group in groups:
		var enemy_type = group.get("type", "enemy_01")
		var count = group.get("count", 1)
		var delay = group.get("delay", spawn_delay)
		var spawn_index = group.get("spawn_index", 0)

		for i in range(count):
			spawn_queue.append({
				"type": enemy_type,
				"delay": delay,
				"spawn_index": spawn_index
			})


func _spawn_next_enemy() -> void:
	if spawn_queue.is_empty():
		is_spawning = false
		_check_wave_completion()
		return

	var spawn_data = spawn_queue.pop_front()
	var spawn_cell = _get_spawn_cell(spawn_data.spawn_index)

	if spawn_cell:
		var enemy = _create_enemy(spawn_data.type, spawn_cell)
		if enemy:
			_setup_enemy_path(enemy, spawn_cell)

	if spawn_queue.size() > 0:
		var next_delay = spawn_queue[0].delay if spawn_queue.size() > 0 else spawn_delay
		spawn_timer.start(next_delay)
	else:
		is_spawning = false
		_check_wave_completion()


func _get_spawn_cell(spawn_index: int) -> TDGridCell:
	if grid.spawn_cells.is_empty():
		return null

	spawn_index = clamp(spawn_index, 0, grid.spawn_cells.size() - 1)
	return grid.spawn_cells[spawn_index]


func _create_enemy(enemy_type: String, spawn_cell: TDGridCell) -> TDEnemy:
	if not enemy_scenes.has(enemy_type):
		push_warning("TDWaveManager: Unknown enemy type '%s'" % enemy_type)
		return null

	var scene = enemy_scenes[enemy_type]
	var enemy = scene.instantiate() as TDEnemy

	if enemy:
		enemy.global_position = spawn_cell.get_world_center()
		enemies_container.add_child(enemy)
		active_enemies.append(enemy)

		enemy.died.connect(_on_enemy_died.bind(enemy))
		enemy.reached_goal.connect(_on_enemy_reached_goal.bind(enemy))

		enemy_spawned.emit(enemy)

	return enemy


func _setup_enemy_path(enemy: TDEnemy, spawn_cell: TDGridCell) -> void:
	var path = grid.get_path_to_goal(spawn_cell)
	if path.size() > 0:
		enemy.set_path(path)


func _on_enemy_died(enemy: TDEnemy) -> void:
	active_enemies.erase(enemy)
	enemy_died.emit(enemy)
	_check_wave_completion()


func _on_enemy_reached_goal(enemy: TDEnemy) -> void:
	active_enemies.erase(enemy)
	enemy_reached_goal.emit(enemy)
	_check_wave_completion()


func _check_wave_completion() -> void:
	if not is_spawning and spawn_queue.is_empty() and active_enemies.is_empty():
		wave_completed.emit(current_wave)

		if current_wave < waves_data.size():
			wave_timer.start(wave_delay)
		else:
			all_waves_completed.emit()


func _on_spawn_timer_timeout() -> void:
	if is_spawning:
		_spawn_next_enemy()


func _on_wave_timer_timeout() -> void:
	if auto_start_waves:
		start_wave()


func is_wave_active() -> bool:
	return is_spawning or active_enemies.size() > 0


func get_remaining_enemies() -> int:
	return spawn_queue.size() + active_enemies.size()


func get_total_waves() -> int:
	return waves_data.size()


func get_enemies_in_range(world_pos: Vector2, radius: float) -> Array[TDEnemy]:
	var result: Array[TDEnemy] = []

	for enemy in active_enemies:
		if is_instance_valid(enemy) and enemy.is_alive:
			if world_pos.distance_to(enemy.global_position) <= radius:
				result.append(enemy)

	return result
