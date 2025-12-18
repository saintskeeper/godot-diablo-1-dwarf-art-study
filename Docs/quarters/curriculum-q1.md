# 2026 Solo Game Dev Curriculum — Q1 (Weeks 1–12)

> **Phase:** Foundation  
> **Goal:** Learn the tools, build ugly POCs, develop taste  
> **Dates:** December 9, 2025 → March 1, 2026

---

## Q1 Overview

| Weeks | Blender Focus | Art Focus | Godot Focus | Music Focus |
|-------|---------------|-----------|-------------|-------------|
| 1–4 | Interface, basic modeling | Brushes, shapes, values | Project setup, core prototype | Game loops, menu vibes |
| 5–8 | Materials, lighting, renders | Color, style studies | Asset pipeline, UI systems | SFX, action tracks |
| 9–12 | Complete asset workflow | Concept art for game | Playable vertical slice | Full audio pass |

---

## Week 1: First Contact

> **Theme:** Touch every tool, fear nothing  
> **Study:** Kingdom Rush (2+ hrs across the week)  
> **POC:** A cube that shoots a sphere at another cube in Godot

### Monday — Art 🎨
**Morning (15 min):** Download Procreate references — screenshot 10 Kingdom Rush towers. Save to a "Reference" folder.

**Evening (20 min):** Procreate orientation
- Create new canvas (2048x2048)
- Try 5 different brushes (find a favorite)
- Draw 5 rough circles, 5 rough squares
- Fill them with different colors

### Tuesday — Blender 🧊
**Evening (30 min):** Blender Day 1
- Open Blender, don't panic
- Learn viewport navigation (middle mouse orbit, scroll zoom, shift+middle pan)
- Select the default cube, press `G` to move, `S` to scale, `R` to rotate
- Delete cube (`X`), add a new one (`Shift+A > Mesh > Cube`)
- Save file as `week1_cube.blend`

**Resource:** Blender Guru's "Blender Beginner Tutorial Part 1" (first 15 min only)

### Wednesday — Godot 🎮
**Evening (30 min):** Project Genesis
- Create new Godot 4 project: `2026_game`
- Set up folder structure: `/scenes`, `/scripts`, `/assets`, `/audio`
- Create a simple scene: floor plane, cube "tower," sphere "projectile"
- Write basic script: tower detects enemy in range, spawns projectile toward it
- Doesn't need to be pretty. Needs to work.

### Thursday — Blender 🧊
**Evening (30 min):** Edit Mode Basics
- Open `week1_cube.blend`
- Enter Edit Mode (`Tab`)
- Learn selection modes: vertex, edge, face
- Extrude a face (`E`) — make your cube into an L-shape
- Loop cut (`Ctrl+R`) — add geometry
- Save as `week1_shape.blend`

### Friday — Music 🎵
**Morning (15 min):** Listen to Kingdom Rush soundtrack. Note: tempo, instruments, mood.

**Evening (20 min):** OP-Z session
- Create a new 8-bar loop
- Vibe: "calm menu music" — something you'd hear on a title screen
- Export and save as `week1_menu.wav`

### Saturday — Integration 🎮
**Evening (30–45 min):**
- Import your L-shape from Blender (export as `.glb`)
- Replace the cube tower with your shape
- Add your menu music to the scene (AudioStreamPlayer)
- Make sure tower still shoots
- Record 15-sec clip

### Sunday — Review 📋
**Morning (20 min):**
- Export POC build or capture video
- Write Kingdom Rush study notes (use framework from concept.md)
- Note 3 things that confused you this week
- Set Week 2 intention

**Week 1 POC:** Ugly L-shaped tower shoots at cubes. Has music. Ships.

---

## Week 2: Scene Study & Reinterpretation

> **Theme:** Study the masters, then make it yours
> **Study:** Pick a classic game scene (Diablo 1, Chrono Trigger, FF6, etc.)
> **POC:** Your own scene inspired by the original — same mood, your style

