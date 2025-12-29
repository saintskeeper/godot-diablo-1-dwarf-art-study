extends CanvasLayer

@onready var distance_label: Label = $MarginContainer/VBoxContainer/DistanceLabel
@onready var difficulty_label: Label = $MarginContainer/VBoxContainer/DifficultyLabel

var main_scene: Node2D


func _ready() -> void:
	main_scene = get_parent()


func _process(_delta: float) -> void:
	if main_scene.has_method("get_score"):
		distance_label.text = "Distance: %d m" % main_scene.get_score()

	if main_scene.has_method("get_difficulty"):
		var diff: int = main_scene.get_difficulty()
		difficulty_label.text = "Level: %d" % (diff + 1)
