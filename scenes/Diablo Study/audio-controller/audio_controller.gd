extends Node2D

@onready var audio_player: AudioStreamPlayer = $AudioStreamPlayer


func _ready() -> void:
	audio_player.finished.connect(_on_audio_finished)


func _on_audio_finished() -> void:
	audio_player.play()
