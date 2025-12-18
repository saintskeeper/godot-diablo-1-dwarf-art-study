extends Node
class_name TurnController

# Properties
var selected_unit: Node = null
var has_moved: bool = false
var has_attacked: bool = false
var cells: Dictionary = {}  # Maps "col,row" string to GridCell reference
var event_die: Node = null  # Reference set externally

# Reference to GameManager autoload
@onready var game_manager: Node = get_node("/root/GameManager")


func _ready() -> void:
	# GameManager reference is initialized via @onready
	pass


## Store cell in cells dictionary using "col,row" key
func register_cell(cell: Node) -> void:
	var key: String = str(cell.col) + "," + str(cell.row)
	cells[key] = cell

	# Connect cell's click signal to our handler
	if not cell.cell_clicked.is_connected(on_cell_clicked):
		cell.cell_clicked.connect(on_cell_clicked)


## Reset turn state at the start of player's turn
func start_player_turn() -> void:
	game_manager.current_state = game_manager.GameState.PLAYER_TURN
	selected_unit = null
	has_moved = false
	has_attacked = false
	clear_all_highlights()


## Main input handler for cell clicks
func on_cell_clicked(cell: Node) -> void:
	# Ignore clicks if not player's turn
	if game_manager.current_state != game_manager.GameState.PLAYER_TURN:
		return

	# Case 1: No unit selected
	if selected_unit == null:
		if cell.current_unit != null and cell.current_unit.team == game_manager.Team.PLAYER:
			select_unit(cell.current_unit)
		return

	# Case 2: Unit is selected
	# Check if clicking same cell (deselect)
	if cell.current_unit == selected_unit:
		selected_unit = null
		clear_all_highlights()
		return

	# Check if clicking a different player unit (switch selection)
	if cell.current_unit != null and cell.current_unit.team == game_manager.Team.PLAYER:
		select_unit(cell.current_unit)
		return

	# Check if clicking an empty cell (try move)
	if cell.current_unit == null:
		try_move(cell)
		return

	# Check if clicking an enemy unit (try attack)
	if cell.current_unit != null and cell.current_unit.team == game_manager.Team.ENEMY:
		try_attack(cell.current_unit)
		return


## Select a unit and highlight valid actions
func select_unit(unit: Node) -> void:
	clear_all_highlights()
	selected_unit = unit

	# Highlight the selected unit's cell
	var unit_cell = get_cell_at(unit.grid_col, unit.grid_row)
	if unit_cell:
		unit_cell.set_highlight("selected")

	# Highlight valid moves (green) if unit hasn't moved
	if not has_moved:
		var valid_moves = unit.get_valid_moves(game_manager.board)
		for move_pos in valid_moves:
			var cell = get_cell_at(move_pos.x, move_pos.y)
			if cell:
				cell.set_highlight("move")

	# Highlight valid attack targets (red) if unit hasn't attacked
	if not has_attacked:
		var valid_targets = unit.get_valid_targets(game_manager.board)
		for target in valid_targets:
			var cell = get_cell_at(target.grid_col, target.grid_row)
			if cell:
				cell.set_highlight("attack")


## Attempt to move selected unit to target cell
func try_move(target_cell: Node) -> void:
	if selected_unit == null:
		return

	if has_moved:
		print("TurnController: Unit has already moved this turn")
		return

	# Validate move is in valid moves list
	var valid_moves = selected_unit.get_valid_moves(game_manager.board)
	var target_pos = Vector2i(target_cell.col, target_cell.row)

	if target_pos not in valid_moves:
		print("TurnController: Invalid move position")
		return

	# Get the current cell
	var old_cell = get_cell_at(selected_unit.grid_col, selected_unit.grid_row)

	# Update board array
	game_manager.board[selected_unit.grid_row][selected_unit.grid_col] = null
	game_manager.board[target_cell.row][target_cell.col] = selected_unit

	# Update cell references
	if old_cell:
		old_cell.remove_unit()
	target_cell.place_unit(selected_unit)

	# Update unit's grid position (place_unit does this, but we ensure it)
	selected_unit.grid_col = target_cell.col
	selected_unit.grid_row = target_cell.row

	# Set has_moved flag
	has_moved = true

	# Check if unit reached enemy zone (row 2 for player)
	if selected_unit.team == game_manager.Team.PLAYER and target_cell.row == 2:
		damage_jarl(game_manager.Team.ENEMY)
	elif selected_unit.team == game_manager.Team.ENEMY and target_cell.row == 0:
		damage_jarl(game_manager.Team.PLAYER)

	# Refresh highlights to show remaining actions
	select_unit(selected_unit)


