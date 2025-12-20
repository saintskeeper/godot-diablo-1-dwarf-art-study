# Blender to Godot Import Pipeline


> Week 1 | Saturday | Integration

## Curriculum Task

**Evening (30–45 min):**
- Import your L-shape from Blender (export as `.glb`)
- Replace the cube tower with your shape
- Add your menu music to the scene (AudioStreamPlayer)
- Make sure tower still shoots
- Record 15-sec clip

## Written Resources

### Importing 3D Objects (Godot 4 Recipes)
- **URL:** https://kidscancode.org/godot_recipes/4.x/g101/3d/101_3d_02/
- **Why:** Concise guide specifically for beginners importing 3D assets
- **Key takeaways:**
  - GLB is the recommended format (binary glTF)
  - Drag and drop GLB into Godot's FileSystem
  - Double-click to see import options
  - Can change root node type before reimporting

### Importing 3D Scenes (Godot Official Docs)
- **URL:** https://docs.godotengine.org/en/4.1/tutorials/assets_pipeline/importing_scenes.html
- **Why:** Complete official documentation on the import pipeline
- **Key takeaways:**
  - Godot's importer is flexible and configurable
  - Entire Blender scene transfers as closely as possible
  - Materials, textures, and even animations can be included
  - Use "New Inherited Scene" to keep connection to source file

### Blender to Godot 4 Pipeline (Toxigon)
- **URL:** https://toxigon.com/blender-to-godot-4-pipeline
- **Why:** End-to-end workflow explanation
- **Key takeaways:**
  - Export settings matter — check "Selected Objects" if needed
  - Embed textures for simpler import
  - Scale issues are common — adjust in Blender before export
  - Godot's unit system matches Blender's default (1 unit = 1 meter)

## Video Resources

### Godot 4 / Blender - Third Person Character From Scratch
- **URL:** Search "Godot 4 Blender import tutorial" on YouTube
- **Duration:** ~20-40 min
- **Why:** Shows complete workflow from modeling to in-game
- **Timestamps (approximate):**
  - 0:00 - Blender export settings
  - 5:00 - glTF format options
  - 10:00 - Importing into Godot
  - 15:00 - Setting up the scene
  - 20:00 - Making it work in-game

### How to Import Assets in Godot (Kodeco)
- **URL:** https://www.kodeco.com/45959487-how-to-import-assets-in-godot
- **Duration:** Article with embedded videos
- **Why:** November 2024, very current and comprehensive
- **Timestamps:**
  - GLB import basics
  - Handling materials
  - Troubleshooting common issues

## Quick Reference

### Exporting from Blender

1. **Select your object** in Blender (the L-shape)
2. **File → Export → glTF 2.0 (.glb/.gltf)**
3. In export settings:
   - Format: **glTF Binary (.glb)** — single file, easy
   - Include: Check **Selected Objects** (only exports what you selected)
   - Transform: Leave defaults (Y Up is fine)
   - Geometry: Check **Apply Modifiers**
4. Save as `week1_shape.glb` in your Godot project's `assets/models/` folder

### Importing into Godot

1. **Open your Godot project**
2. The GLB file should appear automatically in FileSystem (Godot auto-imports)
3. If not, click **Reimport** or restart Godot
4. **Double-click the .glb** to see import settings
5. Click **Reimport** if you changed anything

### Using the Imported Model

**Method 1: Drag and Drop**
1. Drag the `.glb` from FileSystem directly into your scene
2. It creates a node with the model

**Method 2: Inherited Scene (Recommended)**
1. Right-click the `.glb` file
2. Select **New Inherited Scene**
3. This creates a scene linked to the Blender file
4. Save it as `tower.tscn`
5. Add this scene to your main scene

### Replacing the Cube Tower

1. In your main scene, find the cube tower node
2. Delete it (or hide it)
3. Drag your new `tower.tscn` (or the GLB) into the scene
4. Position it where the cube was
5. If you had a script on the cube, reattach it to the new node

### Adding Audio (Menu Music)

1. **Add AudioStreamPlayer node** to your scene
   - Right-click root → Add Child Node → AudioStreamPlayer
   - (Use AudioStreamPlayer2D for 2D games, AudioStreamPlayer3D for spatial audio)

2. **Import your audio file**
   - Copy `week1_menu.wav` to `audio/music/` in your project
   - Godot auto-imports it

3. **Assign the stream**
   - Select the AudioStreamPlayer node
   - In Inspector, find **Stream** property
   - Drag your .wav file to this property
   - OR click the dropdown and load it

4. **Configure playback**
   - Check **Autoplay** to start on scene load
   - OR call `$AudioStreamPlayer.play()` in script

5. **Loop the music**
   - Select the audio file in FileSystem
   - In Import tab, check **Loop**
   - Click **Reimport**

### Quick Audio Script
```gdscript
# In your main scene script
func _ready():
    $AudioStreamPlayer.play()

# To stop:
# $AudioStreamPlayer.stop()

# To change volume (in dB):
# $AudioStreamPlayer.volume_db = -10
```

### Recording a 15-Second Clip

**On Mac:**
1. **QuickTime Player** → File → New Screen Recording
2. Click record, select your game window
3. Play for 15 seconds
4. Click stop
5. Save as `week1_poc.mov`

**Alternative: OBS Studio (Free)**
1. Download from obsproject.com
2. Add "Window Capture" source
3. Select your Godot game window
4. Click "Start Recording"
5. Play for 15 seconds
6. Click "Stop Recording"

### Troubleshooting

**Model appears too big/small:**
- In Blender: Apply scale (Ctrl+A → Scale) before exporting
- In Godot: Adjust the Scale property in Inspector

**Model appears white/no materials:**
- Make sure you embedded textures in export
- Check that materials are properly assigned in Blender

**Model is rotated wrong:**
- Blender uses Z-up, Godot uses Y-up (usually handled automatically)
- If wrong, rotate 90° on X axis in Godot

**Audio doesn't play:**
- Check Autoplay is enabled
- Check volume isn't at 0
- Make sure the file imported correctly (click it, see preview)

### Week 1 Integration Checklist
- [ ] Exported L-shape from Blender as `.glb`
- [ ] Imported into Godot successfully
- [ ] Replaced cube with custom shape
- [ ] Shape appears correctly scaled and positioned
- [ ] Menu music imported and playing
- [ ] Music loops seamlessly
- [ ] Tower still fires projectiles
- [ ] Recorded 15-second POC video
