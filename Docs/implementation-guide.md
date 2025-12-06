# Unstable Table - Implementation Guide

A step-by-step guide to implement the MVP features for your game jam.

---

## Current State

Your scene structure:
```
RootScene (Node2D)
├── Background
├── AbilityIcons
└── Grid
    ├── TopGrid (Row 2 - Enemy side)
    │   ├── Grid  [0,2]
    │   ├── Grid2 [1,2]
    │   └── Grid3 [2,2]
    ├── MiddleGrid (Row 1 - Midline)
    │   ├── Grid  [0,1]
    │   ├── Grid2 [1,1]
    │   └── Grid3 [2,1]
    └── BottomGrid (Row 0 - Player side)
        ├── Grid  [0,0]
        ├── Grid2 [1,0]
        └── Grid3 [2,0]
```

---

## Phase 1: Core Data Structures

### 1.1 Create `scripts/game_manager.gd`

```gdscript
extends Node

# Enums
enum UnitType { VIKING, SHAMAN, ARCHER }
enum Team { PLAYER, ENEMY }
enum GameState { PLAYER_TURN, ENEMY_TURN, EVENT_ROLLING, GAME_OVER }

# Game state
var current_state: GameState = GameState.PLAYER_TURN
var player_jarl_hp: int = 3
var enemy_jarl_hp: int = 3

# Board representation: 2D array [col][row]
# null = empty, otherwise holds Unit reference
var board: Array = []

# Unit tracking
var player_units: Array = []
var enemy_units: Array = []
var dead_units: Array = []  # For Valhalla's Call revival

# Signals
signal turn_changed(team: Team)
signal jarl_damaged(team: Team, new_hp: int)
signal unit_died(unit: Node)
signal event_triggered(roll: int)
signal game_over(winner: Team)

func _ready():
    initialize_board()

func initialize_board():
    board = []
    for col in range(3):
        board.append([null, null, null])
```

### 1.2 Create `scripts/unit.gd`

```gdscript
extends Node2D
class_name Unit

@export var unit_type: int = 0  # 0=Viking, 1=Shaman, 2=Archer
@export var team: int = 0       # 0=Player, 1=Enemy

# Stats based on unit type
var max_hp: int
var hp: int
var attack: int
var attack_range: int

# Board position
var grid_col: int = 0
var grid_row: int = 0

# Status effects
var is_frozen: bool = false
var damage_bonus: int = 0  # Thor's Blessing

signal unit_selected(unit: Unit)
signal unit_attacked(attacker: Unit, target: Unit, damage: int)
signal unit_moved(unit: Unit, from_col: int, from_row: int, to_col: int, to_row: int)

func _ready():
    setup_stats()

func setup_stats():
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
    hp = max_hp

func take_damage(amount: int) -> bool:
    hp -= amount
    if hp <= 0:
        hp = 0
        return true  # Unit died
    return false

func heal(amount: int):
    hp = min(hp + amount, max_hp)

func get_valid_moves(board: Array) -> Array:
    var moves = []
    var directions = [
        Vector2i(0, 1),   # Up
        Vector2i(0, -1),  # Down
        Vector2i(-1, 0),  # Left
        Vector2i(1, 0)    # Right
    ]

    for dir in directions:
        var new_col = grid_col + dir.x
        var new_row = grid_row + dir.y

        if new_col >= 0 and new_col < 3 and new_row >= 0 and new_row < 3:
            if board[new_col][new_row] == null:
                moves.append(Vector2i(new_col, new_row))

    return moves

func get_valid_targets(board: Array) -> Array:
    var targets = []

    if unit_type == 2:  # Archer - 2 tiles in row
        # Check same row, up to 2 tiles in each direction
        for offset in [-2, -1, 1, 2]:
            var check_col = grid_col + offset
            if check_col >= 0 and check_col < 3:
                var target = board[check_col][grid_row]
                if target != null and target.team != team:
                    targets.append(target)
    else:  # Melee - adjacent only
        var directions = [
            Vector2i(0, 1), Vector2i(0, -1),
            Vector2i(-1, 0), Vector2i(1, 0)
        ]
        for dir in directions:
            var check_col = grid_col + dir.x
            var check_row = grid_row + dir.y
            if check_col >= 0 and check_col < 3 and check_row >= 0 and check_row < 3:
                var target = board[check_col][check_row]
                if target != null and target.team != team:
                    targets.append(target)

    return targets
```

