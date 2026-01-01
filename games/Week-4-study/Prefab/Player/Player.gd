extends RigidBody3D

@export var move_force := 500.0
@export var max_speed := 8.0
@export var jump_impulse := 8.0
@export var mouse_sensitivity := 0.002

@onready var camera: Camera3D = $Camera3D

var _grounded := false


func _ready() -> void:
	Input.mouse_mode = Input.MOUSE_MODE_CAPTURED
	can_sleep = false
	axis_lock_angular_x = true
	axis_lock_angular_z = true


func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventMouseMotion:
		rotate_y(-event.relative.x * mouse_sensitivity)
		camera.rotate_x(-event.relative.y * mouse_sensitivity)
		camera.rotation.x = clamp(camera.rotation.x, -PI / 2, PI / 2)

	if event is InputEventKey and event.keycode == KEY_ESCAPE:
		Input.mouse_mode = Input.MOUSE_MODE_VISIBLE


func _physics_process(_delta: float) -> void:
	_check_grounded()

	if Input.is_key_pressed(KEY_SPACE) and _grounded:
		apply_central_impulse(Vector3.UP * jump_impulse)

	var input_dir := Vector2.ZERO
	if Input.is_key_pressed(KEY_W) or Input.is_key_pressed(KEY_UP):
		input_dir.y -= 1
	if Input.is_key_pressed(KEY_S) or Input.is_key_pressed(KEY_DOWN):
		input_dir.y += 1
	if Input.is_key_pressed(KEY_A) or Input.is_key_pressed(KEY_LEFT):
		input_dir.x -= 1
	if Input.is_key_pressed(KEY_D) or Input.is_key_pressed(KEY_RIGHT):
		input_dir.x += 1

	input_dir = input_dir.normalized()
	var direction := (transform.basis * Vector3(input_dir.x, 0, input_dir.y)).normalized()

	if direction:
		var flat_velocity := Vector3(linear_velocity.x, 0, linear_velocity.z)
		if flat_velocity.length() < max_speed:
			apply_central_force(direction * move_force)


func _check_grounded() -> void:
	var space_state := get_world_3d().direct_space_state
	var query := PhysicsRayQueryParameters3D.create(
		global_position,
		global_position + Vector3.DOWN * 0.6,
		1,
		[get_rid()]
	)
	var result := space_state.intersect_ray(query)
	_grounded = result.size() > 0
