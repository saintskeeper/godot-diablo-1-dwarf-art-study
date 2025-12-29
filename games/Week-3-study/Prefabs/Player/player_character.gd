extends CharacterBody2D
class_name PlayerCharacter

## Movement configuration
@export_group("Movement")
@export var move_speed: float = 300.0
@export var jump_velocity: float = -600.0
@export var gravity_multiplier: float = 1.0
@export var acceleration: float = 1500.0  ## How fast to reach max speed
@export var friction: float = 1200.0  ## How fast to stop

## Animation configuration
@export_group("Animation")
@export var idle_fps: float = 15.0
@export var run_fps: float = 24.0
@export var jump_fps: float = 20.0
@export var idle_frame_step: int = 6  ## Use every Nth frame (299 frames is too many)
@export var jump_frame_step: int = 2  ## Use every Nth frame

## Squash/stretch configuration
@export_group("Squash & Stretch")
@export var squash_scale: Vector2 = Vector2(1.2, 0.8)  ## On land
@export var stretch_scale: Vector2 = Vector2(0.8, 1.2)  ## On jump
@export var squash_duration: float = 0.1

## Node references
@onready var sprite: AnimatedSprite2D = $AnimatedSprite2D

## State machine
enum State { IDLE, RUN, JUMP, SWING }
var current_state: State = State.IDLE
var facing_direction: int = 1  ## 1 = right, -1 = left
var was_on_floor: bool = true  ## Track landing

## Lasso reference
@onready var lasso: Lasso = $Lasso

## Animation paths
const ASSET_BASE := "res://Assets/Blue-Dwarf/"
const IDLE_FRAMES := 299
const RUN_FRAMES := 25
const JUMP_FRAMES := 66


func _ready() -> void:
	_setup_animations()
	sprite.play("idle_right")


func _physics_process(delta: float) -> void:
	var on_floor := is_on_floor()

	_apply_gravity(delta)
	_handle_horizontal_input(delta)
	_handle_jump()
	move_and_slide()
	_check_landing(on_floor)
	_update_state()
	_update_animation()


func _apply_gravity(delta: float) -> void:
	if not is_on_floor() and not _is_swinging():
		velocity.y += get_gravity().y * gravity_multiplier * delta


func _is_swinging() -> bool:
	return lasso and lasso.is_swinging()


func _handle_horizontal_input(delta: float) -> void:
	var input_dir := _get_horizontal_input()

	if input_dir != 0:
		facing_direction = int(sign(input_dir))
		velocity.x = move_toward(velocity.x, input_dir * move_speed, acceleration * delta)
	else:
		velocity.x = move_toward(velocity.x, 0.0, friction * delta)


func _get_horizontal_input() -> float:
	return Input.get_axis("move_left", "move_right")


func _handle_jump() -> void:
	if is_on_floor() and Input.is_action_just_pressed("jump"):
		velocity.y = jump_velocity
		_apply_squash_stretch(stretch_scale)


func _check_landing(was_in_air: bool) -> void:
	var on_floor := is_on_floor()
	if on_floor and not was_on_floor:
		_apply_squash_stretch(squash_scale)
	was_on_floor = on_floor


func _apply_squash_stretch(target_scale: Vector2) -> void:
	var tween := create_tween()
	tween.set_ease(Tween.EASE_OUT)
	tween.set_trans(Tween.TRANS_ELASTIC)
	tween.tween_property(sprite, "scale", target_scale * 0.5, squash_duration * 0.3)
	tween.tween_property(sprite, "scale", Vector2(0.5, 0.5), squash_duration * 0.7)


func _update_state() -> void:
	var new_state := current_state

	if _is_swinging():
		new_state = State.SWING
	elif not is_on_floor():
		new_state = State.JUMP
	elif abs(velocity.x) > 0.1:
		new_state = State.RUN
	else:
		new_state = State.IDLE

	if new_state != current_state:
		current_state = new_state


func _update_animation() -> void:
	var suffix := "_right" if facing_direction > 0 else "_left"
	var anim_name: String

	match current_state:
		State.IDLE:
			anim_name = "idle" + suffix
		State.RUN:
			anim_name = "run" + suffix
		State.JUMP, State.SWING:
			anim_name = "jump" + suffix

	if sprite.animation != anim_name:
		sprite.play(anim_name)


func _setup_animations() -> void:
	var frames := SpriteFrames.new()

	# Remove default animation if it exists
	if frames.has_animation("default"):
		frames.remove_animation("default")

	# Setup idle animations (dir2 = left, dir4 = right)
	_add_animation(frames, "idle_left", "IDLE_2", "IDLE_2", 2, IDLE_FRAMES, idle_frame_step, 3, idle_fps, true)
	_add_animation(frames, "idle_right", "IDLE_2", "IDLE_2", 4, IDLE_FRAMES, idle_frame_step, 3, idle_fps, true)

	# Setup run animations
	_add_animation(frames, "run_left", "RUN_2", "RUN_2", 2, RUN_FRAMES, 1, 2, run_fps, true)
	_add_animation(frames, "run_right", "RUN_2", "RUN_2", 4, RUN_FRAMES, 1, 2, run_fps, true)

	# Setup jump animations
	_add_animation(frames, "jump_left", "JUMP_2", "JUMP_2", 2, JUMP_FRAMES, jump_frame_step, 2, jump_fps, false)
	_add_animation(frames, "jump_right", "JUMP_2", "JUMP_2", 4, JUMP_FRAMES, jump_frame_step, 2, jump_fps, false)

	sprite.sprite_frames = frames


func _add_animation(frames: SpriteFrames, anim_name: String, folder: String,
					anim_type: String, direction: int, frame_count: int,
					step: int, zero_pad: int, fps: float, loop: bool) -> void:
	frames.add_animation(anim_name)
	frames.set_animation_speed(anim_name, fps)
	frames.set_animation_loop(anim_name, loop)

	var frame_num := 1
	while frame_num <= frame_count:
		var frame_str: String
		if zero_pad == 3:
			frame_str = "%03d" % frame_num
		else:
			frame_str = "%02d" % frame_num

		var path := ASSET_BASE + folder + "/blue-dwarf-withanimations_export_" + anim_type + "_dir" + str(direction) + "_" + frame_str + ".png"
		var texture := load(path) as Texture2D

		if texture:
			frames.add_frame(anim_name, texture)

		frame_num += step