### Monday — Art 🎨
**Evening (30 min):** Deep Study
- Screenshot your target scene, study it obsessively
- Break down: What creates the mood? (lighting, color, composition)
- Identify the *principles* — not just what they did, but *why* it works
- Sketch ideas for your own interpretation

### Tuesday — Godot 🎮
**Evening (30 min):** Scene Foundation
- Create new Godot project or scene
- Block out your composition (inspired by, not copying)
- Establish the bones — where does everything sit?
- Apply the principles you identified, not the specific assets

### Wednesday — Godot 🎮
**Evening (30 min):** Lighting & Mood
- Add CanvasModulate or Light2D nodes
- Capture the *feeling* of your reference with your own palette
- Experiment with PointLight2D for atmosphere
- Goal: Someone should feel the same vibe, even if it looks different

### Thursday — Godot 🎮
**Evening (30 min):** Details & Character
- Add particles, effects, ambient motion
- This is where your style emerges
- What would YOU add that the original didn't have?
- Push it in a direction that excites you

### Friday — Music 🎵
**Evening (25 min):** Audio Identity
- Create or find audio that fits YOUR version
- Layer ambient sounds + point sources
- The audio should match your reinterpretation, not the original

### Saturday — Integration 🎮
**Evening (30–45 min):**
- Final polish pass
- Record a short video
- Put your scene next to the original — same energy, different execution

### Sunday — Review 📋
- What principles did you learn from studying the original?
- How did your interpretation diverge? Why?
- What Godot techniques do you want to explore more?
- Save your study notes — this process repeats

**Week 2 POC:** Original scene inspired by a classic. Same mood, your voice.

---

## Week 3: Fundamentals Lock-In

> **Theme:** Slow down, get the basics right  
> **Study:** Slay the Spire or Plants vs Zombies (your choice)  
> **POC:** Painted tower concept + improved 3D model

### Monday — Art 🎨
**Evening (25 min):** Color Theory Crash Course
- Procreate: Create a color wheel (12 colors)
- Pick a Kingdom Rush tower — extract its 5 main colors
- Paint a simple blob using only those colors
- Notice: How do they handle shadows? (Hint: not just "darker")

### Tuesday — Blender 🧊
**Evening (30 min):** Topology Basics
- Learn about quads vs triangles vs ngons
- Practice: Model a simple barrel (cylinder → loop cuts → shape it)
- Keep it under 500 polygons
- This is a "background prop" level asset

### Wednesday — Godot 🎮
**Evening (30 min):** Core Mechanic Prototype
- Based on your study game: rebuild ONE mechanic
- PvZ: Sun spawning and collection
- Slay the Spire: Draw cards, play card, spend energy
- StS energy system is ~50 lines of code. Keep it tiny.

### Thursday — Blender 🧊
**Evening (30 min):** Materials Introduction
- Learn Principled BSDF basics (base color, roughness, metallic)
- Apply a simple material to your barrel
- Render with your orthographic setup
- Goal: Understand that render = lighting + materials + camera

### Friday — Music 🎵
**Evening (25 min):** SFX Session
- Create 3 UI sounds: click, hover, confirm
- Create 2 game sounds: projectile fire, impact
- Use OP-Z's punch-in effects or sample mode
- Export each as separate `.wav`

### Saturday — Integration 🎮
**Evening (30–45 min):**
- Add barrel prop to scene
- Wire up SFX to existing interactions
- Button click plays sound, tower shot plays sound
- Juice check: Does it feel better with audio?

### Sunday — Review 📋
- Study game notes
- Self-assessment: Rate your Blender comfort 1–10. Procreate 1–10.
- What needs more time in Week 4?

**Week 3 POC:** Tower + barrel in scene. All interactions have audio. One mechanic prototyped.

---

## Week 4: First Complete Asset

> **Theme:** End-to-end pipeline for one asset  
> **Study:** Into the Breach (or Defense Grid 2)  
> **POC:** One fully realized tower: concept → 3D → render → in-game

