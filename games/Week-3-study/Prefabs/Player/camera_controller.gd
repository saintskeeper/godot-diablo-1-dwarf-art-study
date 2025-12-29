extends Camera2D

@export var look_ahead_distance: float = 150.0
@export var look_ahead_speed: float = 3.0
@export var vertical_offset: float = -96.0

var target_offset: float = 0.0
var current_offset: float = 0.0


func _ready() -> void:
	position.y = vertical_offset


func _process(delta: float) -> void:
	var player := get_parent() as CharacterBody2D
	if not player:
		return

	# Get facing direction from player
	var facing: int = player.get("facing_direction")
	if facing == null:
		facing = 1

	# Calculate target look-ahead based on facing direction
	target_offset = facing * look_ahead_distance

	# Smoothly interpolate to target offset
	current_offset = lerp(current_offset, target_offset, look_ahead_speed * delta)

	# Apply horizontal offset
	position.x = current_offset
	position.y = vertical_offset
