extends ParallaxBackground

@export var scroll_speed: float = 100.0
@export var auto_scroll: bool = true


func _process(delta: float) -> void:
	if auto_scroll:
		scroll_offset.x -= scroll_speed * delta
