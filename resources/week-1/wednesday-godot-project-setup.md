# Godot Project Setup

> Week 1 | Wednesday | Godot

## Curriculum Task

**Evening (30 min):** Project Genesis
- Create new Godot 4 project: `2026_game`
- Set up folder structure: `/scenes`, `/scripts`, `/assets`, `/audio`
- Create a simple scene: floor plane, cube "tower," sphere "projectile"
- Write basic script: tower detects enemy in range, spawns projectile toward it
- Doesn't need to be pretty. Needs to work.

## Written Resources

### Project Organization (Godot Official Docs)
- **URL:** https://docs.godotengine.org/en/stable/tutorials/best_practices/project_organization.html
- **Why:** Official guidance on structuring Godot projects
- **Key takeaways:**
  - Godot has no restrictions on project structure — flexibility is yours
  - The root folder is `res://` (resources)
  - Organize by game feature, not just asset type
  - Get structure in place early — moving files later can break references

### Godot 4: Getting Started (Kodeco)
- **URL:** https://www.kodeco.com/37604834-godot-4-getting-started
- **Why:** Beginner-friendly walkthrough of creating your first project
- **Key takeaways:**
  - Download from godotengine.org — no installation needed (portable)
  - Click "New Project" → choose location → name it
  - FileSystem dock shows all project files
  - Everything starts as scenes and nodes

### How to Structure Your Godot Project (Python for Engineers)
- **URL:** https://pythonforengineers.com/blog/how-to-structure-your-godot-project-so-you-dont-get-confused/
- **Why:** Practical advice on folder organization
- **Key takeaways:**
  - Basic structure: `scenes/`, `assets/`, `src/` (scripts)
  - Sub-organize scenes: `levels/`, `characters/`, `menus/`
  - DO NOT move files outside of Godot — it breaks references
  - Keep `main.tscn` at top level of scenes folder

## Video Resources

### Learn Godot 4 in 90 Minutes (GameDev Academy)
- **URL:** https://www.youtube.com/watch?v=NlzTmL_eB-U
- **Duration:** ~90 min (watch first 20-30 min for setup)
- **Why:** Comprehensive beginner course covering project creation and basics
- **Timestamps:**
  - 0:00 - Introduction to Godot
  - 5:00 - Creating a new project
  - 10:00 - Editor interface tour
  - 15:00 - Nodes and scenes basics
  - 25:00 - Adding your first scripts

### Godot 4 Crash Course for Beginners (GDQuest - search on YouTube)
- **URL:** Search "GDQuest Godot 4 beginner"
- **Duration:** ~30-60 min
- **Why:** GDQuest is a trusted Godot educator with quality tutorials
- **Timestamps:**
  - Introduction and project setup
  - Understanding the scene tree
  - First script with GDScript
  - Running your game

## Quick Reference

### Creating a New Project
1. Launch Godot
2. Click **New Project** (top right)
3. Set project name: `2026_game`
4. Choose/create a folder location
5. Select **Godot 4** renderer (Forward+ for 3D)
6. Click **Create & Edit**

### Recommended Folder Structure
```
2026_game/
├── scenes/
│   ├── main.tscn
│   ├── levels/
│   ├── characters/
│   └── ui/
├── scripts/
│   ├── tower.gd
│   └── projectile.gd
├── assets/
│   ├── sprites/
│   ├── models/
│   └── textures/
└── audio/
    ├── music/
    └── sfx/
```

### Creating the Simple Scene
1. Create new scene: **Scene → New Scene**
2. Add **Node3D** as root (right-click → Add Child Node)
3. Add children:
   - **CSGBox3D** → Scale to make floor (flat and wide)
   - **CSGBox3D** → This is your "tower"
   - **CSGSphere3D** → This is your "projectile"
4. Save as `scenes/main.tscn`

### Basic Tower Script (tower.gd)
```gdscript
extends Node3D

@export var projectile_scene: PackedScene
@export var fire_rate: float = 1.0
var time_since_fire: float = 0.0

func _process(delta):
    time_since_fire += delta
    if time_since_fire >= fire_rate:
        fire_projectile()
        time_since_fire = 0.0

func fire_projectile():
    if projectile_scene:
        var projectile = projectile_scene.instantiate()
        get_parent().add_child(projectile)
        projectile.global_position = global_position
```

### Essential Shortcuts
| Action | Shortcut |
|--------|----------|
| Run Project | F5 |
| Run Current Scene | F6 |
| Save Scene | Ctrl + S |
| New Script | Right-click node → Attach Script |
| Search Nodes | Ctrl + Shift + A |

### Week 1 Goal
- [ ] Project created with correct folder structure
- [ ] Floor plane exists
- [ ] Tower cube exists
- [ ] Projectile sphere exists
- [ ] Tower spawns projectile (any direction counts!)
- [ ] Scene saved and runs without errors


this works i did it!
i've got a godot playground setup for 2d looks great.

need to get the ai boxes up for music, sound and other htings.