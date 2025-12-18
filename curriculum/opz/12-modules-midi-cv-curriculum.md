# OP-Z Week 12: Modules, MIDI & CV
## Expanding Your OP-Z's Connectivity

This week focuses on expanding your OP-Z's capabilities through hardware modules, MIDI connectivity, and CV control. You'll learn to integrate external gear, synchronize devices, and unlock advanced I/O functionality.

---

## Day 1: Module Installation & Oplab Basics (15-20 minutes)

### Objective
Safely install modules and understand the Oplab module's interface and capabilities.

### Hardware Overview

```
OP-Z MODULE SLOT (Rear Panel)
┌─────────────────────────────────┐
│  [][][][][]  ◄── 4 Yellow Latches│
│                                   │
│  ┌─────────────────────────┐    │
│  │   MODULE EXPANSION SLOT  │    │
│  │  (Behind Rear Cover)     │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘

OPLAB MODULE (ZM-1)
┌──────────────────────────────────┐
│  ● ● ● ●  ○ ○ ⓘ ○               │
│  │ │ │ │                          │
│  │ │ │ └─ CV: CV Note + CV2/CV3  │
│  │ │ └─── GATE: Trigger output   │
│  │ └───── MIDI IN: 5-pin adapter │
│  └─────── MIDI OUT: 5-pin adapter│
│                                   │
│  Switches: ↑out ↓in ↑gate ↑cv   │
│           MIDI TRIG              │
│            IN   IN   CV1  CV2    │
└──────────────────────────────────┘
```

### Exercise 1: Installing the Oplab Module (5 min)

**Safety First: ALWAYS power OFF before installation**

1. Power OFF the OP-Z completely
2. Rotate 4 yellow latches 90° counter-clockwise
3. Remove rear cover
4. Lift bottom of dummy module, slide top out
5. Set Oplab latch to UP (off position)
6. Insert Oplab with 4 connectors first through case holes
7. Align angled corner, push gently until seated
8. Push Oplab latch DOWN (on position)
9. Replace rear cover
10. Power ON

**Tip:** Save the dummy module pegs - they form an OP-Z stand!

### Exercise 2: Understanding Oplab Connections (10 min)

**Oplab has 4 connections with dual-purpose switches:**

```
CONNECTION MAPPING (3.5mm TRS/TR jacks)
┌─────────┬──────┬────────┬─────────┐
│ Setting │ Tip  │ Ring   │ Sleeve  │
├─────────┼──────┼────────┼─────────┤
│ CV      │ Note │ CV2    │ Ground  │
│ GATE    │ Gate │ CV3    │ Ground  │
│ MIDI IN │ Sink │ Source │ -       │
│ MIDI OUT│ Sink │ Source │ Ground  │
│ TRIG IN │ Trig │ -      │ Ground  │
│ TRIG OUT│ Trig │ -      │ Ground  │
│ PO OUT  │ Sync │ -      │ Ground  │
└─────────┴──────┴────────┴─────────┘
```

**Practice:** Label the 4 connections on a sticky note for your OP-Z rear panel. Since there's no visible labeling, this prevents confusion!

### Tomorrow's Prep
Gather a MIDI keyboard or controller if available.

---

## Day 2: MIDI Configuration & Input Control (25-30 minutes)

### Objective
Master MIDI setup and control your OP-Z from external MIDI devices.

### MIDI Configuration Page

Access MIDI settings: [Screen] + [Tempo]

```
GLOBAL MIDI SETTINGS (Value Keys 1-8)
┌───────┬────────────────────────────────┐
│ Key 1 │ Channel 1 → Active Track       │
│ Key 2 │ Incoming MIDI Enable           │
│ Key 3 │ Outgoing MIDI Enable           │
│ Key 4 │ MIDI Clock In                  │
│ Key 5 │ MIDI Clock Out                 │
│ Key 6 │ Alt Program Change             │
│ Key 7 │ MIDI Echo                      │
│ Key 8 │ Enable Program Change          │
└───────┴────────────────────────────────┘

When [Screen] + [Tempo] held:
- Value keys GLOW YELLOW when ON
- Steps (1-16) show MIDI channels
```

