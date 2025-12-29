extends Node2D
class_name AimCursor

@export var cursor_distance: float = 150.0
@export var stick_deadzone: float = 0.2
@export var cursor_speed: float = 500.0
@export var use_mouse_fallback: bool = true

var aim_direction: Vector2 = Vector2.RIGHT
var is_using_controller: bool = false

@onready var player: CharacterBody2D = get_parent()


func _process(delta: float) -> void:
	var stick_input := _get_right_stick_input()

	if stick_input.length() > stick_deadzone:
		is_using_controller = true
		aim_direction = stick_input.normalized()
	elif use_mouse_fallback and not is_using_controller:
		_update_from_mouse()

	position = aim_direction * cursor_distance


func _input(event: InputEvent) -> void:
	if event is InputEventMouseMotion or event is InputEventMouseButton:
		is_using_controller = false


func _get_right_stick_input() -> Vector2:
	return Vector2(
		Input.get_joy_axis(0, JOY_AXIS_RIGHT_X),
		Input.get_joy_axis(0, JOY_AXIS_RIGHT_Y)
	)


func _update_from_mouse() -> void:
	var mouse_pos := get_global_mouse_position()
	var to_mouse := mouse_pos - player.global_position
	if to_mouse.length() > 10.0:
		aim_direction = to_mouse.normalized()


func get_aim_direction() -> Vector2:
	return aim_direction


func get_aim_target() -> Vector2:
	return player.global_position + aim_direction * cursor_distance
