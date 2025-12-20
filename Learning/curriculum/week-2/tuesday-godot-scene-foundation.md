# Scene Foundation in Godot

> Week 2 | Tuesday | Godot 🎮

## Curriculum Task

**Evening (30 min):** Scene Foundation
- Create new Godot project or scene
- Block out your composition (inspired by, not copying)
- Establish the bones — where does everything sit?
- Apply the principles you identified, not the specific assets

---

## Written Resources

### Godot Docs - 2D Overview
- **URL:** https://docs.godotengine.org/en/stable/tutorials/2d/index.html
- **Why:** Official reference for 2D scene setup
- **Key takeaways:**
  - Node2D is the base for all 2D nodes
  - Use CanvasLayer for UI/overlays
  - Viewport size matters — set it early

### Godot Docs - Canvas Layers
- **URL:** https://docs.godotengine.org/en/stable/tutorials/2d/canvas_layers.html
- **Why:** Understanding layering for depth
- **Key takeaways:**
  - Default layer is 0
  - Higher numbers render on top
  - Use for parallax, UI separation, foreground/background

---

## Quick Reference

### Project Setup Checklist

```
1. Create new project or scene
2. Set viewport size (Project → Project Settings → Display → Window)
   - Common sizes: 1920x1080, 1280x720, 320x180 (pixel art)
3. Set stretch mode if needed (2D or viewport)
4. Create folder structure:
   /scenes
   /assets
   /scripts
   /audio
```

### Scene Structure for Art Study

```
SceneStudy (Node2D)
├── Background (CanvasLayer, layer -1)
│   ├── Sky (ColorRect or Sprite2D)
│   └── DistantElements (Sprite2D)
├── Midground (Node2D)
│   ├── MainElements (Sprite2D nodes)
│   └── Props (Sprite2D nodes)
├── Foreground (CanvasLayer, layer 1)
│   └── OverlayElements (Sprite2D)
├── Lighting (CanvasModulate + Light2D nodes)
└── Audio (AudioStreamPlayer nodes)
```

### Blocking Out with Primitives

You don't need final art yet. Use placeholders:

```gdscript
# Quick ColorRect for blocking shapes
var block = ColorRect.new()
block.color = Color(0.3, 0.3, 0.3, 1.0)  # Dark gray
block.size = Vector2(200, 150)
block.position = Vector2(100, 200)
add_child(block)
```

Or use the editor:
1. Add → ColorRect
2. Set size in Inspector
3. Set color to match your value sketch
4. Position to match your composition

### Useful Nodes for Scene Building

| Node | Use Case |
|------|----------|
| `ColorRect` | Solid color blocks, backgrounds |
| `Sprite2D` | Images, textures |
| `TextureRect` | UI-style image display |
| `Polygon2D` | Custom shapes |
| `Line2D` | Outlines, paths |
| `Node2D` | Grouping/organization |
| `CanvasLayer` | Layer separation |

### Composition Tips in Godot

**Rule of Thirds:**
```
Viewport divided into 9 equal parts
Place key elements at intersection points
In 1920x1080:
- Intersections at: (640, 360), (1280, 360), (640, 720), (1280, 720)
```

**Creating Depth:**
```
1. Background layer (CanvasLayer -1)
   - Desaturated colors
   - Less detail
   - Smaller scale

2. Midground (default layer 0)
   - Main action
   - Full saturation
   - Most detail

3. Foreground (CanvasLayer 1)
   - Silhouettes or blur
   - Frame the scene
   - Can be darker
```

**Using Modulate for Quick Color:**
```
Every CanvasItem has a Modulate property
- Use it to tint placeholder blocks
- Match your reference palette
- Adjust later when real art comes in
```

### Placeholder Art Workflow

1. **Block with ColorRects first**
   - Match the VALUE of your reference
   - Get composition right before anything else

2. **Replace with rough sprites**
   - Hand-draw quick placeholders in Procreate
   - Or use free assets temporarily

3. **Iterate on lighting/mood**
   - CanvasModulate to darken
   - Light2D for local lights

4. **Polish with final art**
   - Only after composition is locked

---

## Scene Setup Walkthrough

### Step 1: New Scene
```
Scene → New Scene → Other Node → Node2D
Save as: scene_study.tscn
```

### Step 2: Set Background
```
Add Child → ColorRect
Rename to "Background"
Size: match viewport (1920x1080 or your size)
Color: your reference's dominant background color
```

### Step 3: Block Major Shapes
```
For each major element in your reference:
1. Add Child → ColorRect
2. Size to approximate proportions
3. Color to match VALUE (light/dark)
4. Position according to your composition
```

### Step 4: Organize Layers
```
Add CanvasLayer, set layer to -1, name "BackgroundLayer"
Move distant elements under it

Add CanvasLayer, set layer to 1, name "ForegroundLayer"
Move foreground elements under it
```

### Step 5: Save and Review
```
Run scene (F5 or play button)
Does the composition match your vision?
Squint — do the values work?
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save scene |
| `F5` | Run project |
| `F6` | Run current scene |
| `Q` | Select mode |
| `W` | Move mode |
| `E` | Rotate mode |
| `S` | Scale mode |
| `Ctrl+D` | Duplicate node |
| `Delete` | Delete node |
| `Ctrl+Shift+A` | Add child node |

---

## Pro Tips

1. **Match values before colors** — squint at your reference and your scene
2. **Work big to small** — largest shapes first, details last
3. **Check at game resolution** — run the scene frequently
4. **Group related nodes** — use empty Node2D as containers
5. **Name everything** — you'll thank yourself later

### Common Mistakes
- Adding too much detail too early
- Ignoring the composition from your analysis
- Not running the scene to check how it feels
- Skipping the layering — everything on one layer looks flat

---

## This Week's Success Criteria

- [ ] New scene created and saved
- [ ] Viewport size set appropriately
- [ ] Background blocked in
- [ ] Major shapes placed according to composition
- [ ] Canvas layers set up (background/foreground separation)
- [ ] Scene runs without errors
- [ ] Composition matches your Monday sketches
