extends Node2D

@export var fire_rate: float = 1.0
@export var tower_range: float = 2000.0

@onready var tower: Node2D = $WizardTower
@onready var enemy: Node2D = $Viking

var projectile_scene: PackedScene = preload("res://prefabs/td-prefabs/projectile.tscn")
var fire_timer: float = 0.0


func _ready() -> void:
	if enemy:
		enemy.target = tower


func _process(delta: float) -> void:
	fire_timer += delta

	if fire_timer >= fire_rate:
		fire_timer = 0.0
		try_shoot()


func try_shoot() -> void:
	if not is_instance_valid(enemy):
		return

	var distance = tower.global_position.distance_to(enemy.global_position)
	if distance <= tower_range:
		shoot_at(enemy)


func shoot_at(target: Node2D) -> void:
	var projectile = projectile_scene.instantiate()
	projectile.global_position = tower.global_position
	projectile.target = target
	add_child(projectile)
