# OP-Z Synth Tracks: Week 4 Curriculum

## Overview
This week focuses on the four synth tracks (5-8): Bass, Lead, Arp, and Chord. You'll learn sound selection, parameter manipulation, synth engines, and how to create melodic content on the OP-Z.

```
SYNTH TRACKS (5-8):
       ┌───┐ ┌───┐ ┌───┐ ┌───┐
       │BAS│ │LED│ │ARP│ │CHD│
       │ 5 │ │ 6 │ │ 7 │ │ 8 │
       └───┘ └───┘ └───┘ └───┘

ENCODERS (parameters):
    {Green}    {Blue}    {Yellow}   {Red}
    ┌───┐      ┌───┐      ┌───┐      ┌───┐
    │ ◉ │      │ ◉ │      │ ◉ │      │ ◉ │
    └───┘      └───┘      └───┘      └───┘
```

**Track Characteristics:**
- Track 5 (Bass): Monophonic by default
- Track 6 (Lead): 3-note polyphonic
- Track 7 (Arp): Monophonic with arpeggiator
- Track 8 (Chord): 4-note polyphonic

---

## Day 1: Track Selection & Navigation (15-20 min)

### Goals
- Master track selection and sound navigation
- Understand the four parameter pages
- Learn to play and select sounds

### Exercise 1: Track Selection & Sound Browsing (5 min)

**Access Bass Track:**
1. Hold (Track) + [5] to select Bass track
2. Hold (Track) + [1] through [0] to browse sound plugs (slots 1-10)
3. Hold (Track) + Component keys (F)-(E) to select presets
4. Play keyboard notes (F)-(E) to audition sounds

**Repeat for all tracks:**
- (Track) + [6] for Lead
- (Track) + [7] for Arp
- (Track) + [8] for Chord

**Tip:** The last note played is remembered when sequencing!

### Exercise 2: Parameter Page Navigation (10 min)

**Page Tour on Bass Track:**

1. Select Bass: (Track) + [5]
2. Tap (Shift) repeatedly to cycle through parameter pages

**Watch the encoder LED colors change:**

```
PAGE 1 - WHITE GROUP:
{Green} = P1 Macro
{Blue} = P2 Macro
{Yellow} = Filter (0-49 = Low Pass, 50 = Neutral, 51-100 = High Pass)
{Red} = Resonance

PAGE 2 - GREEN GROUP:
{Green} = Attack Time
{Blue} = Decay Time
{Yellow} = Sustain Level
{Red} = Release Time

PAGE 3 - PURPLE GROUP (LFO):
{Green} = Depth (-50 to +50)
{Blue} = Rate (tempo-synced or free Hz)
{Yellow} = Destination (P1, P2, Filter, Res, Attack, Vibrato, Pan, Vol)
{Red} = Shape (SIN, TRI, SQR, SAW, RND, GYRO)

PAGE 4 - YELLOW GROUP:
{Green} = FX1 Send
{Blue} = FX2 Send
{Yellow} = Pan (L-C-R)
{Red} = Level
```

3. On each page, turn each encoder and observe LED brightness changes
4. Use the app to see visual parameter values

### Exercise 3: Track Note Parameters (5 min)

1. Select any synth track: (Track) + [5-8]
2. HOLD (Track) - this accesses track note parameters
3. While holding (Track), adjust encoders:
   - {Green} = Note Length (1/64 to Drone)
   - {Blue} = Note Style (Poly/Mono/Legato)
   - {Yellow} = Quantize (0-100%)
   - {Red} = Portamento glide (0-100)

**Practice:** Set Bass to Legato style, add portamento to 50, listen to smooth note transitions

---

## Day 2: Synth Engines & Macros (20-30 min)

### Goals
- Understand synth engines and their characteristics
- Master P1 and P2 macro controls
- Create custom sounds from presets

### Exercise 1: Synth Engine Overview (10 min)

**Available Synth Engines:**

| Engine | P1 Macro | P2 Macro | Description |
|--------|----------|----------|-------------|
| Bow | Tension | Chorus | String synthesis |
| Cluster | Tone | Gravity | Multiple clustered oscillators |
| Digital | Octave | Feedback | Digital raw engine |
| Electric | Cross Mod | X Mod | Complex/transforming |
| Saw | Envelope | Tone | Filtered waves |
| Shade | Detune | Drive | Smooth piano |
| Uranus | Tone | Feedback | Clean bass |
| Volt | Osc Variation | Osc Modulation | Multi oscillator electric |
| Analog | Osc Mix | Env Amount | Saw, Sub, Noise, Filter Envelope |
| Organ | Osc Algorithm | Algorithm Tweak | FM Organ - 8 Algorithms |
| EP | Algorithm | Tone | FM Electric Piano - 8 Algorithms |

