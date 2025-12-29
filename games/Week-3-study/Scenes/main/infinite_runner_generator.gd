extends Node
class_name InfiniteRunnerGenerator

signal difficulty_increased(level: int)

## Prefab references
@export var rectangle_prefab: PackedScene
@export var square_prefab: PackedScene
@export var ring_prefab: PackedScene

## Generation parameters
@export_group("Generation")
@export var generation_distance: float = 1500.0  ## How far ahead to generate
@export var cleanup_distance: float = 800.0  ## How far behind to cleanup
@export var base_platform_y: float = 600.0  ## Base height for platforms
@export var min_platform_y: float = 350.0  ## Highest platforms can go
@export var max_platform_y: float = 750.0  ## Lowest platforms can go

## Difficulty parameters
@export_group("Difficulty")
@export var difficulty_increase_distance: float = 2000.0  ## Distance between difficulty increases
@export var max_difficulty: int = 10

## Gap parameters (adjusted by difficulty)
@export_group("Gaps")
@export var base_min_gap: float = 120.0
@export var base_max_gap: float = 280.0
@export var gap_increase_per_level: float = 30.0
@export var ring_gap_threshold: float = 380.0  ## Gaps larger than this need rings

## Platform parameters
@export_group("Platforms")
@export var rectangle_width: float = 400.0
@export var square_size: float = 64.0
@export var min_stepping_stones: int = 2
@export var max_stepping_stones: int = 4
@export var stepping_stone_gap: float = 90.0

## Ring parameters
@export_group("Rings")
@export var ring_height_above_gap: float = 250.0
@export var ring_spacing: float = 300.0
@export var lasso_range: float = 400.0

## Internal state
var player: CharacterBody2D
var current_difficulty: int = 0
var distance_traveled: float = 0.0
var last_difficulty_distance: float = 0.0
var generation_x: float = 0.0
var last_platform_end_x: float = 0.0
var last_platform_y: float = 600.0

## Object pools
var active_platforms: Array[Node2D] = []
var active_rings: Array[Node2D] = []
var rectangle_pool: Array[Node2D] = []
var square_pool: Array[Node2D] = []
var ring_pool: Array[Node2D] = []

## Track platform types for proper pooling
var platform_types: Dictionary = {}  # Node -> bool (true = rectangle)

## Pattern weights (adjusted by difficulty)
enum Pattern { RECTANGLE, STEPPING_STONES, ASCENDING, DESCENDING, RING_SWING }
var pattern_weights: Dictionary = {
	Pattern.RECTANGLE: 40,
	Pattern.STEPPING_STONES: 25,
	Pattern.ASCENDING: 15,
	Pattern.DESCENDING: 15,
	Pattern.RING_SWING: 5
}


func _ready() -> void:
	randomize()


func initialize(p_player: CharacterBody2D, start_x: float = 0.0) -> void:
	player = p_player
	generation_x = start_x
	last_platform_end_x = start_x
	last_platform_y = base_platform_y

	# Generate initial platforms
	_generate_starting_area()

	# Fill ahead
	while generation_x < player.global_position.x + generation_distance:
		_generate_next_segment()


func reset(start_x: float = 0.0) -> void:
	# Return all active platforms to pools
	for platform in active_platforms:
		_return_platform_to_pool(platform)
	active_platforms.clear()

	# Return all active rings to pool
	for ring in active_rings:
		_return_to_pool(ring, ring_pool)
	active_rings.clear()

	# Reset state
	current_difficulty = 0
	distance_traveled = 0.0
	last_difficulty_distance = 0.0
	generation_x = start_x
	last_platform_end_x = start_x
	last_platform_y = base_platform_y

	# Reset pattern weights
	pattern_weights[Pattern.RECTANGLE] = 40
	pattern_weights[Pattern.STEPPING_STONES] = 25
	pattern_weights[Pattern.ASCENDING] = 15
	pattern_weights[Pattern.DESCENDING] = 15
	pattern_weights[Pattern.RING_SWING] = 5

	# Regenerate starting area
	_generate_starting_area()

	# Fill ahead
	while generation_x < player.global_position.x + generation_distance:
		_generate_next_segment()


func _process(_delta: float) -> void:
	if not player:
		return

	_update_difficulty()
	_generate_ahead()
	_cleanup_behind()