### Monday — Art 🎨
**Evening (30 min):** Tower Concept Art
- Sketch 5 quick tower ideas (silhouettes only, 2 min each)
- Pick the best one
- Paint it with color — this is your target for the 3D model

### Tuesday — Blender 🧊
**Evening (30 min):** Model from Concept
- Reference your Monday painting
- Block out the tower in 3D
- Focus on matching the silhouette exactly

### Wednesday — Godot 🎮
**Evening (30 min):** Study + System
- Into the Breach: How does the "preview damage" system create strategy?
- In Godot: Add enemy health bars or damage preview to your prototype
- Information clarity = good game feel

### Thursday — Blender 🧊
**Evening (30 min):** Final Render Pass
- Add materials to tower
- Tweak lighting for "painted" look (soft shadows, warm key light)
- Render multiple angles if needed (front, side, ¾)
- Optional: Light post-process in Procreate (paint over edges)

### Friday — Music 🎵
**Evening (25 min):** Tower Theme
- Create a 16-bar loop that says "building phase"
- Calmer than action, more active than menu
- This is your "placing towers" music

### Saturday — Integration 🎮
**Evening (45 min):** Full Assembly
- New tower sprite in Godot
- Building phase music
- All SFX wired up
- Make it playable: place tower, enemies spawn, tower shoots, you win or lose
- This is your first "complete" loop

### Sunday — Review 📋
- Study notes
- Document your asset pipeline (steps from concept → in-game)
- This pipeline is what you'll automate later
- Celebrate: You made a game thing.

**Week 4 POC:** Complete tower from scratch. Playable (if ugly) game loop.

---

## Week 5: Enemy Design

> **Theme:** Towers need something to shoot  
> **Study:** Bloons TD 6 (or Kingdom Rush enemies specifically)  
> **POC:** One enemy type: concept → model → animated → in-game

### Monday — Art 🎨
**Evening (30 min):** Enemy Concepts
- Study Bloons or KR enemy designs: What makes them readable?
- Sketch 5 enemy silhouettes (simple shapes, clear profile)
- Pick one to build

### Tuesday — Blender 🧊
**Evening (30 min):** Enemy Model
- Model your enemy concept
- Keep it LOW poly (under 300 tris)
- Think: this will be small on screen

### Wednesday — Godot 🎮
**Evening (30 min):** Enemy Behavior
- Create enemy scene with: health, movement, death
- Basic pathfinding or lane movement
- Tower targets and damages enemy
- Enemy reaches end = you lose a life

### Thursday — Blender 🧊
**Evening (30 min):** Animation Attempt
- Learn Blender's dope sheet basics
- Create a simple 4-frame "walk cycle" (just bouncing/scaling is fine)
- Render as sprite sheet OR export as animated .glb

### Friday — Music 🎵
**Evening (25 min):** Enemy Audio
- Create enemy sounds: spawn, move (footstep loop?), death
- Create a "wave incoming" stinger
- Short, punchy, clear

### Saturday — Integration 🎮
**Evening (45 min):**
- Enemy sprite/model in Godot
- Animation playing
- Audio wired to enemy events
- Multiple enemies spawn in a wave

### Sunday — Review 📋
- Study notes on enemy design
- Screenshot your enemy lineup: Does it read?
- Week 6 focus: What's the weakest link?

**Week 5 POC:** Tower vs enemies. Waves spawn. Things die. Has sound.

---

## Week 6: The Painterly Pipeline

> **Theme:** Lock in your 3D→2D aesthetic  
> **Study:** Okami or Wind Waker (art study only — watch footage)  
> **POC:** One asset with "painted" look dialed in

### Monday — Art 🎨
**Evening (30 min):** Style Study
- Screenshot 10 frames from Okami or Wind Waker
- Analyze: How do they fake brush strokes? Outlines? Color banding?
- Write down 3 specific techniques to try

