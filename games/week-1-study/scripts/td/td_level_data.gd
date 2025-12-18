@tool
extends Resource
class_name TDLevelData

@export var level_name: String = "Unnamed Level"
@export var level_description: String = ""

@export_group("Grid Configuration")
@export var grid_cols: int = 12
@export var grid_rows: int = 8
@export var cell_size: Vector2 = Vector2(64, 64)

@export_group("Cell Layout")
@export var cell_types: PackedInt32Array = []

@export_group("Waves")
@export var waves: Array[Dictionary] = []

@export_group("Starting Resources")
@export var starting_gold: int = 100
@export var starting_lives: int = 20


func get_cell_type(col: int, row: int) -> int:
	var index = row * grid_cols + col
	if index < 0 or index >= cell_types.size():
		return TDGridCell.CellType.BUILDABLE
	return cell_types[index]


func set_cell_type(col: int, row: int, type: int) -> void:
	var index = row * grid_cols + col
	_ensure_cell_array_size()
	if index >= 0 and index < cell_types.size():
		cell_types[index] = type


func _ensure_cell_array_size() -> void:
	var required_size = grid_cols * grid_rows
	if cell_types.size() != required_size:
		cell_types.resize(required_size)


func get_spawn_positions() -> Array[Vector2i]:
	var spawns: Array[Vector2i] = []
	for row in range(grid_rows):
		for col in range(grid_cols):
			if get_cell_type(col, row) == TDGridCell.CellType.SPAWN:
				spawns.append(Vector2i(col, row))
	return spawns


func get_goal_positions() -> Array[Vector2i]:
	var goals: Array[Vector2i] = []
	for row in range(grid_rows):
		for col in range(grid_cols):
			if get_cell_type(col, row) == TDGridCell.CellType.GOAL:
				goals.append(Vector2i(col, row))
	return goals


func create_empty(cols: int, rows: int) -> void:
	grid_cols = cols
	grid_rows = rows
	cell_types.resize(cols * rows)
	cell_types.fill(TDGridCell.CellType.BUILDABLE)
	waves.clear()


func validate() -> bool:
	var spawns = get_spawn_positions()
	var goals = get_goal_positions()

	if spawns.is_empty():
		push_warning("TDLevelData: No spawn points defined")
		return false

	if goals.is_empty():
		push_warning("TDLevelData: No goal points defined")
		return false

	return true


func to_dict() -> Dictionary:
	return {
		"level_name": level_name,
		"level_description": level_description,
		"grid_cols": grid_cols,
		"grid_rows": grid_rows,
		"cell_size": {"x": cell_size.x, "y": cell_size.y},
		"cell_types": Array(cell_types),
		"waves": waves,
		"starting_gold": starting_gold,
		"starting_lives": starting_lives
	}


static func from_dict(data: Dictionary) -> TDLevelData:
	var level = TDLevelData.new()
	level.level_name = data.get("level_name", "Unnamed Level")
	level.level_description = data.get("level_description", "")
	level.grid_cols = data.get("grid_cols", 12)
	level.grid_rows = data.get("grid_rows", 8)

	var cell_size_data = data.get("cell_size", {"x": 64, "y": 64})
	level.cell_size = Vector2(cell_size_data.x, cell_size_data.y)

	var types_array = data.get("cell_types", [])
	level.cell_types = PackedInt32Array(types_array)

	level.waves = data.get("waves", [])
	level.starting_gold = data.get("starting_gold", 100)
	level.starting_lives = data.get("starting_lives", 20)

	return level
