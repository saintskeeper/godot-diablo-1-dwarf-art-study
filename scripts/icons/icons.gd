extends Node2D

# If true, automatically positions the Icons node relative to Background
# If false, allows manual positioning in the editor
@export var auto_position: bool = true

# Padding from the bottom and left edges of the Base-Background node (in pixels)
@export var padding: float = 10.0

# Called when the node enters the scene tree for the first time
func _ready():
	# Only auto-position if enabled
	if auto_position:
		# Use call_deferred to ensure all nodes are ready and viewport is initialized
		call_deferred("position_to_bottom_left")

# Positions this node to the bottom left of the Base-Background node with padding
func position_to_bottom_left():
	# Find the Base-Background node (could be named "Base-Background" or "Background")
	var background_node = find_background_node()

	if not background_node:
		print("Warning: Could not find Base-Background or Background node")
		return

	# Get the bounding rectangle of the background node (in its local space)
	var background_rect = get_node_bounds(background_node)

	if background_rect == null:
		print("Warning: Could not determine bounds of Background node")
		return

	# Calculate the bottom left position in the background node's local space
	# bottom_left = (left_edge, bottom_edge)
	var bottom_left_local = Vector2(
		background_rect.position.x,
		background_rect.position.y + background_rect.size.y
	)

	# Add padding: 10 pixels from left, 10 pixels from bottom
	var target_local = Vector2(
		bottom_left_local.x + padding,
		bottom_left_local.y - padding
	)

	# Convert from background node's local space to global space
	var target_global = background_node.to_global(target_local)

	# Convert to local position relative to our parent (RootScene)
	var parent = get_parent()
	if parent:
		# Convert global position to local position relative to parent
		position = parent.to_local(target_global)
	else:
		position = target_global

	# Debug print to help diagnose
	print("Icons positioned relative to Background:")
	print("  Background node: ", background_node.name)
	print("  Background bounds (local): ", background_rect)
	print("  Bottom-left (local): ", bottom_left_local)
	print("  Target (local): ", target_local)
	print("  Target (global): ", target_global)
	print("  Icons local position: ", position)
	print("  Icons global position: ", global_position)

# Finds the Background or Base-Background node in the scene
func find_background_node() -> Node2D:
	# First try to find "Base-Background" as a child of parent or sibling
	var parent = get_parent()
	if parent:
		# Check if parent has a child named "Base-Background"
		var base_bg = parent.get_node_or_null("Base-Background")
		if base_bg:
			return base_bg as Node2D

		# Check if parent has a child named "Background"
		var bg = parent.get_node_or_null("Background")
		if bg:
			# Check if Background has a child named "Base-Background"
			var base_bg_child = bg.get_node_or_null("Base-Background")
			if base_bg_child:
				return base_bg_child as Node2D
			# Otherwise return Background itself
			return bg as Node2D

		# Try searching recursively in the scene tree
		return find_node_recursive(parent, "Base-Background") as Node2D

	return null

# Recursively searches for a node by name
func find_node_recursive(root: Node, node_name: String) -> Node:
	if root.name == node_name:
		return root

	for child in root.get_children():
		var result = find_node_recursive(child, node_name)
		if result:
			return result

	return null

# Gets the bounding rectangle of a Node2D by examining its children (especially Sprite2D nodes)
func get_node_bounds(node: Node2D) -> Rect2:
	if node == null:
		return Rect2()

	# Calculate bounds from children (especially Sprite2D nodes) in the node's local space
	var min_x = INF
	var min_y = INF
	var max_x = -INF
	var max_y = -INF
	var has_bounds = false

	# Check all children for Sprite2D nodes and calculate their bounds
	for child in node.get_children():
		if child is Sprite2D:
			var sprite = child as Sprite2D
			var texture = sprite.texture
			if texture:
				# Get sprite's local position and size (relative to parent node)
				var sprite_pos = sprite.position
				var sprite_size = texture.get_size() * sprite.scale
				# Calculate sprite bounds in local space
				# Account for sprite offset if needed
				var sprite_left = sprite_pos.x - (sprite_size.x * sprite.offset.x)
				var sprite_top = sprite_pos.y - (sprite_size.y * sprite.offset.y)
				var sprite_right = sprite_left + sprite_size.x
				var sprite_bottom = sprite_top + sprite_size.y

				# Update bounds
				min_x = min(min_x, sprite_left)
				min_y = min(min_y, sprite_top)
				max_x = max(max_x, sprite_right)
				max_y = max(max_y, sprite_bottom)
				has_bounds = true

	if not has_bounds:
		# Fallback: use node's position as center, estimate size
		return Rect2(-100, -100, 200, 200)

	# Return bounds in the node's local coordinate space
	return Rect2(min_x, min_y, max_x - min_x, max_y - min_y)

# Optional: Reposition on viewport resize (useful for window resizing)
func _notification(what):
	if auto_position and (what == NOTIFICATION_APPLICATION_RESUMED or what == NOTIFICATION_WM_SIZE_CHANGED):
		# Wait a frame for viewport to update
		call_deferred("position_to_bottom_left")