---

## Phase 2: Grid Cell Logic

### 2.1 Update your grid prefab - Create `scripts/grid_cell.gd`

```gdscript
extends Node2D
class_name GridCell

@export var col: int = 0
@export var row: int = 0

var current_unit: Unit = null
var is_highlighted: bool = false
var highlight_type: String = ""  # "move", "attack", "selected"

signal cell_clicked(cell: GridCell)
signal cell_hovered(cell: GridCell)

func _ready():
    # Make clickable
    var area = Area2D.new()
    var collision = CollisionShape2D.new()
    var shape = RectangleShape2D.new()
    shape.size = Vector2(64, 64)  # Adjust to your cell size
    collision.shape = shape
    area.add_child(collision)
    add_child(area)

    area.input_event.connect(_on_input_event)
    area.mouse_entered.connect(_on_mouse_entered)

func _on_input_event(_viewport, event, _shape_idx):
    if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
        cell_clicked.emit(self)

func _on_mouse_entered():
    cell_hovered.emit(self)

func set_highlight(type: String):
    highlight_type = type
    is_highlighted = true
    # Visual feedback - you can use modulate or swap sprites
    match type:
        "move":
            modulate = Color(0.5, 1, 0.5, 1)  # Green tint
        "attack":
            modulate = Color(1, 0.5, 0.5, 1)  # Red tint
        "selected":
            modulate = Color(1, 1, 0.5, 1)   # Yellow tint

func clear_highlight():
    is_highlighted = false
    highlight_type = ""
    modulate = Color.WHITE

func place_unit(unit: Unit):
    current_unit = unit
    unit.grid_col = col
    unit.grid_row = row
    unit.position = Vector2.ZERO  # Center on cell

func remove_unit() -> Unit:
    var unit = current_unit
    current_unit = null
    return unit
```

---

## Phase 3: Turn & Input System

### 3.1 Create `scripts/turn_controller.gd`