**Sound Design Philosophy:**
> "Spend less time trying to understand how the synth engines work and more time tweaking, experimenting and taking your own sound design journey to learning the engines sound features." - Teenage Engineering

### Exercise 2: Macro Parameter Exploration (15 min)

**Bass Track - Analog Engine:**

1. Select Bass: (Track) + [5]
2. Load an Analog engine preset
3. Tap (Shift) until WHITE LEDs appear (Page 1)
4. Play a sustained bass note repeatedly while adjusting:

**P1 Macro (Osc Mix) - {Green}:**
- Turn fully left: hear the character change
- Turn fully right: notice tonal shift
- Find sweet spot in middle

**P2 Macro (Env Amount) - {Blue}:**
- Turn fully left: minimal envelope modulation
- Turn fully right: maximum filter envelope sweep
- Combine with P1 for variations

5. Try this on different engines to hear how macros behave differently

**Challenge:** Create 3 different bass sounds from one preset using only P1 and P2

### Exercise 3: Filter & Resonance (10 min)

**Understanding the Filter:**

```
FILTER BEHAVIOR:
    {Yellow}

0 ←──────→ 49    LOW PASS (cuts highs)
        50        NEUTRAL (no filtering)
51 ←──────→ 100   HIGH PASS (cuts lows)

RESONANCE:
    {Red}
0 ←──────→ 100   Emphasizes filter cutoff frequency
```

**Practice Sequence:**

1. Select Lead: (Track) + [6]
2. Record a simple melody on steps [1], [5], [9], [13]
3. Let it loop while you adjust filter:
   - Start at 0 (dark, muffled low-pass)
   - Sweep to 100 (bright, thin high-pass)
   - Stop at 50 (neutral, full spectrum)
4. Add resonance {Red} to 70 and sweep filter again - hear the emphasis!

**Classic Move:** Low-pass filter at 30, high resonance at 80 = classic analog squelch

---

## Day 3: Envelopes & LFO (25-30 min)

### Goals
- Master ADSR envelope shaping
- Use LFO for movement and modulation
- Create evolving synth textures

### Exercise 1: ADSR Envelope (15 min)

```
ENVELOPE STAGES:

        ┌─── Peak
       ╱│╲
      ╱ │ ╲
     ╱  │  ╲_____ Sustain Level
    ╱   │      ╲
   ╱    │       ╲
  │  A  │ D  S  │ R  │
  └─────┴───────┴────┘
Note ON        Note OFF

{Green} = Attack   - Time to peak
{Blue}  = Decay    - Time to sustain
{Yellow}= Sustain  - Held level
{Red}   = Release  - Time to silence
```

**Preset Explorations:**

1. Select Chord: (Track) + [8]
2. Tap (Shift) to GREEN group (page 2)
3. Record a single chord on step [1] with full bar length

**Setting A: Pad Sound**
- Attack {Green}: 60 (slow fade in)
- Decay {Blue}: 40 (gentle descent)
- Sustain {Yellow}: 70 (stays relatively high)
- Release {Red}: 80 (long tail)
- Result: Lush, atmospheric pad

**Setting B: Pluck Sound**
- Attack {Green}: 0 (instant)
- Decay {Blue}: 30 (quick drop)
- Sustain {Yellow}: 0 (drops to silence)
- Release {Red}: 20 (short tail)
- Result: Sharp, percussive pluck

**Setting C: Organ Sound**
- Attack {Green}: 5 (quick but not instant)
- Decay {Blue}: 10 (minimal decay)
- Sustain {Yellow}: 90 (stays high)
- Release {Red}: 15 (quick cutoff)
- Result: Sustained organ-like tone

### Exercise 2: LFO Modulation (15 min)

**Note:** LFO is available on Bass, Lead, and Chord tracks only (NOT Arp)

**Setup:**
1. Select Lead: (Track) + [6]
2. Record a long sustained note on step [1]
3. Tap (Shift) to PURPLE group (page 3)

**LFO Parameters:**

```
{Green} = Depth      (-50 to +50, 0=off)
{Blue}  = Rate       (tempo sync: 1/64-2/1, or free Hz)
{Yellow}= Destination (P1, P2, Filter, Res, Attack, Vibrato, Pan, Vol)
{Red}   = Shape      (SIN, TRI, SQR, SAW, RND, GYRO)
```

