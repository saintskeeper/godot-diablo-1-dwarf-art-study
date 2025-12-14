extends Node2D

@export var max_health: float = 100.0
@export var current_health: float = 100.0
@export var drain_speed: float = 0.5
@export var test_drain: bool = false

@onready var health_sprite: Sprite2D = $DwarvenUiExportLeftManaHealth

var target_fill: float = 1.0
var current_fill: float = 1.0
var shader_material: ShaderMaterial

func _ready() -> void:
	shader_material = ShaderMaterial.new()
	shader_material.shader = preload("res://prefabs/ui/Dward-ui-elements/health-bar/health_fill.gdshader")
	health_sprite.material = shader_material
	update_fill_target()

func _process(delta: float) -> void:
	if current_fill != target_fill:
		current_fill = move_toward(current_fill, target_fill, drain_speed * delta)
		shader_material.set_shader_parameter("fill_amount", current_fill)

	if test_drain:
		current_health -= 20.0 * delta
		if current_health <= 0:
			current_health = max_health
		update_fill_target()

func set_health(value: float) -> void:
	current_health = clamp(value, 0.0, max_health)
	update_fill_target()

func add_health(amount: float) -> void:
	set_health(current_health + amount)

func take_damage(amount: float) -> void:
	set_health(current_health - amount)

func heal(amount: float) -> void:
	add_health(amount)

func is_alive() -> bool:
	return current_health > 0

func update_fill_target() -> void:
	target_fill = current_health / max_health if max_health > 0 else 0.0

func get_health_percent() -> float:
	return (current_health / max_health) * 100.0 if max_health > 0 else 0.0