### Tuesday — Blender 🧊
**Evening (30 min):** Stylized Shaders
- Research: "Blender toon shader" or "Blender NPR rendering"
- Apply to your tower model
- Goal: Get closer to "painted" vs "realistic"

### Wednesday — Godot 🎮
**Evening (30 min):** Shader Exploration
- Try a simple outline shader in Godot
- Or: Post-process painterly filter
- Or: Just focus on making existing prototype tighter

### Thursday — Blender 🧊
**Evening (30 min):** Render Refinement
- Tweak shader, lighting, and camera until one asset looks "right"
- Render, bring into Procreate, paint over problem areas
- This hybrid approach is your pipeline

### Friday — Music 🎵
**Evening (25 min):** Ambient Layer
- Create ambient background audio (not music — atmosphere)
- Wind, subtle hum, distant sounds
- Games feel empty without this layer

### Saturday — Integration 🎮
**Evening (45 min):**
- Replace old sprites with new painterly versions
- Add ambient audio layer
- Playtest: Does the aesthetic feel cohesive?

### Sunday — Review 📋
- Document your shader settings, lighting setup, post-process steps
- This is your "style guide" for all future assets
- Is the aesthetic emerging? What's your game's color palette?

**Week 6 POC:** Same game, but prettier. Art style locked in.

---

## Week 7: UI Foundations

> **Theme:** Menus, buttons, information display  
> **Study:** Hearthstone (UI/UX specifically)  
> **POC:** Functional main menu + in-game HUD

### Monday — Art 🎨
**Evening (30 min):** UI Style Guide
- Screenshot Hearthstone's main menu, card UI, game board
- Identify: Button style, font hierarchy, color coding
- Sketch your game's UI kit: buttons, panels, icons (rough)

### Tuesday — Blender 🧊
**Evening (30 min):** 3D UI Elements (Optional Path)
- Some games render UI elements in 3D
- Model a simple button, health orb, or coin
- Render for use as UI sprite

### Wednesday — Godot 🎮
**Evening (30 min):** Main Menu
- Create a main menu scene
- Buttons: Play, Settings (placeholder), Quit
- Transition to game scene

### Thursday — Blender 🧊
**Evening (30 min):** Icon Creation
- Model + render 3–5 simple icons
- Health heart, coin/gold, tower icon, enemy icon, wave number
- Render at small size (64x64 or 128x128)

### Friday — Music 🎵
**Evening (25 min):** Menu Audio Complete
- Finalize menu music
- Create button hover, click, and confirm sounds
- Create "start game" transition stinger

### Saturday — Integration 🎮
**Evening (45 min):**
- Implement HUD: lives, gold, wave counter
- Main menu fully functional
- All UI has audio feedback
- Game feels "complete" (even if content-light)

### Sunday — Review 📋
- Study notes: What makes Hearthstone UI feel premium?
- Compare your UI to your north stars — what's missing?
- Week 8: Polish or expand?

**Week 7 POC:** Playable game with menu, HUD, and UI audio.

---

## Week 8: Polish Pass

> **Theme:** Make it feel good, not just work  
> **Study:** Balatro again — focus on "juice"  
> **POC:** Polished version of existing prototype

### Monday — Art 🎨
**Evening (30 min):** Visual Effects Concepts
- Study Balatro's particles, screen shakes, flashes
- Sketch ideas: What happens when tower fires? Enemy dies? Wave clears?
- VFX = cheap dopamine

### Tuesday — Blender 🧊
**Evening (30 min):** Particle Prep
- Create simple particle sprites (spark, smoke puff, impact ring)
- Render as small PNGs with transparency
- Keep them generic — reuse everywhere

### Wednesday — Godot 🎮
**Evening (30 min):** Juice Implementation
- Add screen shake on big events
- Add particles to projectile hit
- Add UI bounce/scale animations
- One small addition = big feel improvement

### Thursday — Blender 🧊
**Evening (30 min):** Asset Polish
- Pick your weakest asset — improve it
- Better topology, better materials, better render
- Or: Create a variant (upgraded tower, different enemy)

