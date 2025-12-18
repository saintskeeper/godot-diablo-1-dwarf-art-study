extends Node2D
class_name TDGrid

signal grid_initialized(grid: TDGrid)
signal tower_placed(grid_position: Vector2i, tower: TDTower)
signal tower_removed(grid_position: Vector2i)
signal cell_clicked(grid_position: Vector2i, cell: TDGridCell)
signal cell_hovered(grid_position: Vector2i, cell: TDGridCell)

@export var grid_cols: int = 12
@export var grid_rows: int = 8
@export var cell_size: Vector2 = Vector2(64, 64)
@export var cell_scene: PackedScene

@export_group("Debug")
@export var debug_draw: bool = false
@export var debug_path_color: Color = Color(0.2, 0.8, 0.2, 0.5)
@export var debug_buildable_color: Color = Color(0.2, 0.2, 0.8, 0.3)
@export var debug_obstacle_color: Color = Color(0.8, 0.2, 0.2, 0.5)

var cells: Array = []
var spawn_cells: Array[TDGridCell] = []
var goal_cells: Array[TDGridCell] = []
var pathfinder: TDPathfinder

@onready var cells_container: Node2D = $Cells
@onready var towers_container: Node2D = $Towers


func _ready() -> void:
	if not cells_container:
		cells_container = Node2D.new()
		cells_container.name = "Cells"
		add_child(cells_container)
	if not towers_container:
		towers_container = Node2D.new()
		towers_container.name = "Towers"
		add_child(towers_container)


func initialize_grid() -> void:
	clear_grid()
	cells = []

	for row in range(grid_rows):
		var row_array: Array[TDGridCell] = []
		for col in range(grid_cols):
			var cell = _create_cell(col, row)
			row_array.append(cell)
		cells.append(row_array)

	pathfinder = TDPathfinder.new(self)
	grid_initialized.emit(self)
	queue_redraw()


func generate_from_level_data(level_data: TDLevelData) -> void:
	grid_cols = level_data.grid_cols
	grid_rows = level_data.grid_rows
	cell_size = level_data.cell_size

	initialize_grid()

	for row in range(grid_rows):
		for col in range(grid_cols):
			var type_value = level_data.get_cell_type(col, row)
			var cell = get_cell(col, row)
			if cell:
				cell.set_cell_type(type_value as TDGridCell.CellType)
				_register_special_cell(cell)

	pathfinder.rebuild_graph()
	queue_redraw()


func clear_grid() -> void:
	spawn_cells.clear()
	goal_cells.clear()

	for row_array in cells:
		for cell in row_array:
			if cell:
				cell.queue_free()
	cells.clear()

	for tower in towers_container.get_children():
		tower.queue_free()


func _create_cell(col: int, row: int) -> TDGridCell:
	var cell: TDGridCell
	if cell_scene:
		cell = cell_scene.instantiate() as TDGridCell
	else:
		cell = TDGridCell.new()

	cell.grid_position = Vector2i(col, row)
	cell.position = Vector2(col * cell_size.x, row * cell_size.y)
	cell.cell_clicked.connect(_on_cell_clicked)
	cell.cell_hovered.connect(_on_cell_hovered)
	cells_container.add_child(cell)
	return cell


func _register_special_cell(cell: TDGridCell) -> void:
	match cell.cell_type:
		TDGridCell.CellType.SPAWN:
			if cell not in spawn_cells:
				spawn_cells.append(cell)
		TDGridCell.CellType.GOAL:
			if cell not in goal_cells:
				goal_cells.append(cell)


func get_cell(col: int, row: int) -> TDGridCell:
	if col < 0 or col >= grid_cols or row < 0 or row >= grid_rows:
		return null
	return cells[row][col]


func get_cell_at_world(world_pos: Vector2) -> TDGridCell:
	var grid_pos = world_to_grid(world_pos)
	return get_cell(grid_pos.x, grid_pos.y)


func world_to_grid(world_pos: Vector2) -> Vector2i:
	var local_pos = world_pos - global_position
	var col = int(local_pos.x / cell_size.x)
	var row = int(local_pos.y / cell_size.y)
	return Vector2i(col, row)


func grid_to_world(grid_pos: Vector2i) -> Vector2:
	return global_position + Vector2(
		grid_pos.x * cell_size.x + cell_size.x / 2,
		grid_pos.y * cell_size.y + cell_size.y / 2
	)


func can_place_tower(col: int, row: int) -> bool:
	var cell = get_cell(col, row)
	return cell != null and cell.is_buildable


func place_tower(col: int, row: int, tower: TDTower) -> bool:
	var cell = get_cell(col, row)
	if not cell or not cell.is_buildable:
		return false

	towers_container.add_child(tower)
	if cell.place_tower(tower):
		tower.grid_position = Vector2i(col, row)
		tower.grid_ref = self
		tower_placed.emit(Vector2i(col, row), tower)
		return true
	return false


func remove_tower(col: int, row: int) -> TDTower:
	var cell = get_cell(col, row)
	if not cell:
		return null

	var tower = cell.remove_tower()
	if tower:
		tower_removed.emit(Vector2i(col, row))
	return tower


func get_all_towers() -> Array[TDTower]:
	var towers: Array[TDTower] = []
	for tower in towers_container.get_children():
		if tower is TDTower:
			towers.append(tower)
	return towers


func set_cell_type(col: int, row: int, type: TDGridCell.CellType) -> void:
	var cell = get_cell(col, row)
	if cell:
		cell.set_cell_type(type)
		_register_special_cell(cell)
		if pathfinder:
			pathfinder.rebuild_graph()
		queue_redraw()


func get_cells_of_type(type: TDGridCell.CellType) -> Array[TDGridCell]:
	var result: Array[TDGridCell] = []
	for row_array in cells:
		for cell in row_array:
			if cell.cell_type == type:
				result.append(cell)
	return result


func get_path_to_goal(from_cell: TDGridCell) -> PackedVector2Array:
	if not pathfinder or goal_cells.is_empty():
		return PackedVector2Array()
	return pathfinder.get_path_to_nearest_goal(from_cell.grid_position)


func recalculate_paths() -> void:
	if pathfinder:
		pathfinder.rebuild_graph()


func _on_cell_clicked(cell: TDGridCell) -> void:
	cell_clicked.emit(cell.grid_position, cell)


func _on_cell_hovered(cell: TDGridCell) -> void:
	cell_hovered.emit(cell.grid_position, cell)


func _draw() -> void:
	if not debug_draw:
		return

	for row in range(grid_rows):
		for col in range(grid_cols):
			var cell = get_cell(col, row)
			if not cell:
				continue

			var rect = Rect2(
				Vector2(col * cell_size.x, row * cell_size.y),
				cell_size
			)

			var color: Color
			match cell.cell_type:
				TDGridCell.CellType.PATH, TDGridCell.CellType.SPAWN, TDGridCell.CellType.GOAL:
					color = debug_path_color
				TDGridCell.CellType.BUILDABLE:
					color = debug_buildable_color
				TDGridCell.CellType.OBSTACLE:
					color = debug_obstacle_color

			draw_rect(rect, color, true)
			draw_rect(rect, Color.WHITE * 0.5, false)