### Exercise 1: Basic MIDI Setup (10 min)

**Hardware Connection Options:**

*Option A: USB MIDI (No Oplab needed)*
```
[MIDI Keyboard] ──USB──┬──USB Hub (powered)
[OP-Z]          ──USB──┘
```

*Option B: 5-Pin MIDI (Requires Oplab)*
```
[MIDI Keyboard] ──5-pin MIDI out──► [3.5mm adapter]
                                    ──► Oplab "IN" jack
                                    (Switch set to "MIDI")
```

**Configuration Steps:**

1. Connect hardware using one method above
2. On OP-Z: (Track) + [14] - Module track
3. Hold [Screen] + [Tempo]
4. Press Value Key [2] - Incoming MIDI (should light YELLOW)
5. Press Value Key [1] - Channel 1 to Active Track (should light YELLOW)
6. Release [Screen] + [Tempo]

**Test:** Play your MIDI keyboard - notes should trigger the active OP-Z track!

### Exercise 2: Channel Routing Practice (10 min)

**Set Track-Specific MIDI Channels:**

1. (Track) + [1] - Kick track
2. Hold [Screen] + [Tempo] + Turn {Green} encoder
3. Watch steps (1-16) - they show MIDI channels 1-16
4. Select channel with {Green} encoder
5. Default: Track 1 = Chan 1, Track 2 = Chan 2, etc.

**Practice Challenge:**
- Set Kick (Track 1) to MIDI Channel 10 (common for drums)
- Set Bass (Track 5) to MIDI Channel 1
- Play different channels from your keyboard
- Switch tracks with (Track) + steps to hear routing

### Exercise 3: Understanding External MIDI Clock (5 min)

When MIDI Clock In is enabled (Key 4), the OP-Z becomes a MIDI slave:

```
TEMPO DISPLAY INDICATORS
┌──────────────────────────────┐
│ Internal Clock: Steps WHITE  │
│ External Clock: Steps GREEN  │
└──────────────────────────────┘
```

**Enable External Clock:**
1. [Screen] + [Tempo] + Value Key [4]
2. Start your external sequencer/DAW
3. OP-Z will sync to external tempo
4. Press (Play) - both devices run in sync

---

## Day 3: MIDI Output & CC Control (25-30 minutes)

### Objective
Control external synthesizers and gear using OP-Z as a MIDI sequencer.

### MIDI CC Control Fundamentals

The OP-Z can send MIDI Control Change (CC) messages from the color dials to control external parameters.

```
KEY MIDI INPUT CCs (0-127 range)
┌──────────┬────┬────────────────────┐
│ CC 1-2   │ P1 │ Parameters 1 & 2   │
│ CC 3     │    │ Filter Cutoff      │
│ CC 4     │    │ Filter Resonance   │
│ CC 5-8   │    │ Envelope ADSR      │
│ CC 9-10  │    │ LFO Depth/Speed    │
│ CC 13-14 │    │ FX 1/2 Send        │
│ CC 15    │    │ Pan                │
│ CC 16    │    │ Volume             │
└──────────┴────┴────────────────────┘
```

### Exercise 1: Configure MIDI Output (10 min)

**Setup Hardware:**

*Option A: USB MIDI*
```
[OP-Z] ──USB──┬──USB Hub
[Synth] ──USB──┘
```

*Option B: Oplab 5-pin MIDI*
```
[OP-Z Oplab OUT] ──3.5mm→5-pin adapter──► [Synth MIDI IN]
(Switch set to "MIDI")
```

**Configuration:**

1. On OP-Z: [Screen] + [Tempo]
2. Press Value Key [3] - Outgoing MIDI ON (lights YELLOW)
3. Press Value Key [5] - MIDI Clock Out ON (if syncing external gear)
4. Release [Screen] + [Tempo]

