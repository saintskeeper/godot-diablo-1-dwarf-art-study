shader_type canvas_item;

uniform float snow_density : hint_range(0.0, 1.0) = 0.1;
uniform float fall_speed : hint_range(10.0, 200.0) = 100.0;
uniform float wind : hint_range(-50.0, 50.0) = 20.0;
uniform float wind_variance : hint_range(0.0, 30.0) = 10.0;
uniform float flake_size : hint_range(0.002, 0.015) = 0.010;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void fragment() {
	vec2 uv = UV;

	// Move snow downward with wind variance
	float sway = sin(TIME * 1.3 + uv.y * 3.0) * wind_variance * 0.0004;
	uv.y -= TIME * fall_speed * 0.001;
	uv.x -= TIME * wind * 0.001 + sway;

	// Grid for snowflakes
	vec2 grid = floor(uv / flake_size);
	vec2 local = fract(uv / flake_size);

	// Random offset and existence per cell
	float rand = hash(grid);
	float exists = step(1.0 - snow_density, rand);

	vec2 center = vec2(hash(grid * 1.1), hash(grid * 2.2));
	float dist = length(local - center);

	// Simple soft circle
	float flake = smoothstep(0.25, 0.1, dist) * exists;

	COLOR = vec4(1.0, 1.0, 1.0, flake * 0.9);
}