**Vibrato Effect:**
- Depth {Green}: 30
- Rate {Blue}: 1/8 (value key [4] lights up)
- Destination {Yellow}: Vibrato ([6] lights purple)
- Shape {Red}: SIN ([1] lights green)
- Result: Classic vibrato wobble

**Filter Sweep:**
- Depth {Green}: 50 (maximum)
- Rate {Blue}: 1/4 (slower sweep)
- Destination {Yellow}: Filter ([3] lights yellow)
- Shape {Red}: TRI ([2] lights blue)
- Result: Automatic filter movement

**Tremolo Effect:**
- Depth {Green}: -40 (negative modulation)
- Rate {Blue}: 1/16 (faster pulse)
- Destination {Yellow}: Vol ([8] lights)
- Shape {Red}: SQR ([3] lights yellow)
- Result: Rhythmic volume pulsing

**Advanced: GYRO Shape**
- Shape {Red}: Turn to GYRO ([6] lights)
- Physically tilt and rotate the OP-Z
- Your movements become the LFO source!

---

## Day 4: Arpeggiator Track (20-25 min)

### Goals
- Set up and control arpeggios
- Understand arp parameters: Speed, Pattern, Style, Range
- Create rhythmic melodic sequences

### Exercise 1: Basic Arpeggio Setup (10 min)

**Create Your First Arpeggio:**

1. Select Arp track: (Track) + [7]
2. Hold step [1] + press keys: C [1], E [2], G [4], C [8] (C major chord)
3. While still holding [1], press [1] + [4] to set note length to 4 steps
4. Release and press (Play)

You should hear the notes arpeggiate!

**Adjust Arp Settings:**
5. Tap (Shift) to BLUE group (page 3) - this is the ARP page
6. Adjust parameters:

```
ARPEGGIATOR PARAMETERS:

{Green} = Speed    (OFF, 1-8 speeds)
{Blue}  = Pattern  (Man, Up, Down, U-D, D-U, Rand)
{Yellow}= Style    (1-6 timing variations)
{Red}   = Range    (0-100, extends over 3 octaves)
```

**Speed Settings:** (Watch value keys light up)
- [1] OFF (green LED) = Arpeggiator disabled
- [2] 1 (blue LED) = Slowest (quarter notes)
- [3] 2 = Half-time feel
- [4] 3 = 8th notes (most common)
- [5] 4 = 16th notes
- [6] 5-8 = Faster rates for glitchy effects

### Exercise 2: Pattern Exploration (8 min)

**Set up a 4-note arp: C-E-G-B**
1. Hold [1] + keys C, E, G, B
2. Set length: [1] + [8]

**Try Each Pattern:**

**Manual (value key lights up as played):**
- Plays back notes in the order you recorded them

**Up:**
- Ascends from lowest to highest: C-E-G-B

**Down:**
- Descends from highest to lowest: B-G-E-C

**Up-Down:**
- Ascends then descends: C-E-G-B-G-E

**Down-Up:**
- Descends then ascends: B-G-E-C-E-G

**Random:**
- Unpredictable order, great for generative patterns

### Exercise 3: Advanced Arp Techniques (7 min)

**Multi-Step Arpeggios:**

1. Create a progression:
   - Step [1]: C-E-G (C major)
   - Step [5]: F-A-C (F major)
   - Step [9]: G-B-D (G major)
   - Step [13]: C-E-G (C major)

2. Set each step length to 4 steps
3. Pattern: Up
4. Speed: 3 (16th notes)
5. Range {Red}: 50 (adds octave variation)

**Style Parameter:**
- Styles 1-6 add timing variations and extra notes
- Experiment with each to hear rhythmic differences

**Turn Arp Off:**
- {Green} dial counter-clockwise to green LED
- App shows "OFF"

---

## Day 5: Complete Track Production (30 min)

### Goals
- Build a complete 4-track synth arrangement
- Apply all learned techniques
- Create dynamic, evolving patterns

### Exercise 1: Layer Building (20 min)

**Step 1: Bass Foundation (5 min)**

1. (Track) + [5] - Select Bass
2. Choose Uranus or Analog engine preset
3. Record root note pattern:
   - [1] C, [5] F, [9] G, [13] C
4. Navigate to WHITE page (Shift)
   - Filter {Yellow}: 35 (warm low-pass)
   - Resonance {Red}: 20 (subtle bump)
5. GREEN page:
   - Attack {Green}: 5 (quick but not instant)
   - Decay {Blue}: 40
   - Sustain {Yellow}: 60
   - Release {Red}: 25
