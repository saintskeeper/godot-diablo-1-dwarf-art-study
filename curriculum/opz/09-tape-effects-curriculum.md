# Week 9: Tape & Effects Mastery

## Overview
This week focuses on the three effect categories in the OP-Z: Tape (Track 11), Punch-In Effects (Performance Track 13), and Send Effects (FX1/FX2 on Tracks 9/10). These features are essential for live performance, improvisation, and creative sound design.

---

## Day 1: Tape Track Fundamentals (15-20 minutes)

### Objective
Understand the tape buffer system and basic playback looping.

### Concept Review
- Track 11 continuously records all audio into a buffer
- Buffer can be played back at different points and loop intervals
- Think of it like the OP-1's tape tricks - perfect for live jamming
- Buffer persists even when playback stops

### Hands-On Exercise 1: Basic Tape Looping

**Setup:**
1. Create a simple beat on tracks 1-4 (Kick, Snare, Perc, Sample)
2. Add a bassline on track 5
3. Press (Play) to start playback

**Tape Practice:**
1. (Track) + [11] - Select tape track
2. [1] - Set loop interval to 1/16th (LED will illuminate)
3. {Green} fully counter-clockwise (dull LED)
4. {Blue} to center position (green LED)
5. While music plays, press and hold (F) - Stutter effect!
6. Release (F) - Back to normal playback
7. Try different notes:
   - (G) for a different buffer position
   - (A) for another position
   - (B), (C), (D), (E) - Explore the buffer

**Experiment:**
- Change loop interval: [2] = 2/16th, [3] = 1/4, [5] = 1/2
- Longer intervals = longer stutters
- Try [0] for the longest interval

### Hands-On Exercise 2: Loop Interval Exploration

**ASCII Reference:**
```
Buffer Timeline (continuously recording):
|<-------------- Full Buffer --------------->|

Loop Intervals [1]-[0]:
[1] [2] [3]   [4] [5]   [6] [7] [8]   [9] [0]
1/16 1/4 1/2   (various 1/16th intervals)

Playback Position (F)-(E):
(F) (G) (A) (B) (C) (D) (E) (F) (G) (A) (B) (C) (D) (E)
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
Start                 Middle                        End
```

**Practice Routine:**
1. Set [1] - tap (F) rhythmically to create 1/16th stutters
2. Set [3] - tap (A) for 1/4 note loops
3. Set [5] - tap (C) for 1/2 note loops
4. Mix it up - change intervals mid-performance!

### Pro Tip
The buffer retains audio when playback stops. Stop the sequence and trigger tape effects to replay what was just captured!

**Daily Challenge:** Create a 16-bar progression, then use only tape effects to create a 30-second variation.

---

## Day 2: Tape Parameters & Creative Control (20-25 minutes)

### Objective
Master tape speed control and filtering for advanced tape manipulation.

### Concept Review
- {Green} + {Blue} dials = Speed control (coarse + fine)
- {Yellow} + {Red} dials = Filter control (cutoff + resonance)
- Parameter changes happen while holding component keys

### OP-Z Encoder Layout for Tape

```
     TAPE TRACK CONTROLS (Track 11)

{Green}         {Blue}          {Yellow}        {Red}
Speed           Speed           Filter          Resonance
(Coarse)        (Fine)          Cutoff          Level

O (dull)        O (green)       O (green)       O (off)
|               |               |               |
Normal          Normal          Neutral         No resonance
Speed           Speed           (no filter)

Counter-CW:     Counter-CW:     Counter-CW:     CW to increase
Tape stop       Half speed      High-pass       resonance
effect

Clockwise:      Clockwise:      Clockwise:
Speed up,       Double speed    Low-pass
then slow                       filter
```

### Hands-On Exercise 1: Speed Manipulation

**Setup:**
1. (Track) + [11] - Tape track
2. Start playback with musical content
3. [2] - Set to 2/16th interval

**Speed Practice:**
1. Hold (F) component key
2. While holding, turn {Green} slowly clockwise
   - Notice speed increases, then decreases to tape stop
3. Release (F), hold again
4. Turn {Green} fully counter-clockwise (dull LED) = normal speed
5. Turn {Blue} clockwise while holding (F)
   - Speeds up to double speed
6. Turn {Blue} counter-clockwise while holding (F)
   - Slows to half speed
7. Center {Blue} (green LED) = normal speed

