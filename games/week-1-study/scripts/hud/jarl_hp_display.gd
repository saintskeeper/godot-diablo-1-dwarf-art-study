extends Control

@export var team: int = 0  # 0=Player, 1=Enemy

var hearts: Array = []

func _ready():
	# Get heart ColorRects from the Hearts container
	var hearts_container = get_node("Hearts")
	if hearts_container:
		for child in hearts_container.get_children():
			if child is ColorRect:
				hearts.append(child)

	# Connect to GameManager's jarl_damaged signal
	if GameManager.has_signal("jarl_damaged"):
		GameManager.jarl_damaged.connect(_on_jarl_damaged)

func set_hp(value: int):
	# Clamp value between 0 and 3
	value = clamp(value, 0, 3)

	# Show/hide hearts based on HP value
	for i in range(hearts.size()):
		if i < value:
			hearts[i].visible = true
		else:
			hearts[i].visible = false

func _on_jarl_damaged(damaged_team: int, new_hp: int):
	# Only update if the damaged team matches this display's team
	if damaged_team == team:
		set_hp(new_hp)
