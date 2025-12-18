extends Node2D
class_name TDGame

signal lives_changed(lives: int)
signal gold_changed(gold: int)
signal game_over(victory: bool)

@export var level_data: TDLevelData
@export var tower_scenes: Array[PackedScene] = []

@export_group("Enemy Registration")
@export var enemy_scene_ids: Array[String] = ["enemy_01"]
@export var enemy_scene_list: Array[PackedScene] = []

@onready var grid: TDGrid = $TDGrid
@onready var wave_manager: TDWaveManager = $TDWaveManager
@onready var enemies_container: Node2D = $Enemies

var lives: int = 20
var gold: int = 100
var selected_tower_index: int = -1


func _ready() -> void:
	_connect_signals()

	if level_data:
		_load_level(level_data)
	else:
		_create_default_level()


func _connect_signals() -> void:
	grid.cell_clicked.connect(_on_cell_clicked)
	wave_manager.enemy_reached_goal.connect(_on_enemy_reached_goal)
	wave_manager.enemy_died.connect(_on_enemy_died)
	wave_manager.wave_completed.connect(_on_wave_completed)
	wave_manager.all_waves_completed.connect(_on_all_waves_completed)


func _load_level(data: TDLevelData) -> void:
	lives = data.starting_lives
	gold = data.starting_gold

	grid.generate_from_level_data(data)

	_register_enemy_scenes()
	wave_manager.setup(grid, data, enemies_container)

	lives_changed.emit(lives)
	gold_changed.emit(gold)


func _create_default_level() -> void:
	grid.initialize_grid()

	for col in range(grid.grid_cols):
		grid.set_cell_type(col, 3, TDGridCell.CellType.PATH)
		grid.set_cell_type(col, 4, TDGridCell.CellType.PATH)

	grid.set_cell_type(0, 3, TDGridCell.CellType.SPAWN)
	grid.set_cell_type(0, 4, TDGridCell.CellType.SPAWN)
	grid.set_cell_type(grid.grid_cols - 1, 3, TDGridCell.CellType.GOAL)
	grid.set_cell_type(grid.grid_cols - 1, 4, TDGridCell.CellType.GOAL)

	grid.recalculate_paths()

	_register_enemy_scenes()

	var default_level = TDLevelData.new()
	default_level.waves = [
		{"groups": [{"type": "enemy_01", "count": 5, "delay": 0.8}]},
		{"groups": [{"type": "enemy_01", "count": 8, "delay": 0.6}]},
		{"groups": [{"type": "enemy_01", "count": 12, "delay": 0.4}]}
	]
	wave_manager.setup(grid, default_level, enemies_container)


func _register_enemy_scenes() -> void:
	for i in range(min(enemy_scene_ids.size(), enemy_scene_list.size())):
		wave_manager.register_enemy_scene(enemy_scene_ids[i], enemy_scene_list[i])


func select_tower(index: int) -> void:
	selected_tower_index = index


func start_waves() -> void:
	wave_manager.start_all_waves()


func start_next_wave() -> void:
	wave_manager.start_wave()


func _on_cell_clicked(grid_pos: Vector2i, cell: TDGridCell) -> void:
	if selected_tower_index < 0 or selected_tower_index >= tower_scenes.size():
		return

	if not cell.is_buildable:
		return

	var tower_scene = tower_scenes[selected_tower_index]
	var tower = tower_scene.instantiate() as TDTower

	if grid.place_tower(grid_pos.x, grid_pos.y, tower):
		tower.setup(grid, grid_pos, wave_manager)


func _on_enemy_reached_goal(enemy: TDEnemy) -> void:
	lives -= 1
	lives_changed.emit(lives)

	if lives <= 0:
		_end_game(false)


func _on_enemy_died(enemy: TDEnemy) -> void:
	gold += enemy.gold_reward
	gold_changed.emit(gold)


func _on_wave_completed(wave_number: int) -> void:
	pass


func _on_all_waves_completed() -> void:
	if lives > 0:
		_end_game(true)


func _end_game(victory: bool) -> void:
	game_over.emit(victory)
