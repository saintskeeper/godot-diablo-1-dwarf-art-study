extends Node2D
class_name Projectile

var target: Node2D
var speed: float = 800.0
var damage: int = 1

signal hit_target(target: Node2D)


func _process(delta: float) -> void:
	if not is_instance_valid(target):
		queue_free()
		return

	var direction = (target.global_position - global_position).normalized()
	global_position += direction * speed * delta

	if global_position.distance_to(target.global_position) < 20.0:
		hit_target.emit(target)
		if target.has_method("take_damage"):
			target.take_damage(damage)
		queue_free()
