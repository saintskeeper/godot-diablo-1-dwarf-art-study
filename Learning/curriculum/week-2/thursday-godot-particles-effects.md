# Particles & Effects in Godot 2D

> Week 2 | Thursday | Godot 🎮

## Curriculum Task

**Evening (30 min):** Details & Character
- Add particles, effects, ambient motion
- This is where your style emerges
- What would YOU add that the original didn't have?
- Push it in a direction that excites you

---

## Written Resources

### Godot Docs - 2D Particle Systems
- **URL:** https://docs.godotengine.org/en/stable/tutorials/2d/particle_systems_2d.html
- **Why:** Official documentation on GPUParticles2D
- **Key takeaways:**
  - GPUParticles2D uses GPU for performance (thousands of particles)
  - CPUParticles2D is simpler but less performant
  - Particle systems simulate fire, smoke, sparks, dust, magic

### GPUParticles2D Class Reference
- **URL:** https://docs.godotengine.org/en/stable/classes/class_gpuparticles2d.html
- **Why:** All the properties explained
- **Key takeaways:**
  - `emitting` — turns particles on/off
  - `amount` — how many particles
  - `lifetime` — how long each particle lives
  - `process_material` — where all the magic happens

### Creating Effects with GPUParticles2D (Uhiyama Lab)
- **URL:** https://uhiyama-lab.com/en/notes/godot/gpu-particles2d-effects/
- **Why:** Practical examples of explosion, smoke, magic
- **Key takeaways:**
  - Smoke: negative Y gravity, damping, scale curve
  - Fire: upward velocity, color ramp orange→red→transparent
  - Magic: low gravity, scale over lifetime, glow

---

## Video Resources

### GDQuest - Particle Effects Course
- **URL:** https://school.gdquest.com (search for particles)
- **Why:** High quality, focused tutorials
- **What to look for:**
  - Dust when moving
  - Fire and healing effects
  - Background particles

### Godot Tutorials - Fire Effect (Ep 62)
- **URL:** https://godottutorials.com/courses/godot-basics-series/godot-basics-tutorial-62/
- **Duration:** ~10 min
- **Why:** Step-by-step fire creation
- **Key concepts:**
  - Zero gravity (fire goes up via velocity)
  - Color gradient from bright to dark

---

## Quick Reference

### GPUParticles2D vs CPUParticles2D

| Feature | GPUParticles2D | CPUParticles2D |
|---------|----------------|----------------|
| Performance | Excellent (thousands) | Good (hundreds) |
| Customization | More options | Simpler |
| Compatibility | Requires GPU | Works everywhere |
| Best for | Ambient, lots of particles | Simple effects |

**Use GPUParticles2D** for most scene effects.

---

## Setup Walkthrough

### Step 1: Add GPUParticles2D

```
1. Add Child → GPUParticles2D
2. Scene shows warning about Process Material — we'll fix that
3. In Inspector:
   - Emitting: ON (checkbox)
   - Amount: 50 (start small)
   - Lifetime: 2.0 (seconds)
```

### Step 2: Add Process Material

```
1. In Inspector → Process Material → click "empty"
2. Select "New ParticleProcessMaterial"
3. Click the material to expand options
```

### Step 3: Basic Properties

**For ambient dust/particles:**
```
Direction: (0, -1, 0)  — particles float up
Spread: 180            — all directions
Initial Velocity: 20-40
Gravity: (0, -10, 0)   — gentle upward drift
Scale: 0.5-1.0
```

**For falling particles (snow, ash):**
```
Direction: (0, 1, 0)   — particles fall down
Spread: 30             — mostly downward
Initial Velocity: 30-50
Gravity: (0, 50, 0)    — gentle fall
Scale: 0.3-0.8
```

### Step 4: Color Over Lifetime

```
1. In ParticleProcessMaterial → Color
2. Click "Gradient"
3. Create gradient:
   - Start: your color (full opacity)
   - End: same color (zero opacity)
   - Particles fade out as they die
```

### Step 5: Set Texture (Optional but better)

```
1. In GPUParticles2D → Texture
2. Assign a small texture:
   - Simple: white circle with soft edges
   - Fire: orange gradient blob
   - Dust: small dots
3. Texture gets tinted by color gradient
```

---

## Common Effect Recipes

### Floating Dust Motes