## Attempt to attack target unit with selected unit
func try_attack(target: Node) -> void:
	if selected_unit == null:
		return

	if has_attacked:
		print("TurnController: Unit has already attacked this turn")
		return

	# Validate target is in valid targets list
	var valid_targets = selected_unit.get_valid_targets(game_manager.board)

	if target not in valid_targets:
		print("TurnController: Invalid attack target")
		return

	# Calculate damage (attack + damage_bonus)
	var total_damage = selected_unit.attack + selected_unit.damage_bonus

	# Reset damage bonus after using it
	selected_unit.damage_bonus = 0

	# Apply damage to target
	var died = target.take_damage(total_damage)

	# Handle death if target died
	if died:
		handle_unit_death(target)

	# Set has_attacked flag
	has_attacked = true

	# Refresh highlights to show remaining actions
	select_unit(selected_unit)


## Damage the Jarl of the specified team
func damage_jarl(team: int) -> void:
	if team == game_manager.Team.PLAYER:
		game_manager.player_jarl_hp -= 1
		game_manager.jarl_damaged.emit(team, game_manager.player_jarl_hp)

		# Check win condition
		if game_manager.player_jarl_hp <= 0:
			game_manager.current_state = game_manager.GameState.GAME_OVER
			game_manager.game_over.emit(game_manager.Team.ENEMY)
			return
	else:
		game_manager.enemy_jarl_hp -= 1
		game_manager.jarl_damaged.emit(team, game_manager.enemy_jarl_hp)

		# Check win condition
		if game_manager.enemy_jarl_hp <= 0:
			game_manager.current_state = game_manager.GameState.GAME_OVER
			game_manager.game_over.emit(game_manager.Team.PLAYER)
			return

	# Trigger event die roll
	trigger_event_die()


## Handle unit death - remove from board, track for revival
func handle_unit_death(unit: Node) -> void:
	# Remove from board array
	game_manager.board[unit.grid_row][unit.grid_col] = null

	# Get the cell and remove unit from it
	var cell = get_cell_at(unit.grid_col, unit.grid_row)
	if cell:
		cell.remove_unit()

	# Add to dead units for potential revival
	game_manager.dead_units.append(unit)

	# Remove from team array
	if unit.team == game_manager.Team.PLAYER:
		game_manager.player_units.erase(unit)
	else:
		game_manager.enemy_units.erase(unit)

	# Hide unit (don't free for potential revival)
	unit.visible = false

	# Emit signal
	game_manager.unit_died.emit(unit)

	# Trigger event die roll
	trigger_event_die()


## Trigger the event die roll
func trigger_event_die() -> void:
	# Store the current state before changing to EVENT_ROLLING
	var state_before_event = game_manager.current_state

	# Set game state to EVENT_ROLLING
	game_manager.current_state = game_manager.GameState.EVENT_ROLLING

	# Call event_die.roll() if reference exists, passing the previous state
	if event_die and event_die.has_method("roll"):
		event_die.previous_state = state_before_event
		event_die.roll()
	else:
		print("TurnController: No event die reference or roll method")
		# Restore state if no event die
		game_manager.current_state = state_before_event


## End the current turn and switch to next phase
func end_turn() -> void:
	# Clear highlights
	clear_all_highlights()

	# Deselect unit
	selected_unit = null

	# Determine next team based on current state
	var next_team: int
	var next_state: game_manager.GameState

	if game_manager.current_state == game_manager.GameState.PLAYER_TURN:
		next_team = game_manager.Team.ENEMY
		next_state = game_manager.GameState.ENEMY_TURN
	else:
		next_team = game_manager.Team.PLAYER
		next_state = game_manager.GameState.PLAYER_TURN

	# Switch current state
	game_manager.current_state = next_state

	# Emit turn_changed signal
	game_manager.turn_changed.emit(next_team)


## Get cell at specific grid position
func get_cell_at(col: int, row: int) -> Node:
	var key: String = str(col) + "," + str(row)
	return cells.get(key)


## Clear all cell highlights
func clear_all_highlights() -> void:
	for cell in cells.values():
		cell.clear_highlight()
