# Godot Blur Shaders for Mobile Optimization

**Source URLs:**
- https://blog.frost.kiwi/dual-kawase/
- https://www.intel.com/content/www/us/en/developer/articles/technical/an-investigation-of-fast-real-time-gpu-based-image-blur-algorithms.html
- https://godotshaders.com/shader/dual-kawase-down-fast-blur/
- https://godotshaders.com/shader/dual-kawase-up-fast-blur/
- https://blog.en.uwa4d.com/2022/09/01/screen-post-processing-effects-chapter-4-kawase-blur-and-its-implementation/

**Fetch Date:** 2025-12-22

**Context:** Optimizing blur effects for 2D Godot game with 4 subviewports creating depth-of-field effect. Currently using Gaussian blur with dithering. Target: mobile performance.

---

## Summary

**Recommendation: Use Dual-Kawase Blur** instead of Gaussian for mobile 2D applications.

## Performance Comparison

| Method | Texture Reads per Pixel | Scalability |
|--------|-------------------------|-------------|
| Gaussian 35×35 kernel | ~34 | Quadratic (bad) |
| Standard Kawase 5-pass | ~20 | Linear |
| Dual-Kawase | ~5-9 | Logarithmic (best) |

## Why Dual-Kawase is Superior

1. **Exploits GPU Hardware**: Uses bilinear interpolation sampling which GPUs do essentially for free
2. **Logarithmic Scaling**: Doubling blur radius adds only 2 passes (vs quadratic increase for Gaussian)
3. **Fewer Texture Reads**: Memory access is the bottleneck on modern GPUs, not arithmetic
4. **Downscale/Upscale Approach**: Works at progressively smaller resolutions

## Technical Background

The technique originates from Masaki Kawase's GDC2003 presentation "Frame Buffer Postprocessing Effects in DOUBLE-S.T.E.A.L (Wreckless)." Originally designed for bloom, it generalizes well to any blur application.

Key insight: Traditional Gaussian blur samples many neighboring pixels at full resolution. Dual-Kawase instead:
1. Downsamples the image (reducing resolution by half each pass)
2. Applies simple 5-tap blur at each level
3. Upsamples back with 9-tap blur
4. Result closely approximates Gaussian at fraction of the cost

## Godot 4 Implementation

### Dual Kawase Down (Downsample + Blur)

```glsl
shader_type canvas_item;

uniform float offset: hint_range(0.0, 10.0);
uniform sampler2D SCREEN_TEXTURE : hint_screen_texture, filter_linear_mipmap;

void fragment() {
    vec2 uv = UV;
    vec2 halfpixel = SCREEN_PIXEL_SIZE / 2.0;

    vec4 sum = texture(SCREEN_TEXTURE, uv) * 4.0;
    sum += texture(SCREEN_TEXTURE, uv - halfpixel.xy * offset);
    sum += texture(SCREEN_TEXTURE, uv + halfpixel.xy * offset);
    sum += texture(SCREEN_TEXTURE, uv + vec2(halfpixel.x, -halfpixel.y) * offset);
    sum += texture(SCREEN_TEXTURE, uv - vec2(halfpixel.x, -halfpixel.y) * offset);

    COLOR = sum / 8.0;
}
```

### Dual Kawase Up (Upsample + Blur)

```glsl
shader_type canvas_item;

uniform float offset: hint_range(0.0, 10.0);
uniform sampler2D SCREEN_TEXTURE : hint_screen_texture, filter_linear_mipmap;

void fragment() {
    vec2 uv = UV;
    vec2 halfpixel = SCREEN_PIXEL_SIZE / 2.0;

    vec4 sum = texture(SCREEN_TEXTURE, uv + vec2(-halfpixel.x * 2.0, 0.0) * offset);
    sum += texture(SCREEN_TEXTURE, uv + vec2(-halfpixel.x, halfpixel.y) * offset) * 2.0;
    sum += texture(SCREEN_TEXTURE, uv + vec2(0.0, halfpixel.y * 2.0) * offset);
    sum += texture(SCREEN_TEXTURE, uv + vec2(halfpixel.x, halfpixel.y) * offset) * 2.0;
    sum += texture(SCREEN_TEXTURE, uv + vec2(halfpixel.x * 2.0, 0.0) * offset);
    sum += texture(SCREEN_TEXTURE, uv + vec2(halfpixel.x, -halfpixel.y) * offset) * 2.0;
    sum += texture(SCREEN_TEXTURE, uv + vec2(0.0, -halfpixel.y * 2.0) * offset);
    sum += texture(SCREEN_TEXTURE, uv + vec2(-halfpixel.x, -halfpixel.y) * offset) * 2.0;

    COLOR = sum / 12.0;
}
```

### Usage Instructions

1. Create a ColorRect covering the entire screen (or desired blur area)
2. Attach shader to the ColorRect's material
3. Adjust the `offset` uniform parameter to control blur intensity (0.0-10.0)

## Alternative: Mipmap-Based Blur (Simplest/Fastest)

For cases where blur quality isn't critical:

```glsl
shader_type canvas_item;

uniform sampler2D SCREEN_TEXTURE : hint_screen_texture, filter_linear_mipmap;
uniform float lod : hint_range(0.0, 5.0);

void fragment() {
    COLOR = textureLod(SCREEN_TEXTURE, UV, lod);
}
```

**Pros:** Single texture read, uses GPU's built-in mipmaps
**Cons:** Less control over blur shape, may look blocky at high LOD values

## Architecture for Depth-Based Blur (4 Layers)

Instead of 4 full-resolution viewports with Gaussian:

### Option A: Resolution Pyramid
1. Render each depth layer to progressively smaller SubViewports:
   - Layer 0 (foreground): Full resolution, no blur
   - Layer 1: 1/2 resolution + Dual-Kawase
   - Layer 2: 1/4 resolution + Dual-Kawase
   - Layer 3 (background): 1/8 resolution + Dual-Kawase
2. Composite back up with alpha blending

### Option B: Shared Blur Chain
1. Render all layers at full resolution
2. Use single Dual-Kawase downsample chain
3. Sample from appropriate mip level per layer during composite

## Mobile-Specific Tips

1. **Avoid kernel sizes > 25 samples** on mobile/Switch
2. **Test on actual devices** - emulators don't reflect real GPU performance
3. **Consider LOD-based blur** for distant/unimportant elements
4. **Profile texture reads** - they're the bottleneck, not math operations
5. **Keep offset values reasonable** - high offsets break texture cache efficiency

## Dithering Note

Your current dithering to reduce banding can still be applied on top of Dual-Kawase output if needed. The blur method is independent of the banding solution.

## References

- [frost.kiwi - Video Game Blurs (Interactive)](https://blog.frost.kiwi/dual-kawase/) - Best visual explanation
- [Intel Developer - Fast GPU Blur Investigation](https://www.intel.com/content/www/us/en/developer/articles/technical/an-investigation-of-fast-real-time-gpu-based-image-blur-algorithms.html) - Benchmark data
- [ARM SIGGRAPH 2015 Notes](https://community.arm.com/cfs-file/__key/communityserver-blogs-components-weblogfiles/00-00-00-20-66/siggraph2015_2D00_mmg_2D00_marius_2D00_notes.pdf) - Mobile GPU optimization
- [UWA Blog - Kawase Implementation](https://blog.en.uwa4d.com/2022/09/01/screen-post-processing-effects-chapter-4-kawase-blur-and-its-implementation/) - Step-by-step breakdown
- [Godot Shaders - Blur Tag](https://godotshaders.com/shader-tag/blur/) - Community implementations
