extends Node2D
class_name GridCell

signal cell_clicked(cell: GridCell)
signal cell_hovered(cell: GridCell)

@export var col: int = 0
@export var row: int = 0

var current_unit: Node = null
var is_highlighted: bool = false
var highlight_type: String = ""

@onready var area: Area2D = $Area2D

func _ready() -> void:
	if area:
		area.input_event.connect(_on_area_input_event)
		area.mouse_entered.connect(_on_area_mouse_entered)
	else:
		push_warning("GridCell: No Area2D child found for cell at (%d, %d)" % [col, row])

func _on_area_input_event(_viewport: Node, event: InputEvent, _shape_idx: int) -> void:
	if event is InputEventMouseButton:
		if event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
			cell_clicked.emit(self)

func _on_area_mouse_entered() -> void:
	cell_hovered.emit(self)

func set_highlight(type: String) -> void:
	is_highlighted = true
	highlight_type = type

	match type:
		"move":
			modulate = Color(0.5, 1, 0.5, 1)
		"attack":
			modulate = Color(1, 0.5, 0.5, 1)
		"selected":
			modulate = Color(1, 1, 0.5, 1)
		_:
			push_warning("GridCell: Unknown highlight type '%s'" % type)
			modulate = Color.WHITE

func clear_highlight() -> void:
	is_highlighted = false
	highlight_type = ""
	modulate = Color.WHITE

func place_unit(unit: Node) -> void:
	if current_unit != null:
		push_warning("GridCell: Replacing existing unit at (%d, %d)" % [col, row])

	current_unit = unit

	if unit.has_method("set") or "grid_col" in unit:
		unit.grid_col = col
	if unit.has_method("set") or "grid_row" in unit:
		unit.grid_row = row

	unit.position = Vector2.ZERO

func remove_unit() -> Node:
	var unit = current_unit
	current_unit = null
	return unit