```gdscript
extends Node

var game_manager: Node
var selected_unit: Unit = null
var has_moved: bool = false
var has_attacked: bool = false

signal action_completed()

func _ready():
    game_manager = get_node("/root/GameManager")  # Autoload

func start_player_turn():
    selected_unit = null
    has_moved = false
    has_attacked = false
    # Enable input

func on_cell_clicked(cell: GridCell):
    if game_manager.current_state != game_manager.GameState.PLAYER_TURN:
        return

    if selected_unit == null:
        # Try to select a unit
        if cell.current_unit != null and cell.current_unit.team == 0:  # Player team
            select_unit(cell.current_unit)
    else:
        # Unit already selected - try to move or attack
        if cell.current_unit == null:
            # Move to empty cell
            try_move(cell)
        elif cell.current_unit.team == 1:  # Enemy
            # Attack enemy
            try_attack(cell.current_unit)
        elif cell.current_unit.team == 0:
            # Select different player unit
            select_unit(cell.current_unit)

func select_unit(unit: Unit):
    clear_all_highlights()
    selected_unit = unit

    # Highlight valid moves
    if not has_moved:
        var moves = unit.get_valid_moves(game_manager.board)
        for move in moves:
            var cell = get_cell_at(move.x, move.y)
            cell.set_highlight("move")

    # Highlight valid targets
    if not has_attacked:
        var targets = unit.get_valid_targets(game_manager.board)
        for target in targets:
            var cell = get_cell_at(target.grid_col, target.grid_row)
            cell.set_highlight("attack")

func try_move(target_cell: GridCell):
    if has_moved or selected_unit == null:
        return

    var valid_moves = selected_unit.get_valid_moves(game_manager.board)
    var target_pos = Vector2i(target_cell.col, target_cell.row)

    if target_pos in valid_moves:
        # Execute move
        var old_cell = get_cell_at(selected_unit.grid_col, selected_unit.grid_row)
        old_cell.remove_unit()
        game_manager.board[selected_unit.grid_col][selected_unit.grid_row] = null

        target_cell.place_unit(selected_unit)
        game_manager.board[target_cell.col][target_cell.row] = selected_unit

        has_moved = true

        # Check if unit reached enemy zone (row 2 for player)
        if selected_unit.team == 0 and target_cell.row == 2:
            damage_jarl(1)  # Enemy team

        # Refresh highlights
        select_unit(selected_unit)

func try_attack(target: Unit):
    if has_attacked or selected_unit == null:
        return

    var valid_targets = selected_unit.get_valid_targets(game_manager.board)
    if target in valid_targets:
        var damage = selected_unit.attack + selected_unit.damage_bonus
        selected_unit.damage_bonus = 0  # Reset Thor's Blessing

        var died = target.take_damage(damage)
        has_attacked = true

        if died:
            handle_unit_death(target)

        # Refresh highlights
        select_unit(selected_unit)

func damage_jarl(team: int):
    if team == 0:
        game_manager.player_jarl_hp -= 1
        game_manager.jarl_damaged.emit(0, game_manager.player_jarl_hp)
    else:
        game_manager.enemy_jarl_hp -= 1
        game_manager.jarl_damaged.emit(1, game_manager.enemy_jarl_hp)

    # Trigger table shake
    trigger_event_die()

    # Check win condition
    if game_manager.player_jarl_hp <= 0:
        game_manager.game_over.emit(1)  # Enemy wins
    elif game_manager.enemy_jarl_hp <= 0:
        game_manager.game_over.emit(0)  # Player wins

func handle_unit_death(unit: Unit):
    # Remove from board
    game_manager.board[unit.grid_col][unit.grid_row] = null
    var cell = get_cell_at(unit.grid_col, unit.grid_row)
    cell.remove_unit()

    # Track for revival
    game_manager.dead_units.append(unit)

    # Remove from team list
    if unit.team == 0:
        game_manager.player_units.erase(unit)
    else:
        game_manager.enemy_units.erase(unit)

    game_manager.unit_died.emit(unit)

    # Hide unit (don't free, might revive)
    unit.visible = false

    # Trigger table shake
    trigger_event_die()

func end_turn():
    clear_all_highlights()
    selected_unit = null

    if game_manager.current_state == game_manager.GameState.PLAYER_TURN:
        game_manager.current_state = game_manager.GameState.ENEMY_TURN
        game_manager.turn_changed.emit(1)
    else:
        game_manager.current_state = game_manager.GameState.PLAYER_TURN
        game_manager.turn_changed.emit(0)
        start_player_turn()

func trigger_event_die():
    game_manager.current_state = game_manager.GameState.EVENT_ROLLING
    # Connect to event_die.gd

func get_cell_at(col: int, row: int) -> GridCell:
    # You'll need to implement this based on your scene structure
    # Could use a dictionary mapping or direct node paths
    pass

func clear_all_highlights():
    # Clear all cell highlights
    pass
```

---

## Phase 4: Event Die System

### 4.1 Create `scripts/event_die.gd`