**Musical Exercise:**
- Hold (A) and sweep {Green} for dramatic speed changes
- Hold (C) and fine-tune with {Blue} for subtle pitch shifts
- Try rapid taps of (F) with {Green} at different positions

### Hands-On Exercise 2: Filter Control

**Setup:**
1. Continue with tape track selected
2. [3] - Set to 1/4 interval for longer loops

**Filter Practice:**
1. Hold (B) component key
2. Turn {Yellow} counter-clockwise:
   - High-pass filter (removes bass)
3. Turn {Yellow} clockwise:
   - Low-pass filter (removes highs)
4. Center {Yellow} (green LED) = no filtering
5. With filter engaged, turn {Red} clockwise:
   - Adds resonance for classic filter sweep sound

**Creative Combinations:**
1. Hold (F), set {Green} halfway, {Yellow} low-pass, {Red} medium
2. Hold (A), set {Blue} half-speed, {Yellow} high-pass
3. Hold (D), sweep {Yellow} slowly while holding note
4. Rapid-fire (F)(G)(A) with filter changes between each

### Hands-On Exercise 3: Performance Workflow

**Performance Exercise (10 minutes):**
1. Load a full pattern with drums and synths
2. Press (Play)
3. Improvise using this structure:

```
Bars 1-4:   Normal playback (no tape)
Bars 5-8:   [2] interval, tap (F) on beats 1 & 3
Bars 9-12:  [5] interval, hold (C), sweep {Green}
Bars 13-16: [1] interval, rapid (F)(G)(A)(B), add {Yellow} filter
```

**Daily Challenge:** Record yourself performing a 2-minute tape effect routine. Focus on smooth transitions between intervals and parameter changes.

---

## Day 3: Punch-In Effects Fundamentals (25-30 minutes)

### Objective
Learn to apply real-time punch-in effects to tracks and groups, and understand the effect map.

### Concept Review
- 12 punch-in effects available per track/group
- Lower keyboard (F)-(E) = effects on selected track (current note)
- Upper keyboard (F)-(E) + (Shift) = effects on track's group (drum or synth)
- Effects are momentary - only active while keys held

### Punch-In Effects Map

```
PUNCH-IN EFFECTS LAYOUT
(Shift) + Keyboard on Audio Tracks 1-8

TRACK EFFECTS (Lower Keys)          GROUP EFFECTS (Upper Keys)

(F)  (G)  (A)  (B)  (C)  (D)  (E)    (F)  (G)  (A)  (B)  (C)  (D)  (E)
|    |    |    |    |    |    |      |    |    |    |    |    |    |
Duck Loop Loop Fol- Ramp Ramp Ran-   Duck Loop Loop Echo Fill Fill Ran-
     1    2    low  Up   Down dom         1    2         1    2    dom

BLACK KEYS (Track):                 BLACK KEYS (Group):
(F#)   (G#)   (Bb)   (C#)   (D#)    (F#)   (G#)   (Bb)   (C#)   (D#)
Filter Stereo Pitch  Short  Long    Filter Stereo Pitch  Short  Long
Sweep                               Sweep
```

### Hands-On Exercise 1: Track Effects

**Setup:**
1. (Track) + [1] - Select kick track
2. Ensure pattern is playing
3. Kick should have triggers on steps 1, 5, 9, 13

**Practice Each Effect:**
1. Hold (Shift) + (F) - Duck (silences track)
2. Hold (Shift) + (G) - Loop 1 (loops current note)
3. Hold (Shift) + (A) - Loop 2 (different loop)
4. Hold (Shift) + (B) - Follow (?)
5. Hold (Shift) + (C) - Ramp Up (volume rise)
6. Hold (Shift) + (D) - Ramp Down (volume fall)
7. Hold (Shift) + (E) - Random (randomizes)

