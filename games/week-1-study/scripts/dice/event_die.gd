extends Node2D
class_name EventDie

# Signals
signal roll_started()
signal roll_finished(result: int)

# Properties
var triggering_unit: Node = null
var turn_controller: Node = null  # Set externally
var previous_state: int = -1  # Track state before event rolling

# Reference to GameManager autoload
@onready var game_manager: Node = get_node("/root/GameManager")


func _ready() -> void:
	# GameManager reference is initialized via @onready
	pass


## Roll the event die and apply the resulting event
func roll(trigger_unit: Node = null) -> void:
	# Store triggering unit
	triggering_unit = trigger_unit

	# Note: previous_state is set by trigger_event_die() before this is called

	# Emit roll started signal
	roll_started.emit()

	# Wait for animation placeholder
	await get_tree().create_timer(1.0).timeout

	# Generate random result (1-6)
	var result: int = randi_range(1, 6)

	# Apply the event effect
	apply_event(result)

	# Emit roll finished signal
	roll_finished.emit(result)

	# Emit GameManager event triggered signal
	game_manager.event_triggered.emit(result)

	# Reset game state to the state before the event
	if game_manager.current_state == game_manager.GameState.EVENT_ROLLING:
		if previous_state != -1 and previous_state != game_manager.GameState.EVENT_ROLLING:
			game_manager.current_state = previous_state
		else:
			# Fallback to player turn if no valid previous state
			game_manager.current_state = game_manager.GameState.PLAYER_TURN
		previous_state = -1


## Apply event based on roll result
func apply_event(roll: int) -> void:
	match roll:
		1:
			ragnarok_rumble()
		2:
			odins_favor()
		3:
			lokis_trick()
		4:
			thors_blessing()
		5:
			frost_giants_breath()
		6:
			valhallas_call()
		_:
			print("EventDie: Invalid roll result: ", roll)


## Event 1: Ragnarok Rumble - All units on the battlefield take 1 damage
func ragnarok_rumble() -> void:
	# Get all units from both teams
	var all_units: Array = []
	all_units.append_array(game_manager.player_units)
	all_units.append_array(game_manager.enemy_units)

	# Track units that died
	var died_units: Array = []

	# Apply damage to all units
	for unit in all_units:
		if unit and unit.hp > 0:
			var died: bool = unit.take_damage(1)
			if died:
				died_units.append(unit)

	# Handle all deaths (may chain more event die rolls!)
	for unit in died_units:
		if turn_controller and turn_controller.has_method("handle_unit_death"):
			turn_controller.handle_unit_death(unit)


## Event 2: Odin's Favor - The unit that triggered the shake heals 2 HP
func odins_favor() -> void:
	if triggering_unit and triggering_unit.hp > 0:
		triggering_unit.heal(2)


## Event 3: Loki's Trick - Two random units swap positions
func lokis_trick() -> void:
	# Get all alive units
	var alive_units: Array = []
	for unit in game_manager.player_units:
		if unit and unit.hp > 0:
			alive_units.append(unit)
	for unit in game_manager.enemy_units:
		if unit and unit.hp > 0:
			alive_units.append(unit)

	# Need at least 2 units to swap
	if alive_units.size() < 2:
		return

	# Shuffle and pick first two units
	alive_units.shuffle()
	var unit_a: Node = alive_units[0]
	var unit_b: Node = alive_units[1]

	# Store original positions
	var a_col: int = unit_a.grid_col
	var a_row: int = unit_a.grid_row
	var b_col: int = unit_b.grid_col
	var b_row: int = unit_b.grid_row

	# Swap positions in board array
	game_manager.board[a_row][a_col] = unit_b
	game_manager.board[b_row][b_col] = unit_a

	# Swap grid positions on units
	unit_a.grid_col = b_col
	unit_a.grid_row = b_row
	unit_b.grid_col = a_col
	unit_b.grid_row = a_row

	# Update cell references via turn_controller
	if turn_controller:
		var cell_a = turn_controller.get_cell_at(a_col, a_row)
		var cell_b = turn_controller.get_cell_at(b_col, b_row)

		if cell_a and cell_b:
			# Remove units from their old cells
			cell_a.remove_unit()
			cell_b.remove_unit()

			# Place units in their new cells
			cell_a.place_unit(unit_b)
			cell_b.place_unit(unit_a)


## Event 4: Thor's Blessing - Triggering unit's next attack deals +2 damage
func thors_blessing() -> void:
	if triggering_unit and triggering_unit.hp > 0:
		triggering_unit.damage_bonus = 2


## Event 5: Frost Giant's Breath - Random column is frozen, units there skip next turn
func frost_giants_breath() -> void:
	# Pick random column (0-2)
	var frozen_col: int = randi_range(0, 2)

	# Freeze all units in that column
	for row in range(3):
		var unit = game_manager.board[row][frozen_col]
		if unit and unit.hp > 0:
			unit.is_frozen = true


## Event 6: Valhalla's Call - A random dead unit revives with 1 HP
func valhallas_call() -> void:
	# Check if there are any dead units
	if game_manager.dead_units.is_empty():
		return

	# Pick random dead unit
	var dead_unit: Node = game_manager.dead_units.pick_random()

	# Remove from dead units
	game_manager.dead_units.erase(dead_unit)

	# Determine spawn row based on team
	var spawn_row: int = 0 if dead_unit.team == game_manager.Team.PLAYER else 2

	# Find empty spawn position in the spawn row
	var spawn_col: int = -1
	for col in range(3):
		if game_manager.board[spawn_row][col] == null:
			spawn_col = col
			break

	# If no empty spawn position, try other rows
	if spawn_col == -1:
		for row in range(3):
			for col in range(3):
				if game_manager.board[row][col] == null:
					spawn_row = row
					spawn_col = col
					break
			if spawn_col != -1:
				break

	# If still no position, cannot revive
	if spawn_col == -1:
		# Put unit back in dead_units
		game_manager.dead_units.append(dead_unit)
		return

	# Revive the unit
	dead_unit.hp = 1
	dead_unit.visible = true
	dead_unit.is_frozen = false
	dead_unit.damage_bonus = 0

	# Update grid positions
	dead_unit.grid_col = spawn_col
	dead_unit.grid_row = spawn_row

	# Update board array
	game_manager.board[spawn_row][spawn_col] = dead_unit

	# Update cell reference via turn_controller
	if turn_controller:
		var cell = turn_controller.get_cell_at(spawn_col, spawn_row)
		if cell:
			cell.place_unit(dead_unit)

	# Add back to appropriate team array
	if dead_unit.team == game_manager.Team.PLAYER:
		game_manager.player_units.append(dead_unit)
	else:
		game_manager.enemy_units.append(dead_unit)
