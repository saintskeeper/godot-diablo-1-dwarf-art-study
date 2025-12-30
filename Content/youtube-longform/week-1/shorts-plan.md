# Week 1 Shorts Content Plan

Extract 6-8 shorts from Week 1 material. Each short targets 30-60 seconds.

---

## Short 1: Blender Navigation in 30 Seconds

**Type:** Tool tip
**Source:** `Learning/curriculum/week-1/tuesday-blender-viewport-navigation.md`

**Script:**
> Three controls that change everything in Blender:
> - Middle mouse button: orbit around your scene
> - Shift + middle mouse: pan sideways
> - Scroll wheel: zoom in and out
>
> That's it. You just learned viewport navigation.
> G to move, S to scale, R to rotate.
> Don't panic - Ctrl+Z undoes everything.

**B-roll:** Blender viewport with each control demonstrated

---

## Short 2: Blender to Godot in 45 Seconds

**Type:** Tool tip
**Source:** `Learning/curriculum/week-1/saturday-godot-import-pipeline.md`

**Script:**
> How to get your Blender model into Godot:
> 1. Select your object in Blender
> 2. File > Export > glTF 2.0
> 3. Choose .glb format (single file, easy)
> 4. Check "Selected Objects"
> 5. Save directly to your Godot assets folder
>
> Godot auto-imports it. Drag into your scene. Done.

**B-roll:** Export menu, file appearing in Godot, drag to scene

---

## Short 3: The Event Dice Mechanic Explained

**Type:** Game dev process
**Source:** `Games/week-1-study/Docs/game-design-doc.md`

**Script:**
> I made a dice game for a game jam. Here's the core mechanic:
>
> Every time something dies, the table shakes.
> The shaking rolls a fate die with 6 outcomes:
> - Ragnarok Rumble: everyone takes damage
> - Odin's Favor: you heal
> - Loki's Trick: units swap positions
> - Thor's Blessing: next attack deals bonus damage
> - Frost Giant's Breath: a column freezes
> - Valhalla's Call: a dead unit revives
>
> Chain reactions are the whole point.
> Kill something, shake the table, roll again.

**B-roll:** Gameplay showing a kill triggering the dice

---

## Short 4: OP-Z Menu Music in 60 Seconds

**Type:** Tool tip
**Source:** `Learning/curriculum/week-1/friday-music-op-z-basics.md`

**Script:**
> Making menu music on the OP-Z:
>
> Menu music tips:
> - Keep tempo slow: 70-90 BPM
> - Use pad sounds, not harsh leads
> - Leave space - menu music shouldn't demand attention
> - Loop seamlessly
>
> Quick setup:
> 1. Pick a pad sound (tracks 5-8)
> 2. Add notes on a few steps
> 3. Set pattern length to 8 bars
> 4. Add a gentle bass underneath
> 5. Export as .wav
>
> That's your title screen music.

**B-roll:** OP-Z with hands, audio waveform overlay

---

## Short 5: Snow Shader in Godot

**Type:** Shader breakdown
**Source:** `Games/week-1-study/scenes/Diablo Study/Weather/snow_weather.gdshader`

**Script:**
> How to make a snow shader in Godot:
>
> Key uniforms:
> - snow_density: how thick the snowfall
> - fall_speed: how fast it drops
> - wind: horizontal drift
> - flake_size: individual snowflake scale
>
> The trick: use a hash function to randomly place snowflakes in a grid.
> Animate the UV coordinates downward over time.
> Add some wind sway with a sine wave.
>
> 30 lines of shader code, infinite vibes.

**B-roll:** Shader in action, code overlay

---

## Short 6: Why Start with Kingdom Rush?

**Type:** Game dev process
**Source:** User learning approach

**Script:**
> Why did I study Kingdom Rush for my game dev journey?
>
> Three reasons:
> 1. Clear visual hierarchy - you always know what's happening
> 2. Satisfying feedback loops - every upgrade feels good
> 3. Simple core that expands naturally
>
> Before building, study what works.
> Play games with intention.
> Take notes. Screenshot towers.
>
> That's how a proof of concept becomes a real game.

**B-roll:** Kingdom Rush gameplay or screenshots

---

## Short 7: AI as a Creative Accelerator

**Type:** Commentary
**Source:** `Content/youtube-longform/week-1/users-audio-notes.md`

**Script:**
> Hot take: AI makes creativity accessible.
>
> Not everyone has time to devote to creative pursuits.
> Some people are providing for families, working demanding jobs.
> They still have ideas. They still want to make things.
>
> I'm using AI to:
> - Plan my learning curriculum
> - Get quick reference materials
> - Prototype ideas faster
>
> I'm still doing the work.
> Still touching the tools.
> Still shipping ugly things.
>
> AI just helps me start faster.

**B-roll:** Minimal - can be talking head only

---

## Publishing Schedule

| # | Short | Best Platform | Suggested Post Day |
|---|-------|---------------|-------------------|
| 1 | Blender Navigation | YouTube Shorts, TikTok | Mon |
| 2 | Blender to Godot | YouTube Shorts | Wed |
| 3 | Event Dice Mechanic | YouTube Shorts, TikTok | Fri |
| 4 | OP-Z Menu Music | YouTube Shorts, TikTok | Following Mon |
| 5 | Snow Shader | YouTube Shorts | Following Wed |
| 6 | Kingdom Rush Study | YouTube Shorts, TikTok | Following Fri |
| 7 | AI Accelerator | YouTube Shorts, TikTok | Following week |

---

## Production Notes

- All shorts can use the same OP-Z menu loop as background music
- Keep text overlays minimal
- Each short should work standalone (don't assume viewers saw longform)
- Film shorts in same session as longform to maintain consistency