func _update_difficulty() -> void:
	distance_traveled = player.global_position.x

	if current_difficulty < max_difficulty:
		if distance_traveled - last_difficulty_distance >= difficulty_increase_distance:
			current_difficulty += 1
			last_difficulty_distance = distance_traveled
			_adjust_pattern_weights()
			difficulty_increased.emit(current_difficulty)


func _adjust_pattern_weights() -> void:
	# As difficulty increases, more ring swings and stepping stones
	pattern_weights[Pattern.RECTANGLE] = max(20, 40 - current_difficulty * 2)
	pattern_weights[Pattern.STEPPING_STONES] = min(35, 25 + current_difficulty)
	pattern_weights[Pattern.RING_SWING] = min(25, 5 + current_difficulty * 2)


func _generate_ahead() -> void:
	while generation_x < player.global_position.x + generation_distance:
		_generate_next_segment()


func _cleanup_behind() -> void:
	var cleanup_x := player.global_position.x - cleanup_distance

	# Cleanup platforms
	var i := active_platforms.size() - 1
	while i >= 0:
		var platform := active_platforms[i]
		if platform.global_position.x + rectangle_width < cleanup_x:
			_return_platform_to_pool(platform)
			active_platforms.remove_at(i)
		i -= 1

	# Cleanup rings
	i = active_rings.size() - 1
	while i >= 0:
		var ring := active_rings[i]
		if ring.global_position.x < cleanup_x:
			_return_to_pool(ring, ring_pool)
			active_rings.remove_at(i)
		i -= 1


func _generate_starting_area() -> void:
	# Create a safe starting platform
	var start_platform := _get_platform(true)  # Rectangle
	start_platform.global_position = Vector2(0, base_platform_y)
	active_platforms.append(start_platform)

	last_platform_end_x = rectangle_width / 2
	last_platform_y = base_platform_y
	generation_x = last_platform_end_x


func _generate_next_segment() -> void:
	var pattern := _choose_pattern()

	match pattern:
		Pattern.RECTANGLE:
			_generate_rectangle()
		Pattern.STEPPING_STONES:
			_generate_stepping_stones()
		Pattern.ASCENDING:
			_generate_height_sequence(true)
		Pattern.DESCENDING:
			_generate_height_sequence(false)
		Pattern.RING_SWING:
			_generate_ring_swing()


func _choose_pattern() -> Pattern:
	var total_weight := 0
	for weight in pattern_weights.values():
		total_weight += weight

	var roll := randi() % total_weight
	var cumulative := 0

	for pattern in pattern_weights:
		cumulative += pattern_weights[pattern]
		if roll < cumulative:
			return pattern

	return Pattern.RECTANGLE


func _generate_rectangle() -> void:
	var gap := _calculate_gap()
	var height_change := _calculate_height_change()

	var new_y := clampf(last_platform_y + height_change, min_platform_y, max_platform_y)
	var new_x := last_platform_end_x + gap + rectangle_width / 2

	# Check if gap needs a ring
	if gap > ring_gap_threshold:
		_place_ring_for_gap(last_platform_end_x, new_x - rectangle_width / 2, last_platform_y, new_y)

	var platform := _get_platform(true)
	platform.global_position = Vector2(new_x, new_y)
	active_platforms.append(platform)

	last_platform_end_x = new_x + rectangle_width / 2
	last_platform_y = new_y
	generation_x = last_platform_end_x


func _generate_stepping_stones() -> void:
	var count := randi_range(min_stepping_stones, max_stepping_stones)
	var gap := _calculate_gap() * 0.6  # Smaller initial gap for stepping stones
	var height_change := _calculate_height_change() / count

	var current_x := last_platform_end_x + gap + square_size / 2
	var current_y := last_platform_y

	# Check if total gap needs ring assist
	var total_span := (count - 1) * (square_size + stepping_stone_gap) + gap
	if total_span > ring_gap_threshold * 1.5:
		var ring_x := last_platform_end_x + total_span / 2
		var ring_y := current_y - ring_height_above_gap
		_place_ring(ring_x, ring_y)

	for i in count:
		current_y = clampf(current_y + height_change, min_platform_y, max_platform_y)

		var platform := _get_platform(false)  # Square
		platform.global_position = Vector2(current_x, current_y)
		active_platforms.append(platform)

		current_x += square_size + stepping_stone_gap

	last_platform_end_x = current_x - stepping_stone_gap + square_size / 2
	last_platform_y = current_y
	generation_x = last_platform_end_x


