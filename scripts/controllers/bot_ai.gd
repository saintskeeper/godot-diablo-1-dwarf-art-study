extends Node
## BotAI - Controls enemy team (team == 1) tactical decisions
## Enemy units start at row 2, want to reach row 0 (player zone)
##
## Bot Priority:
## 1. If can attack player unit -> Attack
## 2. If can move toward player zone -> Move forward (toward row 0)
## 3. Otherwise -> Move toward nearest player unit

# Reference set externally
var turn_controller: Node = null

# Internal reference to GameManager
var game_manager: Node = null


func _ready() -> void:
	game_manager = get_node("/root/GameManager")


## Main bot turn execution with UX delays
func execute_turn() -> void:
	# Initial delay for UX
	await get_tree().create_timer(0.5).timeout

	# Get non-frozen enemy units
	var available_units: Array = []
	for unit in game_manager.enemy_units:
		if unit != null and not unit.is_frozen:
			available_units.append(unit)

	# If no available units, end turn
	if available_units.is_empty():
		turn_controller.end_turn()
		return

	# Pick first available unit
	var unit = available_units[0]

	# Check if can attack
	var valid_targets = unit.get_valid_targets(game_manager.board)
	if not valid_targets.is_empty():
		var target = pick_best_target(valid_targets)
		await execute_attack(unit, target)
	else:
		# Check if can move
		var valid_moves = unit.get_valid_moves(game_manager.board)
		if not valid_moves.is_empty():
			var best_move = pick_best_move(unit, valid_moves)
			await execute_move(unit, best_move)

	# Delay before ending turn
	await get_tree().create_timer(0.3).timeout
	turn_controller.end_turn()


## Pick best target from available targets
## Prioritizes lowest HP (prefer killing blows)
func pick_best_target(targets: Array) -> Node:
	# Sort by lowest HP
	var sorted_targets = targets.duplicate()
	sorted_targets.sort_custom(func(a, b): return a.hp < b.hp)
	return sorted_targets[0]


## Pick best move from available moves
## Prioritizes moving toward row 0 (player zone)
func pick_best_move(unit: Node, moves: Array) -> Vector2i:
	# Sort moves by Y ascending (prefer moving toward row 0)
	var sorted_moves = moves.duplicate()
	sorted_moves.sort_custom(func(a, b): return a.y < b.y)
	return sorted_moves[0]


## Execute attack action on target
func execute_attack(unit: Node, target: Node) -> void:
	# Calculate damage
	var damage = unit.attack + unit.damage_bonus

	# Reset damage bonus
	unit.damage_bonus = 0

	# Apply damage to target
	var died = target.take_damage(damage)

	# Handle death if unit died
	if died:
		turn_controller.handle_unit_death(target)

	# UX delay
	await get_tree().create_timer(0.3).timeout


## Execute move action to target position
func execute_move(unit: Node, target_pos: Vector2i) -> void:
	# Get old cell and remove unit
	var old_cell = turn_controller.get_cell_at(unit.grid_col, unit.grid_row)
	old_cell.remove_unit()

	# Update board state
	game_manager.board[unit.grid_row][unit.grid_col] = null

	# Update unit position
	unit.grid_col = target_pos.x
	unit.grid_row = target_pos.y

	# Place unit in new cell
	var new_cell = turn_controller.get_cell_at(target_pos.x, target_pos.y)
	new_cell.place_unit(unit)

	# Update board with new position
	game_manager.board[target_pos.y][target_pos.x] = unit

	# Check if reached player zone (row 0)
	if target_pos.y == 0:
		turn_controller.damage_jarl(0)

	# UX delay
	await get_tree().create_timer(0.3).timeout
