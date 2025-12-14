extends RefCounted
class_name TDPathfinder

var grid: TDGrid
var allow_diagonal: bool = false

var astar: AStar2D
var point_id_map: Dictionary = {}


func _init(td_grid: TDGrid) -> void:
	grid = td_grid
	astar = AStar2D.new()
	rebuild_graph()


func rebuild_graph() -> void:
	astar.clear()
	point_id_map.clear()

	for row in range(grid.grid_rows):
		for col in range(grid.grid_cols):
			if _is_walkable(col, row):
				_add_point(Vector2i(col, row))

	for grid_pos in point_id_map.keys():
		_connect_neighbors(grid_pos, point_id_map[grid_pos])


func _add_point(grid_pos: Vector2i) -> int:
	var point_id = grid_pos.y * grid.grid_cols + grid_pos.x
	var world_pos = grid.grid_to_world(grid_pos)
	astar.add_point(point_id, world_pos)
	point_id_map[grid_pos] = point_id
	return point_id


func _connect_neighbors(grid_pos: Vector2i, point_id: int) -> void:
	var directions = [
		Vector2i(0, -1),
		Vector2i(0, 1),
		Vector2i(-1, 0),
		Vector2i(1, 0)
	]

	if allow_diagonal:
		directions.append_array([
			Vector2i(-1, -1),
			Vector2i(1, -1),
			Vector2i(-1, 1),
			Vector2i(1, 1)
		])

	for dir in directions:
		var neighbor_pos = grid_pos + dir
		if point_id_map.has(neighbor_pos):
			var neighbor_id = point_id_map[neighbor_pos]
			if not astar.are_points_connected(point_id, neighbor_id):
				astar.connect_points(point_id, neighbor_id)


func _is_walkable(col: int, row: int) -> bool:
	var cell = grid.get_cell(col, row)
	return cell != null and cell.is_walkable


func find_path(from_grid: Vector2i, to_grid: Vector2i) -> PackedVector2Array:
	if not point_id_map.has(from_grid) or not point_id_map.has(to_grid):
		return PackedVector2Array()

	var from_id = point_id_map[from_grid]
	var to_id = point_id_map[to_grid]

	return astar.get_point_path(from_id, to_id)


func find_path_world(from_world: Vector2, to_world: Vector2) -> PackedVector2Array:
	var from_grid = grid.world_to_grid(from_world)
	var to_grid = grid.world_to_grid(to_world)
	return find_path(from_grid, to_grid)


func get_path_to_nearest_goal(from_grid: Vector2i) -> PackedVector2Array:
	if grid.goal_cells.is_empty():
		return PackedVector2Array()

	var shortest_path: PackedVector2Array = PackedVector2Array()
	var shortest_length: float = INF

	for goal_cell in grid.goal_cells:
		var path = find_path(from_grid, goal_cell.grid_position)
		if path.size() > 0:
			var length = _calculate_path_length(path)
			if length < shortest_length:
				shortest_length = length
				shortest_path = path

	return shortest_path


func _calculate_path_length(path: PackedVector2Array) -> float:
	var length: float = 0.0
	for i in range(path.size() - 1):
		length += path[i].distance_to(path[i + 1])
	return length


func is_path_valid(from_grid: Vector2i, to_grid: Vector2i) -> bool:
	return find_path(from_grid, to_grid).size() > 0


func get_closest_walkable_cell(from_grid: Vector2i) -> Vector2i:
	var closest_pos: Vector2i = Vector2i(-1, -1)
	var closest_dist: float = INF

	for grid_pos in point_id_map.keys():
		var dist = Vector2(from_grid).distance_to(Vector2(grid_pos))
		if dist < closest_dist:
			closest_dist = dist
			closest_pos = grid_pos

	return closest_pos
