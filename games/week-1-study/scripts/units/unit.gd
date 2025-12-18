extends Node2D
class_name Unit

@export var unit_type: int = 0  # 0=Viking, 1=Shaman, 2=Archer
@export var team: int = 0       # 0=Player, 1=Enemy

var max_hp: int
var hp: int
var attack: int
var attack_range: int
var grid_col: int = 0
var grid_row: int = 0
var is_frozen: bool = false
var damage_bonus: int = 0


func _ready() -> void:
	setup_stats()


func setup_stats() -> void:
	match unit_type:
		0:  # Viking
			max_hp = 3
			attack = 2
			attack_range = 1
		1:  # Shaman
			max_hp = 2
			attack = 1
			attack_range = 1
		2:  # Archer
			max_hp = 2
			attack = 2
			attack_range = 2
		_:
			max_hp = 1
			attack = 1
			attack_range = 1

	hp = max_hp


func take_damage(amount: int) -> bool:
	hp -= amount
	return hp <= 0


func heal(amount: int) -> void:
	hp = min(hp + amount, max_hp)


func get_valid_moves(board: Array) -> Array:
	var valid_moves: Array = []
	var directions: Array = [
		Vector2i(0, -1),   # Up
		Vector2i(0, 1),    # Down
		Vector2i(-1, 0),   # Left
		Vector2i(1, 0)     # Right
	]

	for direction in directions:
		var target_col: int = grid_col + direction.x
		var target_row: int = grid_row + direction.y

		# Check bounds
		if target_row < 0 or target_row >= board.size():
			continue
		if target_col < 0 or target_col >= board[target_row].size():
			continue

		# Check if cell is empty
		if board[target_row][target_col] == null:
			valid_moves.append(Vector2i(target_col, target_row))

	return valid_moves


func get_valid_targets(board: Array) -> Array:
	var valid_targets: Array = []

	match unit_type:
		0, 1:  # Viking or Shaman - adjacent enemies
			var directions: Array = [
				Vector2i(0, -1),   # Up
				Vector2i(0, 1),    # Down
				Vector2i(-1, 0),   # Left
				Vector2i(1, 0)     # Right
			]

			for direction in directions:
				var target_col: int = grid_col + direction.x
				var target_row: int = grid_row + direction.y

				# Check bounds
				if target_row < 0 or target_row >= board.size():
					continue
				if target_col < 0 or target_col >= board[target_row].size():
					continue

				var target = board[target_row][target_col]
				if target != null and target is Unit and target.team != team:
					valid_targets.append(target)

		2:  # Archer - enemies in same row within 2 tiles
			for distance in [1, 2]:
				# Check left
				var left_col: int = grid_col - distance
				if left_col >= 0 and left_col < board[grid_row].size():
					var target = board[grid_row][left_col]
					if target != null and target is Unit and target.team != team:
						valid_targets.append(target)

				# Check right
				var right_col: int = grid_col + distance
				if right_col >= 0 and right_col < board[grid_row].size():
					var target = board[grid_row][right_col]
					if target != null and target is Unit and target.team != team:
						valid_targets.append(target)

	return valid_targets
