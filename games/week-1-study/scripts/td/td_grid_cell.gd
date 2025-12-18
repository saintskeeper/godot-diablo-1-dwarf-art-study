extends Node2D
class_name TDGridCell

enum CellType {
	BUILDABLE,
	PATH,
	OBSTACLE,
	SPAWN,
	GOAL
}

signal cell_clicked(cell: TDGridCell)
signal cell_hovered(cell: TDGridCell)
signal cell_unhovered(cell: TDGridCell)
signal tower_placed(cell: TDGridCell, tower: TDTower)
signal tower_removed(cell: TDGridCell)

@export var cell_type: CellType = CellType.BUILDABLE
@export var grid_position: Vector2i = Vector2i.ZERO

var current_tower: TDTower = null

var is_walkable: bool:
	get: return cell_type in [CellType.PATH, CellType.SPAWN, CellType.GOAL]

var is_buildable: bool:
	get: return cell_type == CellType.BUILDABLE and current_tower == null

@onready var sprite: Sprite2D = $Sprite2D
@onready var highlight: ColorRect = $Highlight
@onready var area: Area2D = $Area2D

const TYPE_COLORS: Dictionary = {
	CellType.BUILDABLE: Color(0.3, 0.3, 0.5, 0.8),
	CellType.PATH: Color(0.6, 0.5, 0.3, 0.8),
	CellType.OBSTACLE: Color(0.2, 0.2, 0.2, 0.8),
	CellType.SPAWN: Color(0.8, 0.3, 0.3, 0.8),
	CellType.GOAL: Color(0.3, 0.8, 0.3, 0.8)
}


func _ready() -> void:
	_update_visual()
	if highlight:
		highlight.visible = false
	if area:
		area.input_event.connect(_on_area_input_event)
		area.mouse_entered.connect(_on_area_mouse_entered)
		area.mouse_exited.connect(_on_area_mouse_exited)


func set_cell_type(type: CellType) -> void:
	cell_type = type
	_update_visual()


func _update_visual() -> void:
	if sprite:
		sprite.modulate = TYPE_COLORS.get(cell_type, Color.WHITE)


func place_tower(tower: TDTower) -> bool:
	if not is_buildable:
		return false
	current_tower = tower
	tower.global_position = global_position
	tower_placed.emit(self, tower)
	return true


func remove_tower() -> TDTower:
	var tower = current_tower
	current_tower = null
	if tower:
		tower_removed.emit(self)
	return tower


func set_highlight(color: Color) -> void:
	if highlight:
		highlight.color = color
		highlight.visible = true


func clear_highlight() -> void:
	if highlight:
		highlight.visible = false


func get_world_center() -> Vector2:
	return global_position


func _on_area_input_event(_viewport: Node, event: InputEvent, _shape_idx: int) -> void:
	if event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_LEFT and event.pressed:
			cell_clicked.emit(self)


func _on_area_mouse_entered() -> void:
	cell_hovered.emit(self)


func _on_area_mouse_exited() -> void:
	cell_unhovered.emit(self)
