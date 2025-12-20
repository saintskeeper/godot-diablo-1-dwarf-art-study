# Lighting & Mood in Godot 2D

> Week 2 | Wednesday | Godot 🎮

## Curriculum Task

**Evening (30 min):** Lighting & Mood
- Add CanvasModulate or Light2D nodes
- Capture the *feeling* of your reference with your own palette
- Experiment with PointLight2D for atmosphere
- Goal: Someone should feel the same vibe, even if it looks different

---

## Written Resources

### Godot Docs - 2D Lights and Shadows
- **URL:** https://docs.godotengine.org/en/stable/tutorials/2d/2d_lights_and_shadows.html
- **Why:** Official documentation on 2D lighting system
- **Key takeaways:**
  - By default, 2D scenes are unshaded (fully lit)
  - CanvasModulate darkens the entire scene
  - Light2D nodes add light back to specific areas

### Godot 2D Lighting Intro (Uhiyama Lab)
- **URL:** https://uhiyama-lab.com/en/notes/godot/godot-2d-lighting-pointlight2d-shadows/
- **Why:** Recent tutorial covering PointLight2D and shadows
- **Key takeaways:**
  - Combine Light2D's Item Cull Mask with CanvasItem's Light Mask for control
  - If scene goes pitch black, check CanvasModulate color
  - Light textures define the shape of the light

### Light and Shadow Tutorial (Catlike Coding)
- **URL:** https://catlikecoding.com/godot/true-top-down-2d/4-light-and-shadow/
- **Why:** Practical walkthrough with code examples
- **Key takeaways:**
  - CanvasModulate simulates ambient darkness
  - Lighting can be gameplay element (constraining vision)
  - Shadow casting requires occluders

---

## Video Resources

### CashewOldDew - Godot 2D Lighting Deep Dive
- **Search:** "CashewOldDew Godot lighting" on YouTube
- **Why:** Highly recommended breakdown of the lighting system
- **What to look for:**
  - How masks work
  - Setting up shadow casting
  - Performance considerations

### DevWorm - Godot 4 Lighting Tutorial
- **Search:** "DevWorm Godot 4 2D lighting" on YouTube
- **Duration:** ~10-15 min
- **Why:** Quick, practical setup guide

---

## Quick Reference

### The 2D Lighting Stack

```
Your Scene (bright by default)
        ↓
CanvasModulate (darkens everything)
        ↓
Light2D nodes (add light back where you want it)
        ↓
Final rendered scene (dark areas + lit areas)
```

### Essential Nodes

| Node | Purpose |
|------|---------|
| `CanvasModulate` | Tints/darkens entire canvas layer |
| `PointLight2D` | Radiates light from a point (torch, lamp) |
| `DirectionalLight2D` | Parallel rays (sun, moon) |
| `LightOccluder2D` | Blocks light, casts shadows |

---

## Setup Walkthrough

### Step 1: Add CanvasModulate (Base Darkness)

```
1. Add Child → CanvasModulate
2. In Inspector → Color, set to your ambient darkness
   - For dark scenes: #1a1a2e (dark blue-black)
   - For moody: #2d2d44 (purple-gray)
   - For warm dusk: #3d2828 (dark warm)
3. Scene should now be dark
```

**Tip:** Don't go pure black (#000000) — always have some color in your darkness.

### Step 2: Add PointLight2D (Local Light Sources)

```
1. Add Child → PointLight2D
2. Set Texture:
   - Use a gradient texture (white center, fade to transparent)
   - Or: Create quick one in Procreate/Photoshop
3. Adjust properties:
   - Color: match your light source (warm for fire, cool for magic)
   - Energy: brightness (start at 1.0, adjust)
   - Scale: how far light reaches
```

### Step 3: Adjust Light Texture

The texture defines the light's shape. Common options:

**Soft Round Light (torch, lamp):**
- White center fading to transparent
- Radial gradient

**Harsh Spotlight:**
- Sharp-edged circle
- High contrast

