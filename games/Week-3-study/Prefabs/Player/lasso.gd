extends Node2D
class_name Lasso

signal lasso_attached(target: Node2D)
signal lasso_released
signal lasso_hit_enemy(enemy: Node2D)

@export var max_range: float = 400.0
@export var throw_speed: float = 1500.0
@export var swing_force: float = 800.0
@export var rope_color: Color = Color(0.6, 0.4, 0.2)
@export var rope_width: float = 3.0

enum State { IDLE, THROWING, ATTACHED, RETRACTING }
var current_state: State = State.IDLE

var attached_point: Vector2 = Vector2.ZERO
var attached_target: Node2D = null
var rope_length: float = 0.0
var lasso_tip: Vector2 = Vector2.ZERO

@onready var player: CharacterBody2D = get_parent()
@onready var aim_cursor: AimCursor = $"../AimCursor"
@onready var line: Line2D = $Line2D
@onready var raycast: RayCast2D = $RayCast2D


func _ready() -> void:
	line.default_color = rope_color
	line.width = rope_width
	line.visible = false
	raycast.enabled = false


func _process(_delta: float) -> void:
	_update_rope_visual()


func _physics_process(delta: float) -> void:
	match current_state:
		State.THROWING:
			_process_throwing(delta)
		State.ATTACHED:
			_process_swinging(delta)
		State.RETRACTING:
			_process_retracting(delta)


func _input(event: InputEvent) -> void:
	if event.is_action_pressed("lasso"):
		if current_state == State.IDLE:
			_throw_lasso()
		elif current_state == State.ATTACHED:
			release()
	elif event.is_action_released("lasso"):
		if current_state == State.ATTACHED:
			release()


func _throw_lasso() -> void:
	current_state = State.THROWING
	lasso_tip = player.global_position
	line.visible = true

	raycast.enabled = true
	raycast.target_position = aim_cursor.get_aim_direction() * max_range


func _process_throwing(delta: float) -> void:
	var direction := aim_cursor.get_aim_direction()
	lasso_tip += direction * throw_speed * delta

	var distance := player.global_position.distance_to(lasso_tip)
	if distance >= max_range:
		_start_retract()
		return

	raycast.global_position = player.global_position
	raycast.target_position = lasso_tip - player.global_position
	raycast.force_raycast_update()

	if raycast.is_colliding():
		var collider := raycast.get_collider()
		var point := raycast.get_collision_point()

		if collider.is_in_group("swing_ring"):
			_attach_to_point(point, collider)
		elif collider.is_in_group("enemy"):
			lasso_hit_enemy.emit(collider)
			_start_retract()
		else:
			_start_retract()


func _attach_to_point(point: Vector2, target: Node2D = null) -> void:
	current_state = State.ATTACHED
	attached_point = point
	attached_target = target
	rope_length = player.global_position.distance_to(point)
	raycast.enabled = false
	lasso_attached.emit(target)


func _process_swinging(delta: float) -> void:
	if attached_target and not is_instance_valid(attached_target):
		release()
		return

	if attached_target:
		attached_point = attached_target.global_position

	var to_anchor := attached_point - player.global_position
	var distance := to_anchor.length()

	if distance > rope_length:
		var correction := to_anchor.normalized() * (distance - rope_length)
		player.global_position += correction

		var tangent := Vector2(-to_anchor.y, to_anchor.x).normalized()
		var swing_input := Input.get_axis("move_left", "move_right")

		if swing_input != 0:
			player.velocity += tangent * swing_input * swing_force * delta

		var radial_velocity := player.velocity.dot(to_anchor.normalized())
		if radial_velocity > 0:
			player.velocity -= to_anchor.normalized() * radial_velocity


func _start_retract() -> void:
	current_state = State.RETRACTING


func _process_retracting(delta: float) -> void:
	lasso_tip = lasso_tip.move_toward(player.global_position, throw_speed * delta)

	if lasso_tip.distance_to(player.global_position) < 10.0:
		current_state = State.IDLE
		line.visible = false
		raycast.enabled = false


func release() -> void:
	current_state = State.RETRACTING
	attached_target = null
	lasso_tip = attached_point
	lasso_released.emit()


func _update_rope_visual() -> void:
	if not line.visible:
		return

	line.clear_points()
	line.add_point(Vector2.ZERO)

	match current_state:
		State.THROWING, State.RETRACTING:
			line.add_point(lasso_tip - player.global_position)
		State.ATTACHED:
			line.add_point(attached_point - player.global_position)


func is_swinging() -> bool:
	return current_state == State.ATTACHED