**On External Synth:**
- Set MIDI receive channel (e.g., Channel 1)
- Enable MIDI note and CC reception

### Exercise 2: CC Mapping with OP-Z App (15 min)

**Using the OP-Z App for CC Setup:**

```
MIDI SETUP PAGE LAYOUT
┌─────────────────────────────────┐
│ TRACK: [Kick]    Channel: [1]   │
├─────────────────────────────────┤
│ CC-1 │ CC-2 │ CC-3 │ CC-4      │
│  ●1  │  ●2  │  ●3  │  ●4       │
│ CC-5 │ CC-6 │ CC-7 │ CC-8      │
│  ●5  │  ●6  │  ●7  │  ●8       │
│      │  ... (4 pages total)     │
├─────────────────────────────────┤
│ GLOBAL  ☐ CH1→ACTIVE ☐ MIDI IN │
└─────────────────────────────────┘
```

**Mapping Exercise:**

1. Open OP-Z app → "MIDI Setup"
2. (Track) + [14] - Module track
3. In app: Tap parameter dial position (e.g., Red dial, page 1)
4. Swipe track pad to set CC number
   - Example: Set Red dial = CC 74 (common filter cutoff)
   - Example: Set Blue dial = CC 71 (resonance)
5. On OP-Z: (Shift) to cycle parameter pages (LEDs show page)
6. Turn {Red} encoder - external synth filter should respond!

**Practice Challenge:**
Map all 4 color dials on page 1 to control:
- {Green} = CC 1 (Mod Wheel)
- {Red} = CC 74 (Filter Cutoff)
- {Blue} = CC 71 (Filter Resonance)
- {Yellow} = CC 10 (Pan)

### Exercise 3: Sequencing External Gear (10 min)

**Create a MIDI sequence to control external synth:**

1. (Track) + [14] - Module track (or any track assigned to external MIDI channel)
2. Hold [Record]
3. Tap step [1], [5], [9], [13] - create 4-on-floor gate pattern
4. Tap notes to set pitch per step
5. While step held, turn {Red} dial (mapped to CC 74) - different filter per step!
6. (Play) - external synth plays your sequence

**Creative Tip:** Mute the OP-Z track audio with (Shift) + Step while still sending MIDI!

---

## Day 4: CV Control & Modular Integration (25-30 minutes)

### Objective
Control analog synthesizers and modular systems using CV/Gate outputs.

### CV/Gate Fundamentals

```
CV & GATE SIGNAL DIAGRAM
┌────────────────────────────────┐
│ CV (0-5V): Note Pitch          │
│     ┌─────────┐                │
│ 5V ─┤         │                │
│     │    ▯▯   │  ◄── Stepped   │
│     │  ▯▯  ▯  │      voltages  │
│ 0V ─┴────────┴┴────────────    │
│                                 │
│ GATE (0-5V): Note On/Off       │
│     ┌──┐  ┌──┐                 │
│ 5V ─┤  │  │  │  ◄── Triggers   │
│     │  │  │  │      envelope   │
│ 0V ─┘  └──┘  └────────────     │
└────────────────────────────────┘

CV2 & CV3 (-5V to +5V): Modulation
     ┌──┐
+5V ─┤  │        ◄── Bipolar
     │  │            control
 0V ─┤  ╰──┐         signals
     │     │
-5V ─┴─────┴────
```

### Oplab CV Connections

```
OPLAB CV WIRING (TRS Jacks)
┌─────────────────────────────┐
│ CV Jack:   T=CV  R=CV2  S=⏚ │
│ GATE Jack: T=Gate R=CV3 S=⏚ │
└─────────────────────────────┘

Use TRS breakout cables:
┌──CV──┐     ┌──┐
│ Tip  ├─────┤  │ Eurorack CV IN
│ Ring ├──┐  └──┘
│Sleeve├┐ │  ┌──┐
└──────┘│ └──┤  │ Eurorack CV2 IN
        │    └──┘
        └────⏚ Ground
```

