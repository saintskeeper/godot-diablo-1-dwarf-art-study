extends Node2D

@export var max_mana: float = 100.0
@export var current_mana: float = 100.0
@export var drain_speed: float = 0.5  # How fast to animate changes
@export var test_drain: bool = false  # Enable to auto-drain for testing

@onready var mana_sprite: Sprite2D = $DwarvenUiExportLeftManaHealth

var target_fill: float = 1.0
var current_fill: float = 1.0
var shader_material: ShaderMaterial

func _ready() -> void:
	# Create and apply shader material
	shader_material = ShaderMaterial.new()
	shader_material.shader = preload("res://prefabs/ui/Dward-ui-elements/mana_fill.gdshader")
	mana_sprite.material = shader_material

	# Initialize fill
	update_fill_target()

func _process(delta: float) -> void:
	# Smoothly animate toward target fill
	if current_fill != target_fill:
		current_fill = move_toward(current_fill, target_fill, drain_speed * delta)
		shader_material.set_shader_parameter("fill_amount", current_fill)

	# Test mode: continuously drain and refill
	if test_drain:
		current_mana -= 20.0 * delta
		if current_mana <= 0:
			current_mana = max_mana
		update_fill_target()

func set_mana(value: float) -> void:
	current_mana = clamp(value, 0.0, max_mana)
	update_fill_target()

func add_mana(amount: float) -> void:
	set_mana(current_mana + amount)

func use_mana(amount: float) -> bool:
	if current_mana >= amount:
		set_mana(current_mana - amount)
		return true
	return false

func update_fill_target() -> void:
	target_fill = current_mana / max_mana if max_mana > 0 else 0.0

func get_mana_percent() -> float:
	return (current_mana / max_mana) * 100.0 if max_mana > 0 else 0.0