func _generate_height_sequence(ascending: bool) -> void:
	var count := randi_range(2, 3)
	var gap := _calculate_gap() * 0.5
	var step_height := 80.0 if ascending else -80.0

	var current_x := last_platform_end_x + gap + rectangle_width / 2
	var current_y := last_platform_y

	for i in count:
		current_y = clampf(current_y - step_height, min_platform_y, max_platform_y)

		var platform := _get_platform(true)
		platform.global_position = Vector2(current_x, current_y)
		active_platforms.append(platform)

		current_x += rectangle_width * 0.7 + gap * 0.5

	last_platform_end_x = current_x - gap * 0.5 - rectangle_width * 0.2
	last_platform_y = current_y
	generation_x = last_platform_end_x


func _generate_ring_swing() -> void:
	# Large gap that requires ring swinging
	var min_swing_gap := ring_gap_threshold + 100
	var max_swing_gap := ring_gap_threshold + 300 + current_difficulty * 30
	var gap := randf_range(min_swing_gap, max_swing_gap)

	var height_change := randf_range(-100, 50)
	var new_y := clampf(last_platform_y + height_change, min_platform_y, max_platform_y)
	var new_x := last_platform_end_x + gap + rectangle_width / 2

	# Place rings across the gap
	_place_ring_for_gap(last_platform_end_x, new_x - rectangle_width / 2, last_platform_y, new_y)

	# Landing platform
	var platform := _get_platform(true)
	platform.global_position = Vector2(new_x, new_y)
	active_platforms.append(platform)

	last_platform_end_x = new_x + rectangle_width / 2
	last_platform_y = new_y
	generation_x = last_platform_end_x


func _place_ring_for_gap(start_x: float, end_x: float, start_y: float, end_y: float) -> void:
	var gap_width := end_x - start_x
	var ring_count := ceili(gap_width / ring_spacing)
	ring_count = clampi(ring_count, 1, 4)

	var segment_width := gap_width / (ring_count + 1)

	for i in ring_count:
		var t := float(i + 1) / float(ring_count + 1)
		var ring_x := start_x + segment_width * (i + 1)
		var ring_y := lerpf(start_y, end_y, t) - ring_height_above_gap

		# Ensure ring is within lasso range from platforms
		ring_y = clampf(ring_y, min_platform_y - 200, max_platform_y - 100)

		_place_ring(ring_x, ring_y)


func _place_ring(x: float, y: float) -> void:
	var ring := _get_ring()
	ring.global_position = Vector2(x, y)
	active_rings.append(ring)


func _calculate_gap() -> float:
	var min_gap := base_min_gap + current_difficulty * gap_increase_per_level * 0.5
	var max_gap := base_max_gap + current_difficulty * gap_increase_per_level
	return randf_range(min_gap, max_gap)


func _calculate_height_change() -> float:
	var max_change := 80.0 + current_difficulty * 10.0
	return randf_range(-max_change, max_change * 0.7)  # Bias slightly downward


func _get_platform(is_rectangle: bool) -> Node2D:
	var pool: Array[Node2D] = rectangle_pool if is_rectangle else square_pool

	# Try pool first
	if pool.size() > 0:
		var platform: Node2D = pool.pop_back()
		platform.visible = true
		platform.process_mode = Node.PROCESS_MODE_INHERIT
		return platform

	# Instance new
	var prefab: PackedScene = rectangle_prefab if is_rectangle else square_prefab
	var platform: Node2D = prefab.instantiate() as Node2D
	platform_types[platform] = is_rectangle
	add_child(platform)
	return platform


func _return_platform_to_pool(platform: Node2D) -> void:
	platform.visible = false
	platform.process_mode = Node.PROCESS_MODE_DISABLED

	var is_rectangle: bool = platform_types.get(platform, true)
	if is_rectangle:
		rectangle_pool.append(platform)
	else:
		square_pool.append(platform)


func _get_ring() -> Node2D:
	if ring_pool.size() > 0:
		var ring: Node2D = ring_pool.pop_back()
		ring.visible = true
		ring.process_mode = Node.PROCESS_MODE_INHERIT
		return ring

	var ring: Node2D = ring_prefab.instantiate() as Node2D
	add_child(ring)
	return ring


func _return_to_pool(obj: Node2D, pool: Array[Node2D]) -> void:
	obj.visible = false
	obj.process_mode = Node.PROCESS_MODE_DISABLED
	pool.append(obj)


func get_difficulty() -> int:
	return current_difficulty


func get_distance() -> float:
	return distance_traveled