6. PURPLE page (LFO):
   - Depth {Green}: 25
   - Rate {Blue}: 1/8
   - Destination {Yellow}: Filter
   - Shape {Red}: SIN

**Step 2: Lead Melody (5 min)**

1. (Track) + [6] - Select Lead
2. Choose Electric or Volt engine
3. Record a melody over the bass:
   - [2] E, [3] rest, [6] G, [7] F
   - [10] E, [11] rest, [14] D, [15] rest
4. WHITE page:
   - P1 {Green}: 60 (adjust for brightness)
   - Filter {Yellow}: 65 (slight high-pass for clarity)
5. Hold (Track) for note parameters:
   - Note Style {Blue}: Legato (smooth transitions)
   - Portamento {Red}: 30 (subtle glide)

**Step 3: Arpeggio Texture (5 min)**

1. (Track) + [7] - Select Arp
2. Create chord progression arpeggios:
   - [1] C-E-G (4 steps)
   - [5] F-A-C (4 steps)
   - [9] G-B-D (4 steps)
   - [13] C-E-G (4 steps)
3. BLUE page (Arp):
   - Speed {Green}: 4 (16th notes)
   - Pattern {Blue}: Up-Down
   - Style {Yellow}: 2
   - Range {Red}: 40 (moderate octave spread)
4. YELLOW page:
   - FX1 Send {Green}: 60 (add delay)
   - Pan {Yellow}: slight right

**Step 4: Chord Pads (5 min)**

1. (Track) + [8] - Select Chord
2. Choose Shade or Bow engine
3. Record sustained chords:
   - [1] C-E-G-B (full 4-step length)
   - [5] F-A-C-E (full 4-step length)
   - [9] G-B-D-F (full 4-step length)
   - [13] C-E-G-B (full 4-step length)
4. GREEN page (Envelope):
   - Attack {Green}: 70 (slow swell)
   - Decay {Blue}: 50
   - Sustain {Yellow}: 80
   - Release {Red}: 90 (long tail)
5. YELLOW page:
   - FX2 Send {Blue}: 70 (reverb)
   - Level {Red}: 60 (sit in background)

### Exercise 2: Dynamic Performance (10 min)

**Live Parameter Tweaking:**

1. Start playback
2. Practice temporary tweaks: (Shift) + Turn {Dial}
   - Bass filter sweeps on beats 13-16
   - Lead vibrato depth adjustments
   - Arp range changes for variation
   - Chord reverb swells

**Mute Combinations:**
- Mute lead and arp: just bass and chords
- Mute bass and chords: arp and lead interplay
- Build up: start with bass only, add elements

**Preset Switching:**
- While playing, hold (Track) + Component key (F)-(E)
- Switch to different presets to transform sounds
- Practice smooth transitions

**Random Variations:**
- Select a track: (Track) + [5-8]
- Generate random preset: (Track) + (Rec)
- If you like it: save by holding (Track) + Component key (F)-(E) for 2+ seconds

---

## Quick Reference Card

### Track Selection
```
(Track) + [5] = Bass (Monophonic)
(Track) + [6] = Lead (3-note poly)
(Track) + [7] = Arp (Mono + Arpeggiator)
(Track) + [8] = Chord (4-note poly)
```

### Sound Browsing
```
Hold (Track) + [1]-[0]    = Select plug/slot
Hold (Track) + (F)-(E)    = Select preset
Press (F)-(E)              = Play/audition notes
Hold (Track) + (Rec)       = Randomize preset
Hold (Track) + (F)-(E) 2s  = Save preset
```

### Parameter Pages (cycle with Shift)
```
PAGE 1 - WHITE:  P1 Macro, P2 Macro, Filter, Resonance
PAGE 2 - GREEN:  Attack, Decay, Sustain, Release (ADSR)
PAGE 3 - PURPLE: LFO Depth, Rate, Destination, Shape
         (BLUE for Arp Track: Speed, Pattern, Style, Range)
PAGE 4 - YELLOW: FX1 Send, FX2 Send, Pan, Level
```

### Track Note Parameters
```
Hold (Track) to access:
{Green}  = Note Length (1/64 - Drone)
{Blue}   = Note Style (Poly/Mono/Legato)
{Yellow} = Quantize (0-100%)
{Red}    = Portamento (0-100)
```

### Synth Engines (Common)
```
Analog  = Saw/Sub/Noise classic analog
Uranus  = Clean bass tones
Electric = Complex transforming sounds
Volt    = Multi-oscillator electric
Bow     = String synthesis
Shade   = Smooth piano tones
Organ   = FM Organ (8 algorithms)
EP      = FM Electric Piano (8 algorithms)
```