### Exercise 1: Basic CV/Gate Setup (10 min)

**Hardware Connection:**

```
[OP-Z Oplab]              [Modular Synth]
    CV  ────────────────► VCO CV IN
    GATE ───────────────► Envelope GATE
    CV2 ────────────────► VCF Cutoff (optional)
    CV3 ────────────────► LFO Amount (optional)
```

**Configuration:**

1. Power OFF both devices
2. Set Oplab switch: "CV" position UP, "GATE" position UP
3. Connect cables (CV to pitch input, Gate to envelope gate)
4. Power ON
5. On OP-Z: (Track) + [14] - Module track
6. Hold [Record], tap steps to create sequence
7. (Play) - modular synth should play your sequence!

### Exercise 2: CV Note Sequencing (10 min)

**Create a melodic CV sequence:**

1. (Track) + [14]
2. [Record] + tap steps [1], [4], [7], [10], [13], [16]
3. While holding each step, play notes on step keys
   - Step [1] = C
   - Step [4] = E
   - Step [7] = G
   - Step [10] = B
   - Step [13] = C (octave up)
   - Step [16] = G
4. (Play) - arpeggio plays on modular!

**Transpose Practice:**
- Hold (Track) + Turn {Green} - transpose entire sequence
- External synth follows in real-time

### Exercise 3: CV2 & CV3 Modulation (10 min)

**Using CV2 and CV3 for parameter control:**

CV2 and CV3 send -5V to +5V based on {Green} and {Blue} dial values per step.

**Setup:**

1. Connect CV2 (from CV TRS Ring) to filter cutoff on modular
2. Connect CV3 (from GATE TRS Ring) to VCA or another parameter
3. (Track) + [14]
4. Hold step [1] + Turn {Green} dial - sets CV2 voltage for this step
5. Hold step [5] + Turn {Green} dial to different value
6. Repeat for steps [9] and [13]
7. (Play) - filter opens/closes per step!

**Creative Challenge:**
- Create rhythmic filter movement with CV2
- Use CV3 to control resonance or LFO speed
- Combine Gate, CV, CV2, and CV3 for complex modular sequences

---

## Day 5: Line Module, Advanced Routing & Integration (25-30 minutes)

### Objective
Master stereo audio I/O with the Line module and create advanced multi-device setups.

### Line Module Overview (ZM-4)

```
LINE MODULE (ZM-4) CONNECTIONS
┌────────────────────────────────┐
│ ● ● ● ●  ○ ○ ⓘ ○               │
│ │ │ │ │                         │
│ │ │ │ └─ PO Sync OUT            │
│ │ │ └─── TRIG OUT               │
│ │ └───── MIDI OUT               │
│ │                               │
│ ├─ LINE IN  (Stereo 3.5mm)     │
│ └─ LINE OUT (Stereo 3.5mm)     │
│                                 │
│ Switches: ↑out ↓in ○line ○line│
└────────────────────────────────┘

Line In:  Left/Right audio input
Line Out: Left/Right audio output
          (can be alternate mix/cue)
```

### Exercise 1: Stereo Audio Input (10 min)

**Connect External Audio Source:**

```
[External Synth] ──Stereo Out──► [OP-Z Line IN]
                  (3.5mm TRS)
```

**Setup:**

1. (Track) + [14] - Module track
2. Connect stereo cable to Line IN
3. **Set Mono/Stereo mode:**
   - For Stereo (default): Just plug in
   - For Mono (L→L+R): Hold [Screen] WHILE plugging in cable
4. Enable input: (Shift) + [4] - toggles Line IN on/off
5. Adjust input level: (Shift) x3 (page 4) + Turn {Red} dial

**Visual Feedback:**
- OP-Z App Module page shows 'S' (stereo) or 'M' (mono)
- Grey box under "Module" = input active

