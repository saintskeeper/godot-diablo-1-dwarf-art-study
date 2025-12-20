# 2026 Creative

Creative workspace for game development, learning, and content creation.

## Directory Structure

```
2026-creative/
├── Assets/           # Game-ready assets
│   ├── filler/       # Placeholder assets
│   ├── game-jam-assets-dec-06/
│   ├── pallettes/    # Color palettes
│   └── sprites/      # Sprite sheets
│
├── Games/            # Godot projects
│   ├── week-1-study/ # Diablo scene study
│   └── Week-2-study/ # Current study project
│
├── Projects/         # Tool-specific source files
│   ├── Blender/      # Blender projects & exports
│   ├── PixelOver/    # PixelOver projects
│   └── completed-studies/
│
├── Learning/         # Education & skill development
│   ├── curriculum/   # Structured learning plans
│   │   ├── opz/      # OP-Z music curriculum
│   │   ├── week-1/   # Week 1 learning plan
│   │   └── week-2/   # Week 2 learning plan
│   ├── notes/        # Session notes & observations
│   │   ├── art/
│   │   ├── blender/
│   │   └── week-*/
│   └── reference/    # Books, PDFs, reference materials
│       └── op-z/     # OP-Z manual & resources
│
├── Publishing/       # Content & brand management
│   ├── brand/        # Brand identity
│   │   ├── Brand-Guidlines/  # Logo, colors, voice
│   │   ├── Ideas/
│   │   └── templates/
│   └── content/      # Platform-specific content
│       ├── Blog/     # walts-blog submodule
│       ├── itch/     # itch.io pages
│       ├── website/  # Personal site
│       └── x/        # Twitter/X content
│
├── Docs/             # Project documentation
│   ├── quarters/     # Quarterly planning
│   ├── templates/    # Doc templates
│   ├── constraints.md
│   ├── game-design-doc.md
│   ├── implementation-guide.md
│   ├── schedule.md
│   └── sprint.md
│
├── Utilities/        # Helper scripts & tools
│   └── pdf-chunker/  # PDF processing tool
│
├── ai-docs/          # AI research cache
│   └── active/research/
│
└── tests/            # Test files
```

## Quick Reference

| Folder | Purpose |
|--------|---------|
| `Assets/` | Import-ready game assets (sprites, palettes) |
| `Games/` | Godot 4.x projects (each self-contained) |
| `Projects/` | Source files from creative tools (Blender, PixelOver) |
| `Learning/` | Curriculum, notes, and reference materials |
| `Publishing/` | Brand guidelines and platform content |
| `Docs/` | Project planning and documentation |
| `Utilities/` | Scripts and helper tools |

## Workflow

1. **Learning** - Follow curriculum, take notes in `Learning/notes/`
2. **Creating** - Work in tool-specific folders under `Projects/`
3. **Exporting** - Move game-ready assets to `Assets/`
4. **Building** - Develop games in `Games/` using assets
5. **Publishing** - Create content in `Publishing/content/` following brand guidelines

## Games

Each game project in `Games/` is a self-contained Godot project with its own:
- `assets/` - Project-specific assets
- `scenes/` - Godot scenes
- `scripts/` - GDScript files
- `prefabs/` - Reusable scene components
