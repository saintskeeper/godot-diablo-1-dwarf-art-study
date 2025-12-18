extends Node2D
class_name TDEnemy

signal died(enemy: TDEnemy)
signal reached_goal(enemy: TDEnemy)
signal damaged(enemy: TDEnemy, amount: int)

@export var move_speed: float = 100.0
@export var attack_damage: int = 1
@export var attack_rate: float = 1.0
@export var attack_range: float = 50.0
@export var max_hp: int = 3
@export var gold_reward: int = 10

var hp: int
var is_alive: bool = true
var attack_timer: float = 0.0

var path: PackedVector2Array = PackedVector2Array()
var path_index: int = 0
var distance_traveled: float = 0.0

var target: Node2D

@onready var hp_fill: ColorRect = $HPBar/HPFill


func _ready() -> void:
	hp = max_hp
	update_hp_bar()


func _process(delta: float) -> void:
	if not is_alive:
		return

	if path.size() > 0:
		_follow_path(delta)
	elif is_instance_valid(target):
		_move_to_target(delta)


func set_path(new_path: PackedVector2Array) -> void:
	path = new_path
	path_index = 0
	distance_traveled = 0.0


func _follow_path(delta: float) -> void:
	if path_index >= path.size():
		_on_reached_goal()
		return

	var target_pos = path[path_index]
	var direction = (target_pos - global_position).normalized()
	var move_distance = move_speed * delta

	global_position += direction * move_distance
	distance_traveled += move_distance

	if global_position.distance_to(target_pos) < 5.0:
		path_index += 1
		if path_index >= path.size():
			_on_reached_goal()


func _move_to_target(delta: float) -> void:
	var distance = global_position.distance_to(target.global_position)

	if distance > attack_range:
		var direction = (target.global_position - global_position).normalized()
		global_position += direction * move_speed * delta
	else:
		attack_timer += delta
		if attack_timer >= attack_rate:
			attack_timer = 0.0
			attack_target()


func _on_reached_goal() -> void:
	reached_goal.emit(self)
	_die()


func attack_target() -> void:
	if target and target.has_method("take_damage"):
		target.take_damage(attack_damage)


func take_damage(amount: int) -> bool:
	if not is_alive:
		return false

	hp -= amount
	update_hp_bar()
	damaged.emit(self, amount)

	if hp <= 0:
		_die()
		return true
	return false


func _die() -> void:
	if not is_alive:
		return

	is_alive = false
	died.emit(self)
	queue_free()


func update_hp_bar() -> void:
	if hp_fill:
		var hp_percent = float(hp) / float(max_hp)
		hp_fill.scale.x = hp_percent