### Friday — Music 🎵
**Evening (25 min):** Audio Polish
- Add variation to repetitive sounds (3 versions of "hit")
- Adjust volumes for mix
- Create "victory" and "defeat" stingers

### Saturday — Integration 🎮
**Evening (45 min):**
- Implement all polish elements
- Victory and defeat screens
- Full audio pass
- Playtest: Is this fun for 2 minutes?

### Sunday — Review 📋
- Record a 1-minute gameplay video
- Watch it. How does it feel?
- List: Top 5 things that would make this better
- Midpoint check: Are you leaning TD or Card game?

**Week 8 POC:** The most polished version yet. Feels like a game.

---

## Week 9: Content Expansion

> **Theme:** More stuff, same quality  
> **Study:** Monster Train or Luck Be a Landlord  
> **POC:** 3 tower types, 3 enemy types, 5 waves

### Monday — Art 🎨
**Evening (30 min):** Tower Lineup
- Concept 2 more tower types (different silhouettes, different roles)
- Quick paintings — enough to guide 3D work

### Tuesday — Blender 🧊
**Evening (30 min):** Tower #2
- Model second tower type
- Follow your established pipeline
- Can you do it faster now?

### Wednesday — Godot 🎮
**Evening (30 min):** Tower Variety
- Implement tower #2: different stats, different behavior
- Maybe: faster fire rate, splash damage, slow effect?
- Or: Start card mechanics if leaning that direction

### Thursday — Blender 🧊
**Evening (30 min):** Tower #3 + Enemy #2
- Model tower #3
- Model a second enemy type (different silhouette)
- Speed round — test your pipeline

### Friday — Music 🎵
**Evening (25 min):** Variety Pack
- Create unique audio for new towers (different fire sounds)
- Create audio for new enemy type
- Variations keep audio fresh

### Saturday — Integration 🎮
**Evening (45 min):**
- All new assets in-game
- 5-wave level with escalating difficulty
- Balance pass: Is wave 5 harder than wave 1?

### Sunday — Review 📋
- Study notes
- Content inventory: What do you have? What's missing for a "real" game?
- Week 10 scope decision: TD? Cards? Hybrid?

**Week 9 POC:** 3 towers, 3 enemies, 5 waves. Actual variety.

---

## Week 10: Scope Decision

> **Theme:** Commit to a direction  
> **Study:** Revisit your favorite from the study list  
> **POC:** Focused prototype of your chosen direction

### Monday — Art 🎨
**Evening (30 min):** Direction Concept Art
- Based on Week 9 reflection: TD or Cards?
- Sketch the "hero screen" of your game — what does it look like?
- This is your vision board

### Tuesday — Blender 🧊
**Evening (30 min):** Direction-Specific Asset
- TD: A "boss" enemy or a "hero tower"
- Cards: A card frame, a card back, a played card
- Make the thing that defines your direction

### Wednesday — Godot 🎮
**Evening (30 min):** Core System Build
- TD: Upgrade system, sell towers, or special abilities
- Cards: Full hand management, deck system, card effects
- Build the system that makes your game YOUR game

### Thursday — Blender 🧊
**Evening (30 min):** Continue Assets
- More assets for your chosen direction
- Build the backlog

### Friday — Music 🎵
**Evening (25 min):** Theme Development
- Start on a "main theme" — something recognizable
- 32 bars, more developed than previous loops
- This is your game's musical identity

### Saturday — Integration 🎮
**Evening (60 min):** Vertical Slice Push
- Everything in, everything working
- This is the "show someone" version
- Record a 2-minute video

### Sunday — Review 📋
- Watch your video. Would you play this game?
- Write your one-liner: "[Genre] game where you [verb] to [goal]"
- Concept is no longer emerging — it's decided

**Week 10 POC:** Clear game identity. One-liner locked.

---

## Week 11: Vertical Slice (Part 1)