**Practice:**
- Play audio from external device
- Adjust input gain with {Red} dial
- Audio routes through OP-Z effects and master output

### Exercise 2: Alternate Mix Output (10 min)

**Create a "Cue" Mix using Line Out:**

The Line Out can send a different mix than the main output - perfect for DJ-style cueing or parallel processing.

```
ROUTING FLOW
┌──────────────────────────────┐
│ OP-Z Tracks                  │
│  Track 1 ──┬──► Main Mix     │
│  Track 2 ──│                 │
│  Track 5 ──┼──► Line Out Mix │
│  Track 8 ──┘    (Cue/Alt)    │
└──────────────────────────────┘
```

**Configuration:**

1. (Shift) + (Track) buttons to assign tracks to Line Out
   - Example: (Shift) + (Track)[1] - Kick to Line Out (LED turns YELLOW)
   - Example: (Shift) + (Track)[5] - Bass to Line Out
2. Adjust per-track send level:
   - Hold (Shift) + Hold (Track)[1] for 1 second (flashes)
   - While holding both, Turn {Green} - adjusts send level (0-100%)
3. Adjust Dry level (how much goes to main mix):
   - Hold (Track) + Turn {Red} - 0% = Line Out only, 100% = both mixes

**Use Cases:**
- Send bass tracks to subwoofer via Line Out
- Create headphone cue mix for live performance
- Route specific tracks to external effects pedal

### Exercise 3: Complete Studio Integration (10 min)

**Build a hybrid setup combining everything:**

```
ULTIMATE OP-Z HYBRID SETUP
┌──────────────────────────────────────┐
│                                       │
│  [MIDI Keyboard] ──USB─┐             │
│                        ▼             │
│  [OP-Z with Line] ◄──USB Hub         │
│   │ │ │ │                            │
│   │ │ │ └─ Line OUT ──► [Effect Pedal] │
│   │ │ │               (Delay/Reverb)   │
│   │ │ │                     │          │
│   │ │ └─ MIDI OUT ───► [Ext. Synth] ──┤
│   │ │                      │          │
│   │ └─── TRIG OUT ───► [Drum Machine]│
│   │                         │         │
│   └─ Line IN ◄──────────────┴─ Mixer │
│        ▲                              │
│        └────── Effect Return ─────────┘
│                                       │
│  Main Output ──► [Monitors/Recording] │
└──────────────────────────────────────┘
```

**Setup Steps:**

1. **MIDI Input:** Connect keyboard via USB, enable incoming MIDI
2. **MIDI Output:** Connect external synth, map CCs to page 1 dials
3. **Trig Output:** Set Oplab to TRIG, connect to drum machine
   - Hold (Shift) + Step + (Jump)[B] + [0] to set trig steps
4. **Line Out:** Route drums to effect pedal via Line Out
5. **Line In:** Return effects to Line In with stereo cable
6. **Balance:** Adjust dry/wet, sends, and input gain

**Test the Complete System:**
- Play keyboard → triggers OP-Z tracks
- OP-Z sequence → controls external synth via MIDI CC
- OP-Z drums → route through external reverb pedal
- Trig out → advances drum machine pattern
- Mix everything back through main output

---

## Quick Reference Card

### Module Installation
```
Power OFF → Rotate latches 90° CCW → Remove cover
→ Remove dummy module → Insert new module
→ Latch ON → Replace cover → Power ON
```

### MIDI Configuration
```
[Screen] + [Tempo] = MIDI page
Value Key [1] = Channel 1 → Active
Value Key [2] = MIDI In ON/OFF
Value Key [3] = MIDI Out ON/OFF
Value Key [4] = Clock In
Value Key [5] = Clock Out

Hold [Screen] + [Tempo] + Turn {Green} = Select MIDI channel
```

### Oplab Switch Positions
```
┌─────────┬──────────┬──────────┐
│ Switch  │ Up       │ Down     │
├─────────┼──────────┼──────────┤
│ OUT     │ TRIG     │ MIDI/PO  │
│ IN      │ TRIG     │ MIDI     │
│ GATE    │ GATE     │ -        │
│ CV      │ CV       │ -        │
└─────────┴──────────┴──────────┘
```

