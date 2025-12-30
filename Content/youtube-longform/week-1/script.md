# Week 1: First Contact
> Target length: ~10 minutes | Style: Come along on my journey

---

## INTRO (0:00 - 1:00)

### Hook (0:00 - 0:15)
"I'm learning game dev from scratch. This is week one."

### Setup (0:15 - 1:00)
- This is a weekly series where I touch every tool in my stack
- Theme: "First Contact - Touch every tool, fear nothing"
- Goal: Ship something ugly. Prove the tools don't bite.
- What you'll see today:
  - 5 tools touched
  - A prototype game
  - And some thoughts on AI in creativity

---

## ACT 1: THE TOOLS (1:00 - 5:00)

### Procreate - Monday (1:00 - 1:45)
*Show: iPad with Procreate open*

- Set up a 2048x2048 canvas
- Tested brushes - found the 6B Pencil and Studio Pen
- Drew shapes: circles, squares, basic forms
- Personal win: "Drew a yeti. Actually looked like a yeti."

**B-roll:** The yeti sketch if available, or the basic shapes

### Blender - Tuesday & Thursday (1:45 - 3:00)

**Tuesday: Don't Panic (1:45 - 2:20)**
*Show: Blender viewport*

- Three controls that change everything:
  - Middle mouse = orbit
  - Shift + middle mouse = pan
  - Scroll = zoom
- G, S, R - Move, Scale, Rotate
- That's it. That's day one. Delete cube, add cube, move it around.

**Thursday: Edit Mode (2:20 - 3:00)**
- Edit mode lets you shape the mesh itself
- Loop cuts, extrude, vertex pushing
- Built an L-shaped tower from a cube
- "Saw a video on line art with Blender - kinda sick"

**B-roll:** The L-shape being extruded, final tower model

### Godot - Wednesday & Saturday (3:00 - 4:15)

**Wednesday: Project Structure (3:00 - 3:35)**
*Show: Godot editor*

- Created project with folder structure: scenes, scripts, assets, audio
- Built first scene: floor plane, cube tower, sphere projectile
- Basic script: tower fires projectile
- Note to self: "This works. I did it!"

**Saturday: Blender to Godot Pipeline (3:35 - 4:15)**
- Export from Blender as .glb (binary glTF)
- Drag into Godot - it just imports
- Replaced the cube with the L-shaped tower
- Added audio, hit play, everything works

**B-roll:** GLB import, tower in scene

### OP-Z - Friday (4:15 - 5:00)
*Show: OP-Z device or audio waveform*

- Studied Kingdom Rush soundtrack first
- Created an 8-bar menu loop
- Vibe: calm, welcoming, title screen energy
- 70-90 BPM, simple chords, lots of space
- "Menu music shouldn't demand attention"

**B-roll:** OP-Z in action, audio playing over game footage

---

## ACT 2: THE STUDY GAME & POC (5:00 - 8:00)

### Kingdom Rush Study (5:00 - 5:45)
*Show: Kingdom Rush gameplay or screenshots*

- Played 2+ hours across the week
- What I noticed:
  - Clear visual hierarchy - towers pop, paths are obvious
  - Satisfying feedback loops - upgrades feel good
  - Simple core loop that expands naturally
- Studied the tower design specifically for my own project

### The POC That Became a Game (5:45 - 7:00)
*Show: Unstable Table gameplay*

The 15-second proof of concept evolved into something bigger: "Unstable Table"

- Grid-based tactical PvP game
- Viking theme inspired by Kingdom Rush units
- Core mechanic: the Event Die
  - Every death shakes the table
  - Dice rolls create chain reactions
  - Ragnarok Rumble, Odin's Favor, Loki's Trick...

**The GBA Shader (6:30 - 7:00)**
*Show: Shader effect toggle*

- Added a retro GBA-style shader
- Makes everything feel like a Game Boy Advance title
- Visual style emerged from constraints, not plans

### What I Shipped (7:00 - 8:00)
*Show: Final game footage*

- 3x3 battlefield
- 3 unit types: Viking, Shaman, Archer
- Event die with 6 chaos events
- Simple bot AI
- Win/lose conditions

It's not pretty. But it's shipped.

---

## ACT 3: AI IN CREATIVITY (8:00 - 9:30)

### The Elephant in the Room (8:00 - 8:30)
- The art community is frustrated with AI
- I get it. The concerns are valid.
- But I've got a different take.

### My Perspective (8:30 - 9:15)
- AI makes some forms of creativity available to people who don't have the time
- Not everyone can devote cycles to creative pursuits
- Some people are providing for families, working demanding jobs
- AI can be a bridge, not a replacement

How I'm using it:
- Curriculum planning
- Quick reference materials
- Prototyping ideas faster
- Never replacing the learning - augmenting it

### Keeping It Honest (9:15 - 9:30)
- I'm still doing the work
- Still touching the tools
- Still shipping ugly things
- AI just helps me get started faster

---

## OUTRO (9:30 - 10:00)

### Recap
- Touched 5 tools: Procreate, Blender, Godot, OP-Z, AI assistants
- Shipped a prototype game
- Week 1 complete. Fear removed.

### What's Next
- Week 2 preview (tease topic if known)
- "Join me next week for the next step in the journey"

### CTA
- Subscribe if you want to learn alongside me
- Comments: What tools are you afraid to touch?

---

## PRODUCTION NOTES

### Footage Needed
- [ ] Screen recordings from each tool session (if available)
- [ ] Unstable Table gameplay (already recorded: diablo-study-output.avi)
- [ ] OP-Z footage or audio visualization
- [ ] Talking head clips (optional - can do voiceover only)

### Audio
- [ ] Use week1_menu.wav as background music (OP-Z loop)
- [ ] Voiceover recorded in one take if possible

### Editing Approach
- Minimal cuts
- Let B-roll breathe
- Text overlays for tool names only
- No fancy transitions

### Key Files
- `Games/week-1-study/` - Godot project for footage
- `Games/week-1-study/diablo-study-output.avi` - Game recording
- `Learning/curriculum/week-1/*.md` - Reference for details
