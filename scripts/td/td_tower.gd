extends Node2D
class_name TDTower

signal target_acquired(target: TDEnemy)
signal target_lost()
signal attacked(target: TDEnemy)

enum TargetMode { FIRST, LAST, CLOSEST, STRONGEST, WEAKEST }

@export var max_hp: int = 5
@export var attack_range: float = 150.0
@export var attack_damage: int = 1
@export var attack_rate: float = 1.0
@export var projectile_scene: PackedScene
@export var target_mode: TargetMode = TargetMode.FIRST

var hp: int
var grid_position: Vector2i = Vector2i.ZERO
var grid_ref: TDGrid
var wave_manager: TDWaveManager

var current_target: TDEnemy
var attack_timer: float = 0.0

@onready var hp_fill: ColorRect = $HPBar/HPFill


func _ready() -> void:
	hp = max_hp
	update_hp_bar()


func _process(delta: float) -> void:
	if not wave_manager:
		return

	if not _is_target_valid():
		_find_new_target()

	if current_target:
		attack_timer += delta
		if attack_timer >= attack_rate:
			attack_timer = 0.0
			attack(current_target)


func setup(td_grid: TDGrid, pos: Vector2i, manager: TDWaveManager) -> void:
	grid_ref = td_grid
	grid_position = pos
	wave_manager = manager


func _is_target_valid() -> bool:
	if not is_instance_valid(current_target):
		return false
	if not current_target.is_alive:
		return false
	if global_position.distance_to(current_target.global_position) > attack_range:
		return false
	return true


func _find_new_target() -> void:
	if current_target:
		target_lost.emit()
		current_target = null

	var enemies = _get_enemies_in_range()
	if enemies.is_empty():
		return

	current_target = _select_target(enemies)
	if current_target:
		target_acquired.emit(current_target)


func _get_enemies_in_range() -> Array[TDEnemy]:
	if not wave_manager:
		return []
	return wave_manager.get_enemies_in_range(global_position, attack_range)


func _select_target(enemies: Array[TDEnemy]) -> TDEnemy:
	if enemies.is_empty():
		return null

	match target_mode:
		TargetMode.FIRST:
			return _get_first_enemy(enemies)
		TargetMode.LAST:
			return _get_last_enemy(enemies)
		TargetMode.CLOSEST:
			return _get_closest_enemy(enemies)
		TargetMode.STRONGEST:
			return _get_strongest_enemy(enemies)
		TargetMode.WEAKEST:
			return _get_weakest_enemy(enemies)

	return enemies[0]


func _get_first_enemy(enemies: Array[TDEnemy]) -> TDEnemy:
	var best: TDEnemy = null
	var best_distance: float = -1.0

	for enemy in enemies:
		if enemy.distance_traveled > best_distance:
			best_distance = enemy.distance_traveled
			best = enemy

	return best


func _get_last_enemy(enemies: Array[TDEnemy]) -> TDEnemy:
	var best: TDEnemy = null
	var best_distance: float = INF

	for enemy in enemies:
		if enemy.distance_traveled < best_distance:
			best_distance = enemy.distance_traveled
			best = enemy

	return best


func _get_closest_enemy(enemies: Array[TDEnemy]) -> TDEnemy:
	var best: TDEnemy = null
	var best_dist: float = INF

	for enemy in enemies:
		var dist = global_position.distance_to(enemy.global_position)
		if dist < best_dist:
			best_dist = dist
			best = enemy

	return best


func _get_strongest_enemy(enemies: Array[TDEnemy]) -> TDEnemy:
	var best: TDEnemy = null
	var best_hp: int = -1

	for enemy in enemies:
		if enemy.hp > best_hp:
			best_hp = enemy.hp
			best = enemy

	return best


func _get_weakest_enemy(enemies: Array[TDEnemy]) -> TDEnemy:
	var best: TDEnemy = null
	var best_hp: int = INF

	for enemy in enemies:
		if enemy.hp < best_hp:
			best_hp = enemy.hp
			best = enemy

	return best


func attack(target: TDEnemy) -> void:
	if not target or not target.is_alive:
		return

	if projectile_scene:
		_spawn_projectile(target)
	else:
		target.take_damage(attack_damage)

	attacked.emit(target)


func _spawn_projectile(target: TDEnemy) -> void:
	var projectile = projectile_scene.instantiate() as Projectile
	if projectile:
		projectile.target = target
		projectile.damage = attack_damage
		projectile.global_position = global_position
		get_tree().current_scene.add_child(projectile)


func take_damage(amount: int) -> bool:
	hp -= amount
	update_hp_bar()
	if hp <= 0:
		queue_free()
		return true
	return false


func update_hp_bar() -> void:
	if hp_fill:
		var hp_percent = float(hp) / float(max_hp)
		hp_fill.scale.x = hp_percent