> **Theme:** Build the "show people" version  
> **Study:** None — heads down  
> **POC:** Complete vertical slice in progress

### Monday — Art 🎨
**Evening (30 min):** Asset List
- Write down every asset you need for vertical slice
- Prioritize: Must-have vs nice-to-have
- Start concepting missing pieces

### Tuesday — Blender 🧊
**Evening (30 min):** Asset Sprint
- Model highest-priority missing asset

### Wednesday — Godot 🎮
**Evening (30 min):** Feature Sprint
- Implement highest-priority missing feature

### Thursday — Blender 🧊
**Evening (30 min):** Asset Sprint Continued
- Next priority asset

### Friday — Music 🎵
**Evening (25 min):** Audio Completeness
- What audio is missing?
- Fill gaps: missing SFX, missing music transitions

### Saturday — Integration 🎮
**Evening (60 min):** Crunch (Sustainable)
- Integrate everything
- Bug fixes
- Playtest and note issues

### Sunday — Review 📋
- Status check: What's left for Week 12?
- Prioritize ruthlessly — cut scope if needed

**Week 11 POC:** 80% complete vertical slice.

---

## Week 12: Vertical Slice (Complete)

> **Theme:** Ship Q1 deliverable  
> **Study:** Play your own game  
> **POC:** Complete, playable vertical slice

### Monday — Art 🎨
**Evening (30 min):** Final Art Pass
- Polish weakest visual assets
- Ensure consistency across all art

### Tuesday — Blender 🧊
**Evening (30 min):** Final Asset
- Whatever's still missing, finish it

### Wednesday — Godot 🎮
**Evening (30 min):** Bug Bash
- Fix the jankiest issues
- Polish game feel

### Thursday — Blender 🧊
**Evening (30 min):** Render Polish
- Re-render any assets that aren't meeting the style bar

### Friday — Music 🎵
**Evening (25 min):** Final Mix
- Audio levels balanced
- All sounds present
- Music loops cleanly

### Saturday — Integration 🎮
**Evening (60 min):** Ship It
- Final build
- Record gameplay trailer (1–2 min)
- Export playable build

### Sunday — Review 📋
**Q1 Retrospective:**
- What did you learn?
- What took longer than expected?
- What will you do differently in Q2?
- Update `constraints.md` with new self-assessment
- Celebrate. You built a game in 12 weeks.

**Week 12 Deliverable:** Playable vertical slice. Trailer video. Q2 ready.

---

## Q1 Completion Checklist

```markdown
## Q1 Deliverables

- [ ] Playable vertical slice (2–5 min of gameplay)
- [ ] 3+ tower/card types
- [ ] 3+ enemy types
- [ ] 5+ waves/rounds
- [ ] Main menu + HUD
- [ ] Full audio (music + SFX)
- [ ] Consistent art style
- [ ] 1–2 min trailer video
- [ ] Documented asset pipeline
- [ ] Game one-liner locked
- [ ] 6+ game study notes completed

## Self-Assessment (1–10)

- Blender confidence: ___
- Procreate confidence: ___
- Godot confidence: ___
- OP-Z/Audio confidence: ___
- Overall "can I make a game?" confidence: ___
```

---

## Resources by Week

| Week | Blender | Procreate | Godot | OP-Z |
|------|---------|-----------|-------|------|
| 1 | Blender Guru Part 1 | Interface tour | Godot 4 basics | — |
| 2 | Orthographic render setup | Value studies | Signal basics | — |
| 3 | Topology fundamentals | Color theory | — | — |
| 4 | Materials intro | — | — | — |
| 5 | Simple animation | — | Pathfinding | — |
| 6 | NPR/Toon shaders | Style study | Shaders | — |
| 7 | — | UI design | Control nodes | — |
| 8 | Particles | — | Juice/polish | — |
| 9–12 | Self-directed | Self-directed | Self-directed | Self-directed |

---

*Last updated: December 7, 2025*