```gdscript
extends Node2D

var game_manager: Node
var turn_controller: Node
var triggering_unit: Unit = null

signal roll_started()
signal roll_finished(result: int)

func _ready():
    game_manager = get_node("/root/GameManager")

func roll(trigger_unit: Unit = null):
    triggering_unit = trigger_unit
    roll_started.emit()

    # Animate dice roll (simplified - add tween for visual)
    await get_tree().create_timer(1.0).timeout

    var result = randi_range(1, 6)
    apply_event(result)

    roll_finished.emit(result)
    game_manager.event_triggered.emit(result)

func apply_event(roll: int):
    match roll:
        1:  # Ragnarok Rumble - All units take 1 damage
            ragnarok_rumble()
        2:  # Odin's Favor - Triggering unit heals 2 HP
            odins_favor()
        3:  # Loki's Trick - Two random units swap
            lokis_trick()
        4:  # Thor's Blessing - +2 damage on next attack
            thors_blessing()
        5:  # Frost Giant's Breath - Random column frozen
            frost_giants_breath()
        6:  # Valhalla's Call - Revive random dead unit
            valhallas_call()

func ragnarok_rumble():
    var all_units = game_manager.player_units + game_manager.enemy_units
    var units_to_kill = []

    for unit in all_units:
        var died = unit.take_damage(1)
        if died:
            units_to_kill.append(unit)

    # Process deaths (may trigger more shakes!)
    for unit in units_to_kill:
        turn_controller.handle_unit_death(unit)

func odins_favor():
    if triggering_unit != null and triggering_unit.hp > 0:
        triggering_unit.heal(2)

func lokis_trick():
    var all_units = game_manager.player_units + game_manager.enemy_units
    if all_units.size() < 2:
        return

    # Pick two random units
    all_units.shuffle()
    var unit1 = all_units[0]
    var unit2 = all_units[1]

    # Swap positions
    var col1 = unit1.grid_col
    var row1 = unit1.grid_row
    var col2 = unit2.grid_col
    var row2 = unit2.grid_row

    # Update board
    game_manager.board[col1][row1] = unit2
    game_manager.board[col2][row2] = unit1

    # Update units
    unit1.grid_col = col2
    unit1.grid_row = row2
    unit2.grid_col = col1
    unit2.grid_row = row1

    # Update visual positions
    var cell1 = turn_controller.get_cell_at(col1, row1)
    var cell2 = turn_controller.get_cell_at(col2, row2)
    cell1.current_unit = unit2
    cell2.current_unit = unit1
    # Tween positions for smooth animation

func thors_blessing():
    if triggering_unit != null and triggering_unit.hp > 0:
        triggering_unit.damage_bonus = 2

func frost_giants_breath():
    var frozen_col = randi_range(0, 2)

    for row in range(3):
        var unit = game_manager.board[frozen_col][row]
        if unit != null:
            unit.is_frozen = true

    # Clear freeze at start of next turn (connect to turn signal)

func valhallas_call():
    if game_manager.dead_units.is_empty():
        return

    # Pick random dead unit
    var unit = game_manager.dead_units.pick_random()
    game_manager.dead_units.erase(unit)

    # Find empty spawn position for the unit's team
    var spawn_row = 0 if unit.team == 0 else 2
    var spawn_col = -1

    for col in range(3):
        if game_manager.board[col][spawn_row] == null:
            spawn_col = col
            break

    if spawn_col == -1:
        # No room, try middle row
        for col in range(3):
            if game_manager.board[col][1] == null:
                spawn_col = col
                spawn_row = 1
                break

    if spawn_col != -1:
        # Revive unit
        unit.hp = 1
        unit.visible = true
        unit.grid_col = spawn_col
        unit.grid_row = spawn_row
        game_manager.board[spawn_col][spawn_row] = unit

        if unit.team == 0:
            game_manager.player_units.append(unit)
        else:
            game_manager.enemy_units.append(unit)

        var cell = turn_controller.get_cell_at(spawn_col, spawn_row)
        cell.place_unit(unit)
```

---

## Phase 5: Bot AI

### 5.1 Create `scripts/bot_ai.gd`

```gdscript
extends Node

var game_manager: Node
var turn_controller: Node

func _ready():
    game_manager = get_node("/root/GameManager")

func execute_turn():
    await get_tree().create_timer(0.5).timeout  # Delay for UX

    # Get non-frozen enemy units
    var available_units = []
    for unit in game_manager.enemy_units:
        if not unit.is_frozen:
            available_units.append(unit)

    if available_units.is_empty():
        turn_controller.end_turn()
        return

    # Find best action
    for unit in available_units:
        # Priority 1: Attack if possible
        var targets = unit.get_valid_targets(game_manager.board)
        if not targets.is_empty():
            var target = pick_best_target(targets)
            await execute_attack(unit, target)
            break

        # Priority 2: Move toward player zone
        var moves = unit.get_valid_moves(game_manager.board)
        if not moves.is_empty():
            var best_move = pick_best_move(unit, moves)
            await execute_move(unit, best_move)
            break

    await get_tree().create_timer(0.3).timeout
    turn_controller.end_turn()

func pick_best_target(targets: Array) -> Unit:
    # Prefer low HP targets
    targets.sort_custom(func(a, b): return a.hp < b.hp)
    return targets[0]

func pick_best_move(unit: Unit, moves: Array) -> Vector2i:
    # Move toward row 0 (player zone)
    moves.sort_custom(func(a, b): return a.y < b.y)
    return moves[0]

func execute_attack(unit: Unit, target: Unit):
    var damage = unit.attack + unit.damage_bonus
    unit.damage_bonus = 0

    var died = target.take_damage(damage)
    if died:
        turn_controller.handle_unit_death(target)

    await get_tree().create_timer(0.3).timeout

func execute_move(unit: Unit, target_pos: Vector2i):
    var old_cell = turn_controller.get_cell_at(unit.grid_col, unit.grid_row)
    old_cell.remove_unit()
    game_manager.board[unit.grid_col][unit.grid_row] = null

    var new_cell = turn_controller.get_cell_at(target_pos.x, target_pos.y)
    new_cell.place_unit(unit)
    game_manager.board[target_pos.x][target_pos.y] = unit

    # Check if reached player zone
    if target_pos.y == 0:
        turn_controller.damage_jarl(0)  # Player team

    await get_tree().create_timer(0.3).timeout
```

