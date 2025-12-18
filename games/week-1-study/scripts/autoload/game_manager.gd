extends Node
## GameManager - Central game state manager for Unstable Table
## This autoload singleton manages turn flow, unit tracking, and game state

# Enums
enum UnitType { VIKING, SHAMAN, ARCHER }
enum Team { PLAYER, ENEMY }
enum GameState { PLAYER_TURN, ENEMY_TURN, EVENT_ROLLING, GAME_OVER }

# Signals
signal turn_changed(team: int)
signal jarl_damaged(team: int, new_hp: int)
signal unit_died(unit: Node)
signal event_triggered(roll: int)
signal game_over(winner: int)

# Game state properties
var current_state: GameState = GameState.PLAYER_TURN
var current_turn: int = 0  # 0 = player, 1 = enemy

# Jarl health tracking
var player_jarl_hp: int = 3
var enemy_jarl_hp: int = 3

# Board and unit tracking
var board: Array = []  # 3x3 grid of unit references (or nulls)
var player_units: Array = []
var enemy_units: Array = []
var dead_units: Array = []  # For Valhalla's Call revival mechanic


func _ready() -> void:
	initialize_board()


## Initialize the 3x3 game board with null values
func initialize_board() -> void:
	board = []
	for row in 3:
		var board_row: Array = []
		for col in 3:
			board_row.append(null)
		board.append(board_row)


## Reset all game state to initial values
func reset_game() -> void:
	# Reset game state
	current_state = GameState.PLAYER_TURN

	# Reset Jarl health
	player_jarl_hp = 3
	enemy_jarl_hp = 3

	# Clear all unit arrays
	player_units.clear()
	enemy_units.clear()
	dead_units.clear()

	# Reinitialize the board
	initialize_board()