**Black Key Effects:**
1. Hold (Shift) + (F#) - Filter Sweep
2. Hold (Shift) + (G#) - Stereo effect
3. Hold (Shift) + (Bb) - Pitch shift
4. Hold (Shift) + (C#) - Short (shorter note)
5. Hold (Shift) + (D#) - Long (longer note)

### Hands-On Exercise 2: Group Effects

**Setup:**
1. (Track) + [5] - Bass track (part of synth group)
2. Pattern playing with bass notes

**Practice Group Effects:**
1. Hold (Shift) + Upper (F) - Duck entire synth group
2. Hold (Shift) + Upper (G) - Loop 1 on synth group
3. Hold (Shift) + Upper (A) - Loop 2 on synth group
4. Hold (Shift) + Upper (B) - Echo on group
5. Hold (Shift) + Upper (C) - Fill 1 pattern
6. Hold (Shift) + Upper (D) - Fill 2 pattern
7. Hold (Shift) + Upper (E) - Random group

**Switch to Drums:**
1. (Track) + [2] - Snare (drum group)
2. Hold (Shift) + Upper (C) - Fill 1 on drum group
3. Hold (Shift) + Upper (D) - Fill 2 on drum group
4. Try other group effects on drums

### Hands-On Exercise 3: Musical Application

**Performance Pattern:**
```
Create 4-bar loop:
Track 1 (Kick):  X---X---X---X---
Track 2 (Snare): ----X-------X---
Track 5 (Bass):  X-X-X-X-X-X-X-X-

Bar 1: Play clean
Bar 2: (Shift) + (F#) on beat 3 (filter sweep on kick)
Bar 3: (Shift) + Upper (C) on beat 4 (drum fill)
Bar 4: (Shift) + (G) + (A) alternating (loop effects)
```

**Daily Challenge:** Create a 32-bar pattern and map out when to use each punch-in effect. Practice the routine until you can execute it smoothly.

---

## Day 4: Performance Track Recording & Send Effects Setup (25-30 minutes)

### Objective
Record punch-in effects to Performance Track 13 and understand send effects routing.

### Concept Review
- Performance Track 13 records punch-in effects as automation
- Effects can be edited like normal step sequences
- Send Effects (FX1/FX2) work like auxiliary buses
- Each audio track has individual send levels to FX1 and FX2

### Performance Track Structure

```
TRACK 13 - PERFORMANCE TRACK

Steps can contain punch-in effect triggers:
[1]  [2]  [3]  [4]  [5]  [6]  [7]  [8]  [9]  [10] [11] [12] [13] [14] [15] [16]
|    |    RAMP |    |    DUCK |    |    ECHO ECHO |    |    |    FLTR |    |
                                         ECHO                         SWEEP

Each step can have multiple effects recorded
Effects play automatically when sequencer reaches that step
```

### Hands-On Exercise 1: Recording to Performance Track

**Setup:**
1. Create simple drum pattern (tracks 1-3)
2. (Track) + [5] - Select bass track
3. Press (Play)

**Live Recording:**
1. While playing, hold (Shift) + (Rec) + lower (C)
   - Ramp Up effect records to Performance Track
2. Release all keys
3. On next loop, hold (Shift) + (Rec) + lower (F)
   - Duck effect records
4. Try: (Shift) + (Rec) + upper (B)
   - Echo on synth group records

**Verify Recording:**
1. (Track) + [13] - Select Performance Track
2. Step LEDs show red where effects are recorded
3. Press (Play) - effects trigger automatically!

### Hands-On Exercise 2: Editing Performance Track

**Direct Recording on Track 13:**
1. Stop playback
2. (Track) + [13] - Performance Track
3. Press (Rec) + (Play) - Record mode
4. Lower (F) - (E) = drum group effects
5. Upper (F) - (E) = synth group effects
6. Trigger effects in time with metronome
7. Press (Stop)

**Step Editing:**
1. (Track) + [13]
2. [4] - Select step 4
3. Lower (G) - Add Loop 1 to step 4
4. [8] - Select step 8
5. Upper (C) - Add Fill 1 to step 8
6. Press (Play) to hear automated effects

### Send Effects Overview

```
SEND EFFECTS SIGNAL FLOW

Audio Tracks (1-8) & Tape (11)
    |
    |--[FX1 Send]---> Track 9 (FX1) ---> Master Out
    |                   |
    |                [DELAY]
    |                [RYMD]
    |                [DIST]
    |                [CRUSH]
    |                [REVERB]
    |                [CHORUS]
    |
    |--[FX2 Send]---> Track 10 (FX2) --> Master Out
                        |
                     [DELAY] (FX1 only)
                     [RYMD]
                     [DIST]
                     [CRUSH]
                     [REVERB]
                     [CHORUS]
```

### Hands-On Exercise 3: Send Effects Setup

**Configure FX1:**
1. (Track) + [9] - FX1 track
2. Hold (Track) + [1] - Check which effect is loaded
   - Flashing LED = current effect
   - Illuminated = available effects
3. If needed, use app to load RYMD (reverb)

**Configure FX2:**
1. (Track) + [10] - FX2 track
2. Hold (Track) + [1] - Check effect
3. Use app to load DELAY if desired

**Set Send Levels:**
1. (Track) + [1] - Kick track
2. Tap (Shift) 4 times - Orange LEDs (FX page)
3. Turn {Green} clockwise - Send to FX1 (reverb)
   - Dull LED = 0%, Bright LED = 100%
4. Turn {Blue} clockwise - Send to FX2 (delay)
5. Press (Play) - Hear kick with reverb and delay!

**Practice on Multiple Tracks:**
1. (Track) + [2] - Snare
2. (Shift) x4 to orange LEDs
3. {Green} medium - moderate reverb
4. {Blue} off - no delay
5. (Track) + [6] - Lead
6. (Shift) x4
7. {Green} high - lots of reverb
8. {Blue} medium - rhythmic delay

**Daily Challenge:** Create a full arrangement with Performance Track automation on at least 8 steps. Set up send effects on all 8 audio tracks with intentional send levels.

---

## Day 5: Advanced Send Effects & Integration (30 minutes)

### Objective
Master send effect parameters, sequencing, and create a complete performance using all effect types.

### FX Track Controls Reference

```
FX1/FX2 PARAMETER CONTROLS

PRIMARY (White LEDs):
{Green}     {Blue}      {Yellow}    {Red}
P1          P2          Filter      Resonance

DELAY:      Amount      Cutoff      Cutoff      Resonance
RYMD:       Amount      Cutoff      Cutoff      Resonance
DIST:       Amount      Cutoff      Cutoff      Resonance
CRUSH:      Amount      Cutoff      Cutoff      Resonance
REVERB:     Decay       Tone        Cutoff      Resonance
CHORUS 80:  Speed       Depth       Cutoff      Resonance

SECONDARY (Purple LEDs) - Press (Shift) to toggle:
{Green}     {Blue}      {Yellow}    {Red}
Depth       Rate        Destination Shape
(LFO parameters - same as synth tracks)

SPECIAL CONTROLS:
Hold (Track) + {Red} = Dry Level (0-100%)
(F)-(E) keys on DELAY = Timing intervals
```

### Hands-On Exercise 1: FX Parameters

**RYMD (Reverb) on FX1:**
1. (Track) + [9] - FX1
2. Ensure RYMD loaded: Hold (Track) + [1]
3. Set up sends from kick and snare
4. Press (Play)

**Adjust Parameters:**
1. {Green} clockwise - More reverb amount (wet)
2. {Blue} counter-clockwise - Darker reverb
3. Hold (Track) + {Red}, turn clockwise - Less dry signal
4. {Yellow} center - Neutral filter
5. While playing, sweep {Green} - Hear amount change
6. Sweep {Yellow} - Filter the reverb tail

**DELAY on FX2:**
1. (Track) + [10] - FX2
2. Load DELAY effect (may need app)
3. Set timing: Press [3] - Sets 1/4 note delay
   ```
   Delay Timing Map:
   [1]=1/16  [2]=2/16  [3]=3/16  [4]=4/16  [5]=5/16
   [6]=6/16  [7]=7/16  [8]=8/16  [9]=9/16  [0]=10/16

   (F)=1/128  (G)=1/96  (A)=1/64  (Bb)=1/48  (B)=1/32
   (C)=1/24   (C#)=1/12 (D)=1/6   (D#)=1/3   (E)=1/2
   ```
4. {Green} medium - Delay amount
5. {Blue} medium - Cutoff (filter delay repeats)
6. Hold (Track) + {Red} to 75% - Mostly dry

**Send from Bass:**
1. (Track) + [5] - Bass
2. (Shift) x4 - FX page (orange LEDs)
3. {Blue} medium - Send to delay
4. Play - hear rhythmic delay on bass!

### Hands-On Exercise 2: FX Track Sequencing

**Sequence FX1 Parameters:**
1. (Track) + [9] - FX1 (RYMD)
2. [1] - Select step 1
3. Press [1] to trigger step (red LED)
4. Hold [1] + {Green} high - Big reverb on step 1
5. [5] - Select step 5
6. Press [5] to activate
7. Hold [5] + {Green} low - Small reverb on step 5
8. [9], [13] - Activate these steps
9. Hold [9] + {Yellow} low-pass - Filtered reverb
10. Press (Play) - Reverb amount changes per step!

**Advanced Sequencing:**
1. [4], [8], [12], [16] - Activate quarter note steps
2. Hold [4] + {Green} max + {Yellow} high-pass
3. Hold [8] + {Green} min + {Yellow} center
4. Alternating reverb swells!

### Hands-On Exercise 3: Send Level Control from FX Track

**Quick Mute/Unmute:**
1. (Track) + [9] - FX1
2. Hold (Shift) - Step LEDs show orange where sends are active
   - LED brightness = send level
3. While holding (Shift), press [1] - Toggle kick send mute
4. Press [2] - Toggle snare send
5. Press [5] - Toggle bass send

**Fine Adjust from FX Track:**
1. (Track) + [9]
2. Hold (Shift) + [6] - Select lead track send
3. Keep holding both
4. Green LED turns orange
5. While still holding, turn {Green} - Adjust send level!
6. Release all

### Hands-On Exercise 4: Preview Mode

**Test Effects Without Full Mix:**
1. (Track) + [6] - Lead synth track
2. (F) - Select a sound/note
3. (Track) + [9] - FX1 track
4. Hold (Shift) + (F) - Plays lead sound through FX1
5. While holding, adjust {Green}, {Blue}, {Yellow}, {Red}
6. Dial in perfect reverb before committing!

### Master Performance Exercise (15 minutes)

**Create Complete Performance:**

```
ARRANGEMENT STRUCTURE
Bars 1-8:   Foundation
Bars 9-16:  Add Tape Effects
Bars 17-24: Punch-In Effects on Performance Track
Bars 25-32: Send Effect Automation

TRACK SETUP:
1. Kick      - FX1: 30%, FX2: 0%
2. Snare     - FX1: 50%, FX2: 10%
3. Perc      - FX1: 70%, FX2: 20%
4. Sample    - FX1: 40%, FX2: 0%
5. Bass      - FX1: 20%, FX2: 40%
6. Lead      - FX1: 60%, FX2: 50%
7. Arp       - FX1: 80%, FX2: 60%
8. Chord     - FX1: 50%, FX2: 30%

FX1 (Track 9):  RYMD reverb
FX2 (Track 10): DELAY (1/4 note timing)

PERFORMANCE TRACK (13):
Step 4:  Drum Fill 1
Step 8:  Filter Sweep
Step 12: Echo on synth group
Step 16: Ramp Down on bass

TAPE (11):
Bars 9-10:   [3] interval, tap (A) on beats
Bars 11-12:  [1] interval, rapid (F)(G)(A) with filter sweep
```

**Execute:**
1. Set up all tracks with patterns
2. Configure send levels as above
3. Record Performance Track effects
4. Sequence FX1 with reverb amount changes
5. Practice bars 1-32 until smooth
6. Record or perform live!

**Daily Challenge:** Create a 64-bar complete song using all three effect types. Export and listen back critically.

---

## Quick Reference Card

### TAPE TRACK (11)

**Selection:**
- (Track) + [11]

**Loop Intervals:**
- [1]-[0] = Various 1/16th intervals
- [1]=1/16, [3]=1/4, [5]=1/2, [0]=longest

**Trigger Points:**
- (F)-(E) = Different buffer positions

**Parameters:**
```
{Green} = Speed Coarse (fully CCW = normal, dull LED)
{Blue}  = Speed Fine (center = normal, green LED)
{Yellow} = Filter (CCW=high-pass, CW=low-pass, center=none)
{Red}   = Resonance
```

---

### PUNCH-IN EFFECTS

**Trigger:**
- (Shift) + (F)-(E) on audio tracks 1-8

**Lower Keys = Track Effects:**
- (F)=Duck, (G)=Loop1, (A)=Loop2, (B)=Follow
- (C)=Ramp Up, (D)=Ramp Down, (E)=Random
- (F#)=Filter Sweep, (G#)=Stereo, (Bb)=Pitch
- (C#)=Short, (D#)=Long

**Upper Keys = Group Effects:**
- (F)=Duck Group, (G)=Loop1, (A)=Loop2, (B)=Echo
- (C)=Fill1, (D)=Fill2, (E)=Random
- (F#)=Filter Sweep, (G#)=Stereo, (Bb)=Pitch
- (C#)=Short, (D#)=Long

**Record to Performance Track:**
- (Shift) + (Rec) + Effect Key = Live record
- Or: (Track) + [13], (Rec) + (Play), trigger effects

---

### SEND EFFECTS (FX1/FX2)

**Selection:**
- (Track) + [9] = FX1
- (Track) + [10] = FX2

**Load Effect:**
- Hold (Track) + [1]-[0] (flashing = current)

**Available Effects:**
- DELAY (FX1 only), RYMD, DIST, CRUSH, REVERB, CHORUS 80

**Send Levels (from audio tracks):**
- (Track) + [1]-[8], tap (Shift) 4x (orange LEDs)
- {Green} = Send to FX1
- {Blue} = Send to FX2

**FX Parameters:**
```
PRIMARY (White LEDs):
{Green} = P1 (Amount/Decay/Speed)
{Blue}  = P2 (Cutoff/Tone/Depth)
{Yellow} = Filter Cutoff
{Red}   = Resonance

SECONDARY (Purple LEDs) - tap (Shift):
{Green} = LFO Depth
{Blue}  = LFO Rate
{Yellow} = LFO Destination
{Red}   = LFO Shape

SPECIAL:
Hold (Track) + {Red} = Dry Level
(F)-(E) = Delay timing (DELAY only)
```

**Send Control from FX Track:**
- (Track) + [9]/[10]
- Hold (Shift) = See send levels (orange LEDs)
- (Shift) + [1]-[11] = Toggle mute/unmute
- (Shift) + [1]-[11] + {Green} = Adjust send level

**Preview:**
- On audio track: Select sound with (F)-(E)
- (Track) + [9]/[10] = Switch to FX track
- (Shift) + (F)-(E) = Preview sound through effect

---

### HARDWARE DIAGRAM

```
        OP-Z TOP VIEW (Simplified)

    [1] [2] [3] [4] [5] [6] [7] [8]
    KIK SNR PRC SMP BSS LED ARP CHD

        [9]     [10]    [11]
        FX1     FX2     TAPE

            [13]
        PERFORMANCE

(Track) (Shift) (Play) (Rec) (Stop)

{Green} {Blue} {Yellow} {Red}
 Dial    Dial    Dial    Dial

(F)(F#)(G)(G#)(A)(Bb)(B)(C)(C#)(D)(D#)(E)
 Keyboard/Component Keys
```

---

### WORKFLOW TIPS

1. **Tape for Live Looping:**
   - Set interval, tap rhythmically
   - Sweep speed for dramatic builds
   - Use filter for breakdowns

2. **Punch-In for Transitions:**
   - Duck before drops
   - Fill for variation
   - Filter sweep for builds

3. **Performance Track for Precision:**
   - Record punch-ins that repeat
   - Edit steps for perfect timing
   - Layer multiple effects per step

4. **Send Effects for Space:**
   - Reverb on FX1 for depth
   - Delay on FX2 for rhythm
   - Adjust sends per track for balance
   - Sequence FX parameters for movement

5. **Preview Before Committing:**
   - Use (Shift) + keyboard on FX tracks
   - Dial in perfect settings
   - Then adjust send levels

6. **Emergency Stop:**
   - (Stop) (Stop) (Stop) = Panic mode!

---

### EFFECT COMBINATIONS

**Ambient Wash:**
- Tape: Long interval, half speed, low-pass filter
- FX1: RYMD with high amount, long decay
- High sends from arp and chord tracks

**Rhythmic Stutter:**
- Tape: [1] or [2] interval, rapid note triggers
- FX2: DELAY at 1/16th or 1/8th
- Performance: Fill effects on drums

**Breakdown:**
- Tape: Sweep {Green} from normal to tape stop
- Punch-In: Ramp Down on bass
- FX1: REVERB with increasing amount

**Build-Up:**
- Tape: Filter sweep {Yellow} from low-pass to center
- Punch-In: Ramp Up + Filter Sweep
- FX2: DELAY with increasing send levels

**Lo-Fi Effect:**
- Tape: Half speed + resonant filter
- FX: CRUSH with medium amount
- Performance: Random effect for glitches

---

## Week Summary

You now have complete control over the OP-Z's three effect systems:

1. **Tape Track (11)** - Real-time buffer looping with speed and filter control
2. **Punch-In Effects** - 12 momentary effects per track/group, recordable to Performance Track 13
3. **Send Effects (FX1/FX2)** - Auxiliary-style effects with individual send levels and full parameter control

These tools transform the OP-Z from a sequencer into a complete performance instrument. Practice daily to build muscle memory for live performance!

**Next Week Preview:** Master Track, Project Management, and Complete Song Workflow