### Filter Guide
```
{Yellow} Dial Position:
0-49   = LOW PASS (cuts highs, warms sound)
50     = NEUTRAL (no filtering)
51-100 = HIGH PASS (cuts lows, thins sound)

{Red} = Resonance (emphasizes cutoff frequency)
```

### LFO Destinations
```
Value Keys light up for:
[1] P1         [5] Attack
[2] P2         [6] Vibrato (pitch)
[3] Filter     [7] Pan
[4] Resonance  [8] Vol
```

### LFO Shapes
```
[1]  SIN  (smooth wave)        [11] SIN BELL (retriggered)
[2]  TRI  (linear triangle)    [12] TRI (retriggered)
[3]  SQR  (on/off square)      [13] SQR (retriggered)
[4]  SAW  (ramp)               [14] SAW (retriggered)
[5]  RND  (random)             [15] RND (retriggered)
[6]  GYRO (motion-based)       [16] ONCE (one-shot)
```

### Arpeggiator Quick Setup
```
1. Hold step [X] + press chord notes
2. While holding [X], press [X] + [Y] for length
3. (Shift) to BLUE page
4. Set: Speed, Pattern, Style, Range
5. To disable: Speed {Green} to OFF position
```

### Arp Patterns
```
Man    = As played/recorded
Up     = Ascending
Down   = Descending
U-D    = Up then Down
D-U    = Down then Up
Rand   = Random order
```

### Performance Tips
```
(Shift) + Turn {Dial}     = Temporary tweak
(Track) + track key       = Mute/unmute
Double-tap (Track) + key  = Solo track
Multiple track keys       = Mute multiple
```

### Polyphony Defaults
```
Bass:  MONO (1 note)
Lead:  POLY (3 notes)
Arp:   MONO (1 note + arpeggiator)
Chord: POLY (4 notes)

Override: Hold (Track) > Note Style {Blue} > Poly/Mono/Legato
```

### Classic Synth Settings

**Fat Bass:**
```
Engine: Uranus/Analog
Filter: 30-40 (low-pass)
Resonance: 15-25
Attack: 0-5 (fast)
Release: 20-30 (short)
LFO > Filter, Depth 20, Rate 1/8
```

**Acid Bass:**
```
Engine: Analog
Filter: 20 (dark low-pass)
Resonance: 70-90 (high!)
Envelope > moderate attack/decay
LFO > Filter, Depth 50, Rate 1/16, SQR shape
```

**Lush Pad:**
```
Engine: Bow/Shade
Filter: 50-60 (neutral to slight HP)
Attack: 60-80 (slow)
Sustain: 70-90 (high)
Release: 80-100 (long)
FX2 Send: 70+ (reverb)
```

**Pluck Lead:**
```
Engine: Electric/Volt
Filter: 55-65 (slight high-pass)
Attack: 0 (instant)
Decay: 20-40 (quick)
Sustain: 0 (drops to silence)
Note Style: Legato + Portamento 20-40
```

**Vibrato Lead:**
```
Engine: Any
LFO > Vibrato destination
Depth: 20-40
Rate: 1/4 or 1/8
Shape: SIN (smooth)
```

---

## Week 4 Wrap-Up

### Skills Mastered
- Track selection and sound browsing across all 4 synth tracks
- Navigation of 4 parameter pages (White, Green, Purple/Blue, Yellow)
- Sound design using P1/P2 macros and synth engines
- Filter and resonance shaping (low-pass/high-pass)
- ADSR envelope control for different articulations
- LFO modulation for movement and expression
- Arpeggiator setup, patterns, and styles
- Multi-track layering and arrangement
- Live performance parameter tweaking

### Next Steps
- Experiment with all 12 synth engines
- Create a library of your own presets (use (Track) + (Rec) for randomization starting points)
- Explore FX tracks for processing synth sounds (Week 5 material)
- Combine drum and synth tracks for complete arrangements
- Practice live parameter automation during playback
- Try unconventional LFO destinations (like LFO to Pan or Resonance)

### Practice Challenges
1. Create a bass patch without looking at the app (use LED feedback only)
2. Build a 4-bar progression using all 4 synth tracks
3. Make 5 completely different sounds from a single preset using only parameters
4. Create an evolving pad that changes over 16 bars using LFO
5. Set up a complex arpeggio with pattern changes across steps

**Remember:** The OP-Z encourages experimentation over analysis. Don't overthink the synth engines - twist knobs, listen, and discover. The best sounds often come from happy accidents!

---

*End of Week 4: Synth Tracks Curriculum*
