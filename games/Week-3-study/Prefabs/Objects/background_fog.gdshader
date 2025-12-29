shader_type canvas_item;

uniform float fog_amount : hint_range(0.0, 1.0) = 0.15;
uniform vec4 fog_color : source_color = vec4(0.4, 0.3, 0.5, 1.0);
uniform float scroll_speed : hint_range(0.0, 0.5) = 0.02;
uniform float noise_scale : hint_range(1.0, 20.0) = 8.0;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	f = f * f * (3.0 - 2.0 * f);
	return mix(
		mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
		mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
		f.y
	);
}

void fragment() {
	vec4 tex = texture(TEXTURE, UV);

	// Animated noise for fog variation
	vec2 noise_uv = UV * noise_scale + vec2(TIME * scroll_speed, 0.0);
	float n = noise(noise_uv) * 0.5 + noise(noise_uv * 2.0) * 0.25;

	// More fog at bottom (ground haze)
	float height_fog = smoothstep(0.3, 1.0, UV.y) * 0.5;

	// Combine
	float final_fog = (n * fog_amount) + height_fog * fog_amount;

	COLOR = mix(tex, fog_color, final_fog);
}