```
GPUParticles2D settings:
- Amount: 30-50
- Lifetime: 4.0
- Visibility Rect: match your scene

ParticleProcessMaterial:
- Direction: (0, -1, 0)
- Spread: 180
- Initial Velocity: 10-20
- Gravity: (0, -5, 0)
- Scale: 0.1-0.3

Color: #ffffff33 (white, very transparent)
```

### Torch Fire

```
GPUParticles2D settings:
- Amount: 80
- Lifetime: 0.8
- Position: at torch head

ParticleProcessMaterial:
- Direction: (0, -1, 0)
- Spread: 15
- Initial Velocity: 50-80
- Gravity: (0, 0, 0)
- Scale: 0.3 → 0.0 (shrink)

Color gradient:
- #ffcc44 (yellow) at 0%
- #ff6600 (orange) at 50%
- #330000 (dark red, transparent) at 100%
```

### Smoke/Mist

```
GPUParticles2D settings:
- Amount: 20
- Lifetime: 3.0

ParticleProcessMaterial:
- Direction: (0, -1, 0)
- Spread: 45
- Initial Velocity: 10-30
- Gravity: (0, -20, 0)
- Damping: 30 (slows down)
- Scale: 0.5 → 1.5 (grows)

Color gradient:
- #666666aa at 0%
- #33333300 at 100% (fades out)
```

### Sparkles/Magic

```
GPUParticles2D settings:
- Amount: 40
- Lifetime: 1.5
- Explosiveness: 0.0 (continuous)

ParticleProcessMaterial:
- Direction: (0, -1, 0)
- Spread: 180
- Initial Velocity: 30
- Gravity: (0, 10, 0)
- Scale: 0.1-0.4 (random)

Color: #aaccff (light blue)
Use a star/sparkle texture
```

---

## Animation & Motion

### Gentle Sway (for sprites)

```gdscript
# Attach to any Sprite2D for ambient motion
extends Sprite2D

@export var sway_amount: float = 5.0
@export var sway_speed: float = 2.0

var start_rotation: float

func _ready():
    start_rotation = rotation

func _process(delta):
    rotation = start_rotation + sin(Time.get_ticks_msec() * sway_speed * 0.001) * deg_to_rad(sway_amount)
```

### Floating Bob

```gdscript
# Gentle up/down floating
extends Node2D

@export var bob_amount: float = 5.0
@export var bob_speed: float = 1.5

var start_y: float

func _ready():
    start_y = position.y

func _process(delta):
    position.y = start_y + sin(Time.get_ticks_msec() * bob_speed * 0.001) * bob_amount
```

### Flicker (for lights or sprites)

```gdscript
extends Sprite2D  # or PointLight2D

@export var base_alpha: float = 1.0
@export var flicker_range: float = 0.3

func _process(delta):
    modulate.a = base_alpha - randf() * flicker_range
```

---

## Pro Tips

1. **Less is more** — a few particles add atmosphere, too many overwhelm
2. **Match lighting** — particle colors should fit your scene's palette
3. **Layer particles** — foreground and background particles add depth
4. **Animate EVERYTHING slightly** — static scenes feel dead
5. **Your style emerges here** — push beyond the reference

### Effect Ideas by Mood

| Mood | Effects to Add |
|------|----------------|
| Cozy | Floating dust motes, gentle candle flicker |
| Eerie | Slow fog, drifting particles, subtle pulse |
| Action | Sparks, fast particles, screen shake ready |
| Mystical | Glowing particles, color-shifting lights |
| Grim | Ash falling, embers, smoke rising |

---

## Scene Organization

```
SceneStudy (Node2D)
├── Background
├── Midground
├── Foreground
├── Lighting
├── Particles
│   ├── AmbientDust (GPUParticles2D)
│   ├── TorchFire1 (GPUParticles2D)
│   ├── TorchSmoke1 (GPUParticles2D)
│   └── DistantMist (GPUParticles2D, behind midground)
└── Audio
```

---

## This Week's Success Criteria

- [ ] At least one ambient particle effect (dust, mist, etc.)
- [ ] At least one point-source effect (fire, sparkles, etc.)
- [ ] Colors match your lighting/mood
- [ ] Some animated elements (sway, bob, flicker)
- [ ] Scene feels ALIVE, not static
- [ ] You added something the reference DIDN'T have
