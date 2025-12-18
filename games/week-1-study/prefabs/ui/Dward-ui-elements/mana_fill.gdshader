shader_type canvas_item;

uniform float fill_amount : hint_range(0.0, 1.0) = 1.0;
uniform vec4 empty_color : source_color = vec4(0.1, 0.1, 0.2, 0.3);

void fragment() {
	vec4 tex_color = texture(TEXTURE, UV);

	// Drain from top to bottom (UV.y = 0 is top, 1 is bottom)
	// When fill_amount = 1.0, show full orb
	// When fill_amount = 0.0, show empty
	float threshold = 1.0 - fill_amount;

	if (UV.y < threshold) {
		// Above the fill line - show empty/dark version
		COLOR = empty_color * tex_color.a;
	} else {
		// Below the fill line - show the mana
		COLOR = tex_color;
	}
}
