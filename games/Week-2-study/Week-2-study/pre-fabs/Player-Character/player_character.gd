extends CharacterBody2D

@export var speed: float = 200.0
@export var boundaries: TileMapLayer

const HALF_WIDTH := 24.0
const HALF_HEIGHT := 40.0

func _ready() -> void:
	if not boundaries:
		boundaries = get_node_or_null("../PlayerBoundaries")
	if boundaries:
		print("PlayerCharacter: Found boundaries at ", boundaries.get_path())
	else:
		print("PlayerCharacter: WARNING - No boundaries found!")

func _is_movement_blocked(pos: Vector2) -> bool:
	if not boundaries:
		return false
	# Check all 4 corners of collision box
	var corners := [
		pos + Vector2(-HALF_WIDTH, -HALF_HEIGHT),  # top-left
		pos + Vector2(HALF_WIDTH, -HALF_HEIGHT),   # top-right
		pos + Vector2(-HALF_WIDTH, HALF_HEIGHT),   # bottom-left
		pos + Vector2(HALF_WIDTH, HALF_HEIGHT),    # bottom-right
	]
	for corner in corners:
		if boundaries.is_blocked(corner):
			return true
	return false

func _physics_process(delta: float) -> void:
	var direction := Vector2.ZERO

	if Input.is_action_pressed("ui_left") or Input.is_key_pressed(KEY_A):
		direction.x -= 1
	if Input.is_action_pressed("ui_right") or Input.is_key_pressed(KEY_D):
		direction.x += 1
	if Input.is_action_pressed("ui_up") or Input.is_key_pressed(KEY_W):
		direction.y -= 1
	if Input.is_action_pressed("ui_down") or Input.is_key_pressed(KEY_S):
		direction.y += 1

	if direction != Vector2.ZERO:
		direction = direction.normalized()

	velocity = direction * speed

	if boundaries:
		var next_pos := global_position + velocity * delta
		if _is_movement_blocked(next_pos):
			var next_x := global_position + Vector2(velocity.x * delta, 0)
			var next_y := global_position + Vector2(0, velocity.y * delta)
			if _is_movement_blocked(next_x):
				velocity.x = 0
			if _is_movement_blocked(next_y):
				velocity.y = 0

	move_and_slide()
