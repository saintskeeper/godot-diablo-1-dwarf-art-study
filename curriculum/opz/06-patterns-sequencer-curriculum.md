# OP-Z Patterns & Sequencer - Weekly Curriculum

## Overview
This week focuses on mastering the OP-Z sequencer - the heart of the device. You'll learn step sequencing, pattern editing, live recording, and pattern chaining to create evolving arrangements.

**Duration:** 5 days, 15-30 minutes per session
**Prerequisites:** Basic OP-Z operation and track knowledge

---

## Day 1: Basic Step Programming (20 minutes)

### Goal
Master static step programming for drums and melodic tracks.

### Hands-On Exercises

#### Exercise 1: Four-on-the-Floor Kick Pattern (5 min)
```
STEP SEQUENCE (16 steps):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ ● │   │   │   │ ● │   │   │   │ ● │   │   │   │ ● │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
```

**Steps:**
1. (Track) + Step [1] - Select Kick track
2. Keyboard (F) - Select kick sound
3. Press Step [1], [5], [9], [13] - Add four kicks
4. (Play) - Listen to your pattern

#### Exercise 2: Add Snare on 2 and 4 (5 min)
```
STEP SEQUENCE (16 steps):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │ ● │   │   │   │   │   │   │   │ ● │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
```

1. (Track) + Step [2] - Select Snare track
2. Keyboard (G) - Select snare sound
3. Press Step [5], [13] - Add snares on beats 2 and 4
4. (Play) - Listen to kick and snare together

#### Exercise 3: Build Complete Drum Pattern (10 min)
Add percussion and hi-hats:

**Kick:**
```
● - - - ● - - - ● - - - ● - - -
```

**Snare:**
```
- - - - ● - - - - - - - ● - - -
```

**Perc (Hi-hats):**
```
● - ● - ● - ● - ● - ● - ● - ● -
```

**Practice:**
1. (Track) + Step [3] - Select Perc track
2. Add hi-hats on steps [1], [3], [5], [7], [9], [11], [13], [15]
3. Experiment with different drum sounds using Keyboard (F)-(E)

### Key Concepts
- Lit button = step is active (red LED)
- Unlit button = step is empty
- Press lit button again to remove step
- Last sound selected is what gets sequenced

---

## Day 2: Multi-Sound Programming & Layering (25 minutes)

### Goal
Learn to program multiple sounds per track and layer sounds on single steps.

### Hands-On Exercises

#### Exercise 1: Multiple Kick Sounds (8 min)
```
STEP SEQUENCE (16 steps):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ F │   │   │   │ F │   │   │   │ F │   │   │   │ E │   │ E │ E │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
```

1. (Track) + Step [1] - Select Kick
2. Keyboard (F) - Select first kick sound
3. Press Step [1], [5], [9] - Add main kicks
4. Keyboard (E) - Select different kick sound
5. Press Step [13], [15], [16] - Add variation kicks
6. (Play) - Listen to the variation

#### Exercise 2: Layered Percussion (10 min)
Create a layered clap/snap on step 5:

1. (Track) + Step [3] - Select Perc track
2. Hold Step [5] + Press Keyboard (G) + Keyboard (A) - Layer two sounds
3. Create this pattern with layers:

```
PERC TRACK LAYERS:
Sound (G): ● - ● - ● - ● - ● - ● - ● - ● -
Sound (E): - - - - ● - - - - - - - - - - -  (layered on step 5)
```

#### Exercise 3: Complex Multi-Sound Pattern (7 min)
Build a full drum track using multiple sounds per track:

**Sample Track - Sounds (A) and (C):**
```
Sound (A): - - - - ● - - - - - ● - - - - -
Sound (C): - - ● - - - - ● - - - - ● - - -
```

1. (Track) + Step [4] - Select Sample
2. Keyboard (A) - Press Step [5], [11]
3. Keyboard (C) - Press Step [3], [8], [13]

### Key Concepts
- Each track supports multiple sounds across 16 steps
- Drum tracks have 2-note polyphony (two sounds per step)
- Hold step + press 2 keyboard notes to layer sounds
- Layered sounds trigger simultaneously

---

## Day 3: Melodic Sequencing & Live Recording (30 minutes)

### Goal
Program melodic sequences and learn live recording techniques.

