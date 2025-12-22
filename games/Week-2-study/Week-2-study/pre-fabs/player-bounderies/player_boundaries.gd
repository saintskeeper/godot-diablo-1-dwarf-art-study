extends TileMapLayer

var _debug_timer := 0.0

func _ready() -> void:
	visible = false
	print("PlayerBoundaries: Ready at position ", global_position)

func _process(delta: float) -> void:
	_debug_timer += delta
	if _debug_timer > 2.0:
		_debug_timer = 0.0
		var used := get_used_cells()
		print("PlayerBoundaries: ", used.size(), " tiles painted")

func is_blocked(global_pos: Vector2) -> bool:
	var local_pos := to_local(global_pos)
	var tile_coords := local_to_map(local_pos)
	var cell := get_cell_source_id(tile_coords)
	return cell != -1
