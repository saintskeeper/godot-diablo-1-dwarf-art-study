extends Button

var turn_controller: Node = null

func _ready():
	pressed.connect(_on_pressed)

func _on_pressed():
	if turn_controller and turn_controller.has_method("end_turn"):
		turn_controller.end_turn()

func set_enabled(enabled: bool):
	disabled = !enabled