### Hands-On Exercises

#### Exercise 1: Bass Line Programming (10 min)
Create a simple F minor bass line:

```
BASS TRACK:
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ F │   │   │   │ C │   │ A#│ G#│   │   │   │   │ C │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16
```

**Method 1 - Static Programming:**
1. (Track) + Step [5] - Select Bass
2. Keyboard (F) - Select note F
3. Press Step [1] - Add F on step 1
4. Keyboard (C) - Select note C
5. Press Step [5] - Add C on step 5
6. Continue: Keyboard (A#) → Step [7], Keyboard (G#) → Step [8], Keyboard (C) → Step [13]

**Method 2 - Hold & Select:**
1. Hold Step [1] + Press Keyboard (F)
2. Hold Step [5] + Press Keyboard (C)
3. Hold Step [7] + Press Keyboard (A#)
4. Hold Step [8] + Press Keyboard (G#)
5. Hold Step [13] + Press Keyboard (C)

#### Exercise 2: Note Length Extension (5 min)
Extend the bass notes:

```
STEP SEQUENCE WITH LENGTHS:
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ F ━━━━━━━━ │ C │   │A# ━ G#│   │   │   │   │ C ━━━━━━━━━━━━ │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

1. Hold Step [1] + Press Step [4] - Extend F for 4 steps
2. Hold Step [7] + Press Step [8] - Extend A# for 2 steps
3. Hold Step [13] + Press Step [16] - Extend C for 4 steps
4. Note: When holding first step, it shows RED, length shows BLUE

#### Exercise 3: Live Recording (15 min)

**Recording Stopped:**
1. (Track) + Step [6] - Select Lead track
2. (Rec) + (Play) - Arm recording (Rec flashes red)
3. Play melody on keyboard - recording starts on first note
4. (Rec) button solid red when recording
5. Pattern loops - overdub more notes
6. (Play) - Stop recording, continue playback

**Recording While Playing:**
1. (Play) - Start playback
2. Hold (Rec) + Play melody - Records while Rec is held
3. OR: (Rec) + (Play) - Lock recording mode
4. (Play) - Stop recording

**Step-by-Step Recording:**
1. (Track) + Step [7] - Select Arp
2. Hold (Rec) + Keyboard (C) - Records step 1, advances to step 2
3. Keep (Rec) held + Press more notes - Each note advances one step
4. Hold (Rec) + Press (+) or (-) - Skip forward/back steps
5. Release (Rec) - Resets to step 1

### Key Concepts
- Melodic tracks: Bass, Lead, Arp, Chord (tracks 5-8)
- Red LED = trigger point, Blue LED = note length
- Live recording captures timing nuances (not quantized)
- Step recording is always on-grid

---

## Day 4: Pattern Editing & Advanced Techniques (30 minutes)

### Goal
Master pattern editing, micro-timing, parameter locks, and velocity control.

### Hands-On Exercises

#### Exercise 1: Step Editing Basics (10 min)

**Preview a Step:**
1. With sequencer stopped, hold any lit step for 2 seconds - Previews sound

**Change Step Note:**
1. Hold Step [1] + Press new Keyboard note (A) - Changes note

**Copy/Paste Steps:**
1. Hold Step [1] - Copies step to memory
2. Press Step [5] - Pastes to step 5 (includes length and settings)

**Change Velocity:**
1. Hold Step [1] + Press [Bend] - Adjust velocity
2. Sound previews on loop while held
3. Release to confirm

#### Exercise 2: Micro-Timing Adjustment (10 min)

Create a "groovy" hi-hat pattern with timing variations:

```
STEP SEQUENCE WITH MICRO-TIMING:
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ ● │ ◗ │ ● │ ◗ │ ● │ ◗ │ ● │ ◗ │ ● │ ◗ │ ● │ ◗ │ ● │ ◗ │ ● │ ◗ │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
  ● = on grid    ◗ = slightly late (swing)
```

**Check Timing:**
1. Hold Step [2] - Adjacent buttons show PURPLE if off-grid
2. Brighter purple = further from grid center
3. No purple = perfectly on grid

**Adjust Timing:**
1. Hold Step [2] + Press (+) - Shift forward (max +12 ticks)
2. Hold Step [2] + Press (-) - Shift backward (max -12 ticks)
3. Repeat for steps [4], [6], [8] to create swing feel

**Create Swing Pattern:**
1. Shift even steps slightly late: Steps [2], [4], [6], [8], [10], [12], [14], [16]
2. Hold each + Press (+) about 3-4 times
3. (Play) - Listen to the swing groove

#### Exercise 3: Parameter Locks (10 min)

Add filter sweeps to your bass line:

```
BASS TRACK WITH FILTER AUTOMATION:
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ F │   │   │   │ C │   │A# │G# │   │   │   │   │ C │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
Filter: Low   →   →   → High→  →  Mid  Low   →   →   →  → High →
```

1. (Track) + Step [5] - Select Bass
2. Hold Step [1] + Turn {Red} dial fully left - Low filter on step 1
3. Hold Step [5] + Turn {Red} dial fully right - High filter on step 5
4. Hold Step [7] + Turn {Red} dial to middle - Mid filter on step 7
5. Hold Step [8] + Turn {Red} dial fully left - Low filter on step 8
6. Hold Step [13] + Turn {Red} dial fully right - High filter on step 13
7. (Play) - Hear filter sweep across pattern

**Clear Parameter Locks:**
- Single step: Hold Step [1] + Hold (Stop) until white LEDs finish
- Whole track: Hold (Rec) + Hold (Stop) until white LEDs finish

### Key Concepts
- Micro-timing: +/- 12 ticks per step (live recording has +/- 96 ticks)
- Parameter locks are per-step parameter values
- Purple LEDs show timing offset when step is held
- White LEDs during clearing indicate progress

---

## Day 5: Track Lengths, Pattern Chaining & Bouncing (30 minutes)

### Goal
Create evolving patterns with different track lengths and chain patterns into songs.

### Hands-On Exercises

#### Exercise 1: Polyrhythmic Patterns (12 min)

Create a pattern where tracks have different lengths:

```
TRACK LENGTH DIAGRAM:

KICK (12 steps):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ ● │   │   │   │ ● │   │   │   │ ● │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

SNARE (16 steps):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│   │   │   │   │ ● │   │   │   │   │   │   │   │ ● │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

BASS (8 steps):
┌───┬───┬───┬───┬───┬───┬───┬───┐
│ F │   │   │ C │   │A# │G# │   │
└───┴───┴───┴───┴───┴───┴───┴───┘
```

**Set Kick to 12 steps:**
1. (Track) + Step [1] - Select Kick
2. Hold (Track) + Hold (Shift) + Press Step [12]
3. White LEDs show length while held

**Set Bass to 8 steps:**
1. (Track) + Step [5] - Select Bass
2. Hold (Track) + Hold (Shift) + Press Step [8]

**Leave Snare at 16 steps (default)**

**Result:** Tracks loop at different rates creating evolving polyrhythms

#### Exercise 2: Extended Pattern Lengths (8 min)

Create a 2-bar lead melody:

```
LEAD TRACK - 32 STEPS (2 bars):
Physical steps represent: 1___2___3___4___5___6___7___8___9___10__11__12__13__14__15__16__
Each step = 2 actual steps
```

1. (Track) + Step [6] - Select Lead
2. Hold (Track) + Hold (Shift) + Press Value Key [2] - Sets 2x length multiplier
3. Total steps = 16 x 2 = 32 steps (2 bars)
4. Live record a longer melody - notes fall between physical buttons
5. Each physical step now represents 2 steps in time

**Length Multipliers:**
- Value [1] = 16 steps (1 bar)
- Value [2] = 32 steps (2 bars)
- Value [4] = 64 steps (4 bars)
- Value [8] = 128 steps (8 bars)
- Value [9] = 256 steps (16 bars)

#### Exercise 3: Pattern Chaining (10 min)

Create a 4-pattern song structure: Intro → Verse → Chorus → Outro

**Setup:**
1. Pattern 1: Minimal drums (kick + snare only)
2. Pattern 2: Full drums + bass
3. Pattern 3: Full arrangement with melody
4. Pattern 2 (again): Drop back to drums + bass

**Chain Patterns:**
1. Hold [P] throughout steps 2-6
2. Press (Play)
3. Press Step [1] - Add Pattern 1 to chain
4. Press Step [2] - Add Pattern 2
5. Press Step [3] - Add Pattern 3
6. Press Step [2] - Add Pattern 2 again
7. White LEDs show included patterns, flashing white = current

**Save Chain:**
1. Hold [P] + Press Keyboard (F) - Saves to slot F
2. Step buttons animate white during save

**Recall Chain:**
1. Press [P] + Press Keyboard (F) - Loads saved chain

**Bounce to Audio:**
1. Hold [P] + Press (Rec) - Renders 10-second audio file
2. Yellow LEDs animate during bounce
3. Files saved to OP-Z/bounces folder
4. Max 5 bounces (red LEDs if full)

### Key Concepts
- Step count: 1-16 steps per track
- Step length multiplier: 1x, 2x, 4x, 8x, 16x
- Total steps = step count × step length
- Pattern chains max 32 patterns
- Bounce creates WAV file + project.opz file

---

## Quick Reference Card

### STEP SEQUENCE DIAGRAM
```
STEP SEQUENCE (16 steps):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │13 │14 │15 │16 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

LED Colors:
● RED = Step is active/triggered
● BLUE = Note length extension
● YELLOW = Active step cursor (recording)
● PURPLE = Timing offset indicator
● WHITE = Track length or chain indicator
○ OFF = Empty step
```

### PATTERN PROGRAMMING

**Select Track:**
- (Track) + Step [1-16]

**Add Single Step:**
1. Select sound: Keyboard (F)-(E)
2. Press Step [1-16]

**Add Multiple Sounds:**
1. Keyboard (F) - Select first sound
2. Press steps for that sound
3. Keyboard (G) - Select second sound
4. Press steps for that sound

**Layer Sounds (Polyphonic):**
- Hold Step [X] + Press Keyboard (F) + Keyboard (G)

**Extend Note Length:**
- Hold FIRST Step + Press LAST Step
- First step = RED, length = BLUE when held

**Remove Step:**
- Press lit step button

### LIVE RECORDING

**Record Stopped:**
1. (Rec) + (Play) - Arm recording
2. Play notes - Starts on first note
3. (Play) or (Stop) - Stop recording

**Record Playing:**
1. (Play) - Start playback
2. Hold (Rec) + Play notes
   OR: (Rec) + (Play) to lock
3. (Play) - Stop recording

**Step-by-Step:**
1. Hold (Rec) + Keyboard note - Records & advances
2. (Rec) + (+)/(-) - Skip steps

**Subtractive Recording:**
- Hold (Rec) + Press (-) + Keyboard note - Erases that note

### STEP EDITING

**Preview Step:**
- Hold step for 2 seconds (sequencer stopped)

**Change Note:**
- Hold Step + Press new Keyboard note

**Change Length:**
- Hold FIRST Step + Press LAST Step

**Copy/Paste:**
1. Hold source step - Copies
2. Press destination step - Pastes

**Velocity:**
- Hold Step + Press [Bend]

**Micro-Timing:**
- Hold Step + Press (+) - Forward max +12 ticks
- Hold Step + Press (-) - Backward max -12 ticks

**Check Timing:**
- Hold Step - Adjacent PURPLE = off grid

**Parameter Lock:**
- Hold Step + Turn {Dial} - Sets parameter for that step

**Clear Locks:**
- One step: Hold Step + Hold (Stop)
- Track: Hold (Rec) + Hold (Stop)

### TRACK SETTINGS

**Step Count:**
- Hold (Track) + Hold (Shift) + Press Step [1-16]

**Step Length Multiplier:**
- Hold (Track) + Hold (Shift) + Value Key [1-9]
  - [1] = 1x (16 steps)
  - [2] = 2x (32 steps)
  - [4] = 4x (64 steps)
  - [8] = 8x (128 steps)
  - [9] = 16x (256 steps)

**Quantize:**
- Hold (Track) + Turn {Yellow} - 0-100%

**Note Length:**
- Hold (Track) + Turn {Green} - Default length

**Note Style:**
- Hold (Track) + Turn {Blue}
  - Drums: Retrig, Mono, Gate, Loop
  - Synth: Poly, Mono, Legato

**Nudge Steps:**
- (Track) + (+) - Shift all steps forward
- (Track) + (-) - Shift all steps back

**Clear Track:**
- Hold (Track) + Hold (Stop)

### PATTERN MANAGEMENT

**Copy Track:**
1. Select source track
2. Hold [P] + (Shift) + (Shift) + (Shift)
3. Keep [P] held, press destination track

**Copy Pattern:**
- Hold [P] + (Shift) + destination pattern

**Copy Pattern Settings Only:**
- Hold [P] + (Shift) + (Shift) + destination pattern

### PATTERN CHAINING

**Create Chain:**
1. Hold [P]
2. (Play)
3. Press Step [1-16] for patterns in order
4. Release [P] when complete

**Save Chain:**
- Hold [P] + Keyboard (F)-(E) white key

**Load Chain:**
- Press [P] + Keyboard (F)-(E) white key

**View Chains:**
- Hold [P] - Shows in app

### BOUNCE TO AUDIO

**Bounce Pattern:**
- Hold [P] + (Rec) - Renders 10-second WAV

**Access Files:**
1. Hold (Track) while powering on - Content mode
2. Connect USB to computer
3. Navigate to: OP-Z → bounces → bounce01-05 → bounce.wav

### TRACK POLYPHONY

| Track | Type | Polyphony |
|-------|------|-----------|
| 1-4 | Drums | 2 notes |
| 5 | Bass | 1 note (mono) |
| 6 | Lead | 3 notes |
| 7 | Arp | 3 notes |
| 8 | Chord | 4 notes |

### TIMING RESOLUTION

**Step Programming:**
- 24 ticks per step (+/- 12 ticks)
- 8 ticks per (+)/(-) button press

**Live Recording:**
- 192 ticks per step (+/- 96 ticks)
- Higher resolution for natural timing

### KEYBOARD LAYOUT
```
┌────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐
│ F# │ G# │    │ A# │    │ C# │ D# │    │ F# │ G# │    │ A# │    │ C# │
├────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
│ F  │ G  │ A  │ A# │ C  │ C# │ D  │ E  │ F  │ G  │ A  │ A# │ C  │ C# │
└────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘
Black = White keys │ White = Component keys
```

### VISUAL LED FEEDBACK

**Step Button States:**
- **Solid RED** = Active step
- **BLUE** = Length extension
- **YELLOW** = Playback cursor
- **PURPLE** = Timing offset
- **WHITE** = Track length/chain selection
- **FLASHING WHITE** = Current pattern in chain
- **FLASHING RED** = Rec armed
- **SOLID RED** = Recording
- **GREEN FLASH** = Subtractive recording
- **OFF** = Empty step

### TIPS & TRICKS

1. **Create Swing:** Shift even-numbered steps slightly late with micro-timing
2. **Polyrhythms:** Use different step counts per track (12, 16, 14)
3. **Evolving Patterns:** Combine different track lengths with step components
4. **Live vs. Grid:** Step programming = perfect timing, live recording = human feel
5. **Parameter Locks:** Automate any parameter per step for variation
6. **Pattern Variations:** Copy pattern, make small changes, chain together
7. **Quick Preview:** Hold step to hear sound without playback
8. **Copy Workflow:** Hold step to copy, press destination to paste
9. **Layer Drums:** Use 2-note polyphony for richer drum hits
10. **Long Melodies:** Use step length multiplier for patterns beyond 16 steps

---

## Practice Goals by End of Week

- [ ] Create basic drum patterns using all 4 drum tracks
- [ ] Program multi-sound patterns across single track
- [ ] Layer sounds using polyphony
- [ ] Build melodic bass and lead sequences
- [ ] Record patterns live with good timing
- [ ] Edit step velocity and timing for groove
- [ ] Apply parameter locks for filter sweeps
- [ ] Create polyrhythmic patterns with different track lengths
- [ ] Chain 4+ patterns into a song structure
- [ ] Bounce a pattern to audio file

## Next Steps

After mastering patterns and sequencing, you're ready for:
- **Step Components:** Add complex per-step automation (multiply, randomize, ramp)
- **Effects:** Apply track and master effects
- **Performance Mode:** Mute groups, punch effects, live manipulation
- **Advanced Techniques:** Conditional trigs, probability, microtonality

**Keep experimenting!** The sequencer is the heart of the OP-Z - the more you practice, the more creative possibilities you'll discover.