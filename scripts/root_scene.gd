extends Node2D

# Preload unit scenes
const VIKING_SCENE = preload("res://prefabs/units/viking.tscn")
const SHAMAN_SCENE = preload("res://prefabs/units/shaman.tscn")
const ARCHER_SCENE = preload("res://prefabs/units/archer.tscn")

# Controller references
var turn_controller: Node = null
var bot_ai: Node = null
var event_die: Node = null

# Grid reference
@onready var grid = $Grid

func _ready():
	# Get GameManager reference and initialize
	var game_manager = get_node("/root/GameManager")

	# Create and add TurnController
	var turn_controller_script = load("res://scripts/controllers/turn_controller.gd")
	turn_controller = Node.new()
	turn_controller.set_script(turn_controller_script)
	turn_controller.name = "TurnController"
	add_child(turn_controller)

	# Create and add BotAI
	var bot_ai_script = load("res://scripts/controllers/bot_ai.gd")
	bot_ai = Node.new()
	bot_ai.set_script(bot_ai_script)
	bot_ai.name = "BotAI"
	bot_ai.turn_controller = turn_controller
	add_child(bot_ai)

	# Setup grid cells
	setup_grid_cells()

	# Spawn starting units
	spawn_starting_units()

	# Connect GameManager signals
	if game_manager.turn_changed.connect(_on_turn_changed) != OK:
		print("Warning: Failed to connect turn_changed signal")
	if game_manager.game_over.connect(_on_game_over) != OK:
		print("Warning: Failed to connect game_over signal")

	# Start player turn
	game_manager.current_turn = 0
	game_manager.turn_changed.emit(0)

func setup_grid_cells():
	# Map row container names to row indices
	var row_mapping = {
		"TopGrid": 2,
		"MiddleGrid": 1,
		"BottomGrid": 0
	}

	# Iterate through grid children (row containers)
	for row_container in grid.get_children():
		var row_name = row_container.name

		# Get row index from mapping
		var row_idx = -1
		if row_name == "TopGrid":
			row_idx = 2
		elif row_name == "MiddleGrid":
			row_idx = 1
		elif row_name == "BottomGrid":
			row_idx = 0
		else:
			continue

		# Iterate through cells in this row
		var col_idx = 0
		for cell in row_container.get_children():
			# Set cell properties
			if cell.has_method("set_grid_position"):
				cell.set_grid_position(col_idx, row_idx)
			else:
				cell.col = col_idx
				cell.row = row_idx

			# Register cell with turn controller
			if turn_controller and turn_controller.has_method("register_cell"):
				turn_controller.register_cell(cell)

			col_idx += 1

func spawn_starting_units():
	var game_manager = get_node("/root/GameManager")

	# Spawn player units (team 0) at row 0
	spawn_unit(VIKING_SCENE, 0, 0, 0)  # Viking at [0,0]
	spawn_unit(SHAMAN_SCENE, 0, 1, 0)  # Shaman at [1,0]
	spawn_unit(ARCHER_SCENE, 0, 2, 0)  # Archer at [2,0]

	# Spawn enemy units (team 1) at row 2
	spawn_unit(VIKING_SCENE, 1, 0, 2)  # Viking at [0,2]
	spawn_unit(SHAMAN_SCENE, 1, 1, 2)  # Shaman at [1,2]
	spawn_unit(ARCHER_SCENE, 1, 2, 2)  # Archer at [2,2]

func spawn_unit(scene: PackedScene, team: int, col: int, row: int) -> Node:
	var game_manager = get_node("/root/GameManager")

	# Instantiate the unit
	var unit = scene.instantiate()

	# Set team
	unit.team = team

	# Get the cell at this position
	var cell = turn_controller.get_cell_at(col, row)
	if not cell:
		print("Error: Could not find cell at [", col, ",", row, "]")
		unit.queue_free()
		return null

	# Add unit as child of cell's UnitAnchor or cell itself
	if cell.has_node("UnitAnchor"):
		var anchor = cell.get_node("UnitAnchor")
		anchor.add_child(unit)
	else:
		cell.add_child(unit)

	# Place unit on cell
	if cell.has_method("place_unit"):
		cell.place_unit(unit)

	# Update board state
	game_manager.board[col][row] = unit

	# Add to team array
	if team == 0:
		game_manager.player_units.append(unit)
	else:
		game_manager.enemy_units.append(unit)

	return unit

func _on_turn_changed(team: int):
	var game_manager = get_node("/root/GameManager")

	# Clear frozen status on team's units
	var units_to_clear = game_manager.player_units if team == 0 else game_manager.enemy_units
	for unit in units_to_clear:
		if unit and unit.has_method("clear_frozen"):
			unit.clear_frozen()
		elif unit and "is_frozen" in unit:
			unit.is_frozen = false

	# Execute turn based on team
	if team == 1:  # Enemy turn
		if bot_ai and bot_ai.has_method("execute_turn"):
			bot_ai.execute_turn()
	else:  # Player turn
		if turn_controller and turn_controller.has_method("start_player_turn"):
			turn_controller.start_player_turn()

func _on_game_over(winner: int):
	if winner == 0:
		print("VICTORY! Player wins!")
	else:
		print("DEFEAT! Enemy wins!")

	# Show game over UI if it exists
	if has_node("GameOverUI"):
		var game_over_ui = get_node("GameOverUI")
		if game_over_ui.has_method("show_game_over"):
			game_over_ui.show_game_over(winner)
		elif game_over_ui.has_method("show"):
			game_over_ui.show()

func restart_game():
	var game_manager = get_node("/root/GameManager")

	# Reset game manager state
	if game_manager.has_method("reset_game"):
		game_manager.reset_game()

	# Clear all units from the board
	for col in range(3):
		for row in range(3):
			var cell = turn_controller.get_cell_at(col, row)
			if cell:
				# Remove any units on this cell
				for child in cell.get_children():
					if child.has_method("die") or "health" in child:
						child.queue_free()

				# Clear cell reference
				if cell.has_method("clear_unit"):
					cell.clear_unit()

			# Clear board state
			game_manager.board[col][row] = null

	# Clear team arrays
	game_manager.player_units.clear()
	game_manager.enemy_units.clear()

	# Respawn units
	spawn_starting_units()

	# Reset to player turn
	game_manager.current_turn = 0
	game_manager.turn_changed.emit(0)
