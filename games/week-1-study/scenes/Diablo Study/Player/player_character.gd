extends CharacterBody2D

@onready var sprite: AnimatedSprite2D = $AnimatedSprite2D

@export var fade_duration: float = 0.3
var is_fading: bool = false
var last_frame: int = -1

func _ready() -> void:
	sprite.frame_changed.connect(_on_frame_changed)
	sprite.play("walk")

func _on_frame_changed() -> void:
	var total_frames = sprite.sprite_frames.get_frame_count("walk")
	var current_frame = sprite.frame

	# Detect when animation loops (went from last frame to first)
	if last_frame == total_frames - 1 and current_frame == 0 and not is_fading:
		is_fading = true
		_do_fade_cycle()

	last_frame = current_frame

func _do_fade_cycle() -> void:
	# Pause and fade out
	sprite.pause()
	sprite.frame = sprite.sprite_frames.get_frame_count("walk") - 1  # Show last frame

	var fade_out = create_tween()
	fade_out.tween_property(sprite, "modulate:a", 0.0, fade_duration)
	await fade_out.finished

	# Reset and fade in
	sprite.frame = 0
	sprite.play("walk")
	var fade_in = create_tween()
	fade_in.tween_property(sprite, "modulate:a", 1.0, fade_duration)
	await fade_in.finished

	is_fading = false
