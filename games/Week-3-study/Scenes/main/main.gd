extends Node2D

## Prefab references for procedural generation
@export_group("Prefabs")
@export var rectangle_prefab: PackedScene
@export var square_prefab: PackedScene
@export var ring_prefab: PackedScene

## Game state
@export_group("Game")
@export var start_x: float = 200.0
@export var start_y: float = 500.0

@onready var player: CharacterBody2D = $PlayerCharacter4
@onready var generator: InfiniteRunnerGenerator = $InfiniteRunnerGenerator
@onready var death_zone: Area2D = $DeathZone

var player_start_position: Vector2
var highest_distance: float = 0.0
var is_game_over: bool = false


func _ready() -> void:
	player_start_position = Vector2(start_x, start_y)
	player.position = player_start_position

	# Setup death zone
	death_zone.body_entered.connect(_on_death_zone_entered)

	# Initialize generator with prefabs
	generator.rectangle_prefab = rectangle_prefab
	generator.square_prefab = square_prefab
	generator.ring_prefab = ring_prefab
	generator.initialize(player, start_x - 200)

	# Connect difficulty signal
	generator.difficulty_increased.connect(_on_difficulty_increased)

	# Remove static test platforms (we generate dynamically now)
	_remove_static_platforms()


func _process(_delta: float) -> void:
	if not is_game_over:
		_update_death_zone()
		_track_distance()


func _update_death_zone() -> void:
	# Move death zone to follow player horizontally
	death_zone.global_position.x = player.global_position.x


func _track_distance() -> void:
	var current_distance := generator.get_distance()
	if current_distance > highest_distance:
		highest_distance = current_distance


func _on_death_zone_entered(body: Node2D) -> void:
	if body == player:
		respawn_player()


func respawn_player() -> void:
	player.velocity = Vector2.ZERO
	player.position = player_start_position

	# Reset the lasso if swinging
	var lasso := player.get_node_or_null("Lasso") as Lasso
	if lasso and lasso.is_swinging():
		lasso.release()

	# Reset the level generator
	generator.reset(start_x - 200)


func _on_difficulty_increased(level: int) -> void:
	print("Difficulty increased to level: ", level)
	# Could trigger visual/audio feedback here


func _remove_static_platforms() -> void:
	# Remove the test platforms that were placed manually
	var nodes_to_remove := [
		"TestRectangle", "TestRectangle2",
		"TestSquare", "TestSquare2",
		"SwingRing1", "SwingRing2", "SwingRing3"
	]

	for node_name in nodes_to_remove:
		var node := get_node_or_null(node_name)
		if node:
			node.queue_free()


func get_score() -> int:
	return int(highest_distance / 100)


func get_difficulty() -> int:
	return generator.get_difficulty()