**Custom Shape:**
- Make in Procreate
- Export as PNG with transparency

### Step 4: Color Temperature

Match your reference's mood:

| Mood | Light Color | Ambient (CanvasModulate) |
|------|-------------|--------------------------|
| Cozy/warm | #ffcc88 (warm yellow) | #2a1a1a (dark red-brown) |
| Eerie/cold | #88ccff (cool blue) | #1a1a2a (dark blue) |
| Neutral | #ffffff (white) | #1a1a1a (neutral dark) |
| Sickly | #ccff88 (green-yellow) | #1a2a1a (dark green) |
| Hellish | #ff4444 (red) | #1a0a0a (very dark red) |

---

## Advanced Techniques

### Flickering Lights

```gdscript
# Attach to PointLight2D
extends PointLight2D

@export var base_energy: float = 1.0
@export var flicker_amount: float = 0.2
@export var flicker_speed: float = 10.0

func _process(delta):
    var noise = sin(Time.get_ticks_msec() * flicker_speed * 0.001)
    energy = base_energy + (noise * flicker_amount)
```

### Animated Light Color

```gdscript
# Slow color shift
extends PointLight2D

@export var color_a: Color = Color(1.0, 0.8, 0.5)  # warm
@export var color_b: Color = Color(1.0, 0.6, 0.3)  # warmer
@export var shift_speed: float = 2.0

func _process(delta):
    var t = (sin(Time.get_ticks_msec() * shift_speed * 0.001) + 1.0) / 2.0
    color = color_a.lerp(color_b, t)
```

### Multiple Light Sources

```
Scene
├── CanvasModulate (ambient darkness)
├── MainEnvironment
│   └── [your scene content]
├── Lights
│   ├── TorchLight1 (PointLight2D)
│   ├── TorchLight2 (PointLight2D)
│   └── WindowLight (PointLight2D, different color)
```

---

## Debugging Lighting Issues

### Problem: Scene is completely black
**Fix:** CanvasModulate color is too dark
- Lighten the color
- Or add a Light2D with high energy

### Problem: Lights don't seem to do anything
**Fix:** Check if you have CanvasModulate
- Without it, scene is already fully lit
- Lights only "add" to what's there

### Problem: Only some objects are lit
**Fix:** Check Light Masks
- PointLight2D → Item Cull Mask (which layers it affects)
- Sprite2D → Light Mask (which lights affect it)
- Both masks must have overlapping bits

### Problem: Light looks like a square
**Fix:** Check your light texture
- Must be a proper gradient PNG
- White center, fade to transparent edges
- Or use Godot's default gradient

---

## Creating Light Textures

### Quick Method (Godot)
```
1. Create new GradientTexture2D resource
2. Set to radial
3. White at center, transparent at edges
4. Assign to PointLight2D → Texture
```

### Procreate Method
```
1. New canvas (256x256 or 512x512)
2. Draw white circle in center
3. Apply Gaussian blur heavily
4. Export as PNG with transparency
5. Import to Godot
```

---

## Pro Tips

1. **Layer your lights** — multiple dim lights look better than one bright light
2. **Color your shadows** — CanvasModulate color matters as much as light color
3. **Less is more** — too many lights kills the mood
4. **Test constantly** — lighting looks different at runtime
5. **Match your reference's FEEL** — not the exact colors

### Mood Checklist
- [ ] Does the darkness feel right? (CanvasModulate)
- [ ] Are light sources where they should be?
- [ ] Do the colors evoke the same emotion as your reference?
- [ ] Is there enough contrast between lit and dark areas?
- [ ] Would someone FEEL the vibe without seeing the reference?

---

## This Week's Success Criteria

- [ ] CanvasModulate added with appropriate ambient color
- [ ] At least one PointLight2D added
- [ ] Light colors match your intended mood
- [ ] Scene has clear contrast between lit and dark areas
- [ ] Mood matches your reference's feel (not necessarily colors)
- [ ] Flickering or animation added if appropriate
