# OP-Z Overview - Weekly Curriculum

## Overview
This week establishes your foundational knowledge of the OP-Z. You'll learn the physical layout, understand the notation system used throughout your learning journey, grasp the project hierarchy, and connect the companion app. By the end, you'll navigate confidently without looking at reference materials.

## Prerequisites
- OP-Z device (charged)
- USB-C cable for charging
- Smartphone/tablet with OP-Z app installed (iOS, Android, or desktop)
- Headphones or speakers (3.5mm jack)

## Learning Objectives
By the end of this week, you will be able to:
- [ ] Power on/off and check battery status without hesitation
- [ ] Identify all buttons, encoders, and their primary functions by touch
- [ ] Read and understand button notation: (Button), [Index], {Dial}
- [ ] Explain the Project > Pattern > Track hierarchy
- [ ] Connect the OP-Z app via Bluetooth
- [ ] Navigate between app pages using the OP-Z hardware

---

## Day 1: Physical Orientation
**Focus:** Get hands-on with the hardware layout
**Time:** 20 minutes

### Hardware Layout Reference
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ○                                                                          │
│ POWER                                                                       │
│                    ┌───┐   ┌───┐   ┌───┐   ┌───┐                           │
│                    │{G}│   │{B}│   │{Y}│   │{W}│   ← ENCODERS              │
│                    └───┘   └───┘   └───┘   └───┘     (colored dials)       │
│         ┌───┐ ┌───┐ ┌───┐ ┌───┐                                            │
│         │[P]│ │[M]│ │[T]│ │[S]│   ← INDEX BUTTONS                          │
│         └───┘ └───┘ └───┘ └───┘     [P]roject [M]ixer [T]empo [S]creen     │
│                                                                             │
│  ┌───┐  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐ │
│  │TRK│  │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │13 │14 │15 │16 │ │
│  └───┘  │KCK│SNR│PRC│SMP│BAS│LED│ARP│CHD│FX1│FX2│TAP│MST│PRF│MOD│LGT│MOT│ │
│         └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘ │
│         └─── DRUM ────┘└─── SYNTH ───┘└───────── CONTROL ─────────────┘    │
│                                                                             │
│  ┌───┐  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐ │
│  │REC│  │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │ F │ G │ A │ B │ C │ D │E│
│  ├───┤  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘ │
│  │PLY│  └────── VALUE KEYS (black) ───────┘└──── COMPONENT KEYS (white) ──┘│
│  ├───┤                                                                      │
│  │STP│        ┌───┐ ┌───┐                                                  │
│  └───┘        │ - │ │ + │  ← TRANSPOSE                                     │
│               └───┘ └───┘                                                   │
│                          ┌───┐                                              │
│                          │SHF│  ← SHIFT                                    │
│                          └───┘                                         ◄──┐│
│                                                               USB-C ───┘  ││
│                                                               3.5mm ──────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Key Concepts
The OP-Z has no screen - everything communicates through LEDs and button feedback. Your fingers need to learn the layout.

**Four zones to memorize:**
1. **Left side:** Power/volume dial (yellow)
2. **Top row:** 4 index buttons [P] [Mixer] [Tempo] [Screen]
3. **Middle section:** 4 colored encoders (parameter dials)
4. **Bottom rows:** Track/step buttons (1-16) and keyboard keys

### Hands-On Exercise
1. **Power on:** Rotate the yellow dial clockwise until it clicks - watch the LED startup animation
2. **Check battery:** Hold [Screen] - count the green LEDs (each = ~6% battery)
3. **Find the index buttons:** With eyes closed, locate each one by feel:
   - [P] - leftmost, for projects
   - [Mixer] - second, for levels
   - [Tempo] - third, for BPM
   - [Screen] - rightmost, for app control
4. **Locate the transport:** Find (Rec), (Play), (Stop) - they're in a row on the left
5. **Feel the encoders:** The 4 colored dials at top - they're endless (no stop point)

### Practice Challenge
With your eyes closed:
- Power on the OP-Z
- Press (Play) to start playback
- Press (Stop) to stop
- Check battery level
- Power off

