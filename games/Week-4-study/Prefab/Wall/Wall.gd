@tool
extends StaticBody3D

@export var generate_collision := false:
	set(value):
		if value:
			_generate_collision()
		generate_collision = false

@export var use_convex := false
@export var clean_mesh := true
@export var auto_generate := true


func _ready() -> void:
	if auto_generate and not _has_collision():
		_generate_collision()


func _has_collision() -> bool:
	for child in get_children():
		if child is CollisionShape3D and child.shape:
			return true
	return false


func _generate_collision() -> void:
	var mesh_instance: MeshInstance3D
	for child in get_children():
		if child is MeshInstance3D:
			mesh_instance = child
			break

	if not mesh_instance or not mesh_instance.mesh:
		push_error("No MeshInstance3D with mesh found")
		return

	# Remove existing collision shapes
	for child in get_children():
		if child is CollisionShape3D:
			child.queue_free()

	var collision := CollisionShape3D.new()
	collision.name = "CollisionShape3D"

	if use_convex:
		collision.shape = mesh_instance.mesh.create_convex_shape(clean_mesh)
	else:
		collision.shape = mesh_instance.mesh.create_trimesh_shape()

	collision.transform = mesh_instance.transform
	add_child(collision)

	if Engine.is_editor_hint():
		collision.owner = get_tree().edited_scene_root

	print("Collision generated from mesh: ", mesh_instance.name)