---

## Phase 6: Scene Setup Checklist

### 6.1 Create Autoloads

In **Project > Project Settings > Autoload**, add:
- `res://scripts/game_manager.gd` as `GameManager`

### 6.2 Update Scene Tree

```
RootScene
├── Background
├── Grid
│   ├── TopGrid (add grid_cell.gd to each child, set row=2)
│   ├── MiddleGrid (set row=1)
│   └── BottomGrid (set row=0)
├── AbilityIcons
├── TurnController (add turn_controller.gd)
├── EventDie (add event_die.gd + sprite)
├── BotAI (add bot_ai.gd)
└── UI
    ├── PlayerJarlHP
    ├── EnemyJarlHP
    ├── TurnIndicator
    └── EndTurnButton
```

### 6.3 Connect Signals

In your main scene script:
```gdscript
func _ready():
    # Connect grid cells
    for cell in get_all_cells():
        cell.cell_clicked.connect(turn_controller.on_cell_clicked)

    # Connect game events
    GameManager.turn_changed.connect(_on_turn_changed)
    GameManager.game_over.connect(_on_game_over)
    GameManager.jarl_damaged.connect(_on_jarl_damaged)

func _on_turn_changed(team):
    if team == 1:  # Enemy
        bot_ai.execute_turn()
```

---

## Implementation Order

1. **Day 1 Focus**:
   - [ ] `game_manager.gd` - Core data structures
   - [ ] `unit.gd` - Unit stats and logic
   - [ ] `grid_cell.gd` - Cell interaction
   - [ ] Wire up grid cells in scene

2. **Day 2 Focus**:
   - [ ] `turn_controller.gd` - Player input handling
   - [ ] Movement and attack execution
   - [ ] Basic turn flow

3. **Day 3 Focus**:
   - [ ] `event_die.gd` - All 6 events
   - [ ] `bot_ai.gd` - Enemy behavior
   - [ ] Win/lose conditions

4. **Polish**:
   - [ ] UI for HP displays
   - [ ] Visual feedback (highlights, animations)
   - [ ] Screen shake on events
   - [ ] Sound effects

---

## Quick Reference

### Grid Coordinates
```
     Col 0   Col 1   Col 2
Row 2  [0,2]   [1,2]   [2,2]  ← Enemy zone
Row 1  [0,1]   [1,1]   [2,1]  ← Midline
Row 0  [0,0]   [1,0]   [2,0]  ← Player zone
```

### Unit Stats
| Unit | HP | ATK | Range |
|------|----|-----|-------|
| Viking | 3 | 2 | 1 (adjacent) |
| Shaman | 2 | 1 | 1 (adjacent) |
| Archer | 2 | 2 | 2 (row only) |

### Event Die
| Roll | Event | Effect |
|------|-------|--------|
| 1 | Ragnarok Rumble | All units take 1 damage |
| 2 | Odin's Favor | Trigger unit heals 2 |
| 3 | Loki's Trick | 2 random units swap |
| 4 | Thor's Blessing | +2 damage next attack |
| 5 | Frost Giant's Breath | Random column frozen |
| 6 | Valhalla's Call | Revive random dead unit |