**Checkpoint:** Can you do all 5 actions without looking? If not, repeat until confident.

---

## Day 2: The Notation System
**Focus:** Learn to read OP-Z instructions fluently
**Time:** 15 minutes

### Key Concepts
The OP-Z community uses consistent notation. Master this and every tutorial becomes readable:

| Notation | Meaning | Example |
|----------|---------|---------|
| (Button) | Face buttons | (Play), (Track), (Kick) |
| [Index] | Top index buttons | [P], [Mixer], [Tempo], [Screen] |
| {Color} | Colored encoders | {Red}, {Green}, {Blue}, {Yellow} |
| + | Simultaneous press | (Track) + (Kick) = hold Track, press Kick |

### Index Buttons Reference
```
┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
│  P  │  │ III │  │  ♪  │  │  ▢  │
│     │  │     │  │     │  │     │
│ [P] │  │[MIX]│  │[TMP]│  │[SCR]│
└─────┘  └─────┘  └─────┘  └─────┘
Project   Mixer    Tempo    Screen
```

### Encoder Reference
```
    {Green}    {Blue}    {Yellow}   {White}
    ┌───┐      ┌───┐      ┌───┐      ┌───┐
    │ ◉ │      │ ◉ │      │ ◉ │      │ ◉ │
    └───┘      └───┘      └───┘      └───┘
    Page 1     Page 2     Page 3     Page 4
```

**Button press types:**
- **Press** = quick tap
- **Hold** = sustained press
- **Hold + Press** = hold first button, tap second

### Hands-On Exercise
Translate and execute these commands:

1. `[Screen]` - Press the Screen index button
2. `(Play)` - Press Play
3. `(Track) + Step (1)` - Hold Track, press the first step button (Kick)
4. `{Red}` - Turn the red encoder (leftmost)
5. `[P] + (1)` - Hold P, press key 1 (selects Project 1)

### Practice Challenge
Execute this sequence from notation only:
```
1. (Play)
2. (Track) + (Kick)
3. {Green} - turn slowly
4. (Stop)
5. [Screen] - hold to check battery
```

**Checkpoint:** Did you execute all 5 without hesitation? The notation should feel natural now.

---

## Day 3: Project Structure
**Focus:** Understand the hierarchy that organizes everything
**Time:** 25 minutes

### Key Concepts
The OP-Z organizes music in a clear hierarchy:

```
PROJECT (like a song - 10 total)
  └── PATTERN (16 per project)
        └── TRACK (16 per pattern)
              └── STEPS (16 per track, sequenced)
                    └── SOUNDS (10 plugs with presets)
```

**Track Groups:**
- **Drum Group (1-4):** Kick, Snare, Perc, Sample
- **Synth Group (5-8):** Bass, Lead, Arp, Chord
- **Control Group (9-16):** FX, Tape, Master, Performance, Module, Lights, Motion

### Track Layout Reference
```
STEP:    1     2     3     4     5     6     7     8
       ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
TRACK: │KCK│ │SNR│ │PRC│ │SMP│ │BAS│ │LED│ │ARP│ │CHD│
       └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘
       └──── DRUMS ─────┘ └────── SYNTHS ──────────┘

STEP:    9    10    11    12    13    14    15    16
       ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
TRACK: │FX1│ │FX2│ │TAP│ │MST│ │PRF│ │MOD│ │LGT│ │MOT│
       └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘
       └──────────────── CONTROL ────────────────────┘
```

### Hands-On Exercise

**Select a Project:**
1. Hold [P]
2. Press a black key (1-0) to select project 1-10
3. Release [P]

**Select a Pattern:**
1. Hold [P]
2. Press a step button (1-16) to select pattern
3. Release [P]

**Select a Track:**
1. Hold (Track)
2. Press a step button to select that track:
   - Step 1 = Kick drum
   - Step 5 = Bass synth
   - Step 12 = Master
3. Release (Track)

**Navigate while playing:**
1. Press (Play)
2. Hold (Track) + (Kick) - you're now on the kick track
3. Hold (Track) + (Bass) - switched to bass
4. Press (Stop)