### CV/Gate Voltages
```
CV:   0V to 5V  (Note pitch)
CV2:  -5V to +5V (Modulation)
CV3:  -5V to +5V (Modulation)
GATE: 0V to 5V  (Note trigger)
```

### Line Module
```
(Shift) + [4] = Toggle Line IN
(Shift) x3 + {Red} = Input level

(Shift) + (Track) = Route to Line OUT (YELLOW)
Hold (Shift) + Hold (Track) 1sec + {Green} = Send level
Hold (Track) + {Red} = Dry level (main mix amount)

Stereo: Plug in normally
Mono:   Hold [Screen] while plugging in
```

### Important CCs
```
CC 1-2:  Parameters 1-2
CC 3:    Filter Cutoff
CC 4:    Filter Resonance
CC 5-8:  Envelope ADSR
CC 9-10: LFO Depth/Speed
CC 13-14: FX Send 1-2
CC 16:   Volume
```

### Trig Setup
```
Set Trig OUT:
Hold (Shift) + Step + (Jump)[B] + [0]

Arm Track for Trig IN:
(Track) + (Shift) + [0] = Set length to 0 (arms)
```

### Rumble Module
```
+ button: Increase intensity
- button: Decrease intensity (min = off)
Latch: Clockwise = ON, CCW = OFF
Works with 10-150Hz bass frequencies
```

---

## Practice Goals Checklist

By the end of this week, you should be able to:

- [ ] Safely install and remove OP-Z modules
- [ ] Configure global MIDI settings
- [ ] Control OP-Z from external MIDI keyboard
- [ ] Sequence external synths via MIDI with CC automation
- [ ] Connect and configure CV/Gate for modular systems
- [ ] Create melodic sequences on modular synth via CV
- [ ] Use CV2/CV3 for parameter modulation
- [ ] Route stereo audio in via Line module
- [ ] Create alternate cue mixes with Line Out
- [ ] Build integrated hybrid setups combining MIDI, CV, and audio

---

## Troubleshooting Guide

### No MIDI Response
- Check [Screen] + [Tempo] - is Incoming MIDI enabled (Key 2)?
- Verify MIDI channels match between devices
- For Oplab: Check "IN" switch set to MIDI position
- For USB: Try powered USB hub

### No CV Output
- Verify Oplab switches: CV and GATE both UP
- Check cables are TRS or breakout to access Ring connections
- Try different modular input (some expect different voltage ranges)
- Test with simple oscillator pitch input first

### Line Module No Sound
- Press (Shift) + [4] to toggle Line IN active
- Check input level: (Shift) x3 + {Red} dial
- Verify [Screen] held shows connector LED lit
- Check cable is TRS stereo, not TS mono

### Ground Loop Hum with Line Module
- Use audio isolator transformer on Line IN or OUT
- Ensure all gear shares same power outlet/strip
- Try lifting ground on one device (use ground lift adapter)

### External Clock Issues
- Enable MIDI Clock In: [Screen] + [Tempo] + Key [4]
- Check step buttons turn GREEN (not white) when locked
- Verify external device sends MIDI clock (not just notes)
- Start external device before pressing (Play) on OP-Z

---

## Next Steps

Now that you've mastered OP-Z modules and connectivity:

- **Week 13:** Explore performance mode and punch-in effects
- **Integration Projects:** Build complete hybrid setups with modular, MIDI synths, and effects
- **Advanced Routing:** Create complex feedback loops with Line module
- **MIDI Mapping:** Customize midi.json for specific hardware presets

---

**Remember:** Always power OFF before connecting/disconnecting modules. Label your Oplab connections on the rear panel - you'll thank yourself later!

**Pro Tip:** Keep the dummy module screwdriver pegs assembled as a stand - perfect for desktop sessions!