### Practice Challenge
Navigate to: **Project 2, Pattern 3, Lead Track**
```
1. [P] + (2) - select project 2
2. [P] + Step (3) - select pattern 3
3. (Track) + (Lead) - select lead track (step 6)
```

**Checkpoint:** Can you navigate to any Project/Pattern/Track combination in under 5 seconds?

---

## Day 4: App Connection
**Focus:** Connect and navigate the companion app
**Time:** 20 minutes

### Key Concepts
The OP-Z app serves as your screen, showing:
- Visual parameter feedback
- Sequencer grid
- Sound configuration
- Motion/Photomatic visuals

Connection uses Bluetooth 5.0 LE - low power, wireless.

### Hands-On Exercise

**Connect via Bluetooth:**
1. Power on OP-Z
2. Open the OP-Z app on your device
3. Find the **pairing button** on the underside of OP-Z (small, near the back)
4. Press it - LED flashes **blue**
5. In app: tap "SCAN" on the Devices page
6. Select your OP-Z when it appears
7. LED turns **green** (pairing), then **off** (connected)

**Navigate App Pages from OP-Z:**
1. Hold [Screen]
2. Turn {Red} encoder - pages scroll left/right
3. Release [Screen] when desired page is centered

**App Pages to find:**
- Main OP-Z page (track parameters)
- Configurator (sound pack management)
- Photomatic (photo sequencing)
- Motion (animation display)
- Devices (connection status)
- MIDI Setup

### Practice Challenge
1. Connect to the app
2. Navigate to the Configurator page using only the OP-Z
3. Navigate to the Motion page
4. Return to the main OP-Z page
5. Disconnect and reconnect

**Checkpoint:** Can you connect and navigate to any app page within 30 seconds?

---

## Day 5: Integration & Muscle Memory
**Focus:** Combine everything into fluid operation
**Time:** 25 minutes

### Mini-Project: The Navigation Drill
You'll perform a complete navigation sequence that tests everything learned this week.

**The Challenge:**
Starting from powered off, complete this sequence as fast as possible:

1. Power on
2. Check battery level
3. Connect to app
4. Navigate to Project 3, Pattern 5
5. Select the Chord track (Track 8)
6. Open Configurator in app (using OP-Z controls)
7. Return to main OP-Z app page
8. Select the Kick track
9. Press Play - let it run for 4 bars
10. Stop and power off

**Target time:** Under 2 minutes

### Troubleshooting Tips

| Problem | Solution |
|---------|----------|
| App won't connect | Press pairing button again, ensure Bluetooth is on |
| No sound | Check volume dial (rotate clockwise), check headphone connection |
| Wrong project selected | [P] shows current project with lit LED |
| Confused which track | Hold (Track) - lit LED shows current track |
| Battery draining while connected to USB | Press [Screen] + (E) to toggle USB charging |

### Pro Tips
- The OP-Z auto-saves everything - no need to manually save
- USB charging can add noise to audio - disable it when performing
- Tilt OP-Z vertical to access microphone functions
- The motion LED (step 16) flashes when charging while off

---

## Quick Reference Card

| Action | Button Combo |
|--------|--------------|
| Power On | Yellow dial clockwise (click) |
| Power Off | Yellow dial counter-clockwise (click) |
| Check Battery | Hold [Screen] |
| Select Project | [P] + black key (1-0) |
| Select Pattern | [P] + step (1-16) |
| Select Track | (Track) + step (1-16) |
| Play | (Play) |
| Stop | (Stop) |
| Record | (Rec) |
| App Navigation | Hold [Screen] + turn {Red} |
| Toggle USB Charging | [Screen] + (E) |

### Keyboard Layout
```
VALUE KEYS (black) - Select Projects 1-0, Sound Plugs
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

COMPONENT KEYS (white) - Notes F-E, Step Components
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ F │ G │ A │ B │ C │ D │ E │ F │ G │ A │ B │ C │ D │ E │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

## Next Steps
You're ready for **Chapter 2: Getting Started** which covers:
- Deep dive into Projects and Patterns
- Track types in detail
- Keyboard playing techniques
- Transport controls and tempo settings

Move on when you can complete Day 5's drill in under 2 minutes with confidence.
