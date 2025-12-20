# OP-Z Audio & Sampling - Week 8 Curriculum

## Overview
Master the OP-Z's comprehensive audio input and sampling capabilities. Learn to record drum kits and tonal instruments directly on the device, edit samples with precision, and integrate external audio sources into your productions.

**Duration**: 5 days, 15-30 minutes per session
**Prerequisites**: Familiarity with basic OP-Z operation, track selection, and sequencing

---

## Day 1: Audio Input Sources & Module Track (20 minutes)

### Learning Objectives
- Understand all available audio input sources
- Navigate the Module Track I/O controls
- Monitor and adjust audio input levels

### Exercises

#### Exercise 1: Audio Input Connection Tour (8 minutes)

Explore all three audio input methods:

1. **Internal Microphone** (default):
   - Place OP-Z flat horizontally - Mic LED should be OFF
   - Tilt OP-Z vertically (power switch facing up) - Mic LED illuminates GREEN
   - While vertical: Press [Screen] to enable mic (LED turns RED)
   - Use [P] to increase mic volume, [Mixer] to decrease
   - Use [Tempo] to cycle through FX: Off → FX1 (Delay) → FX2 (Reverb) → Both

2. **USB Audio Input**:
   - Connect OP-Z to computer via USB-C
   - On Mac: System Preferences → Sound → Output → Select "OP-Z, USB"
   - On PC: Control Panel → Sound → Playback → Set "OP-Z" as Default
   - Play audio from computer and listen through OP-Z

3. **TRRS Headset** (if available):
   - Connect M1 headset to 3.5mm jack
   - Press yellow button on headset to activate mic (Mic LED turns ORANGE)
   - Internal mic automatically disabled when headset connected

#### Exercise 2: Module Track I/O Control (12 minutes)

```
ASCII OP-Z Layout - Module Track Focus:

    ┌─────────────────────────────────────────┐
    │  P   ◀  ▶  ⊡    ⟳ ⟳ ⟳ ⟳    ◉  ▶  ⊡  ⊠ │
    │       ████                               │
    │                                          │
    │ OP-Z                                     │
    │                                          │
    │ ①  ②  ③  ④  ⑤  ⑥  ⑦  ⑧  ⑨  ⑩  ⑪  ⑫   │
    │ ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○    │
    │ Ⓕ  Ⓖ  Ⓐ  Ⓑ  Ⓒ  Ⓓ  Ⓔ  Ⓕ  Ⓖ  Ⓐ  Ⓑ  Ⓒ   │
    │ ◉  ⊞  ⊕  ⊙  ①  ⑦  ♪  ≋  ⊡  ⊞  ◈  ▣  ★  ◉  ⊕  ⊠  │
    │                                     [E]  │
    └─────────────────────────────────────────┘
```

1. Access Module Track I/O page:
   - Press (Track) + [E] (IO Module track)

2. Cycle through parameter pages:
   - Press (Shift) repeatedly to cycle pages
   - Observe rotary dial LED colors change:
     - WHITE LEDs = Page 1: Filter (P1, P2, Filter, Resonance)
     - GREEN LEDs = Page 2: P5-P8 Macros
     - PURPLE LEDs = Page 3: LFO controls
     - YELLOW LEDs = Page 4: FX Send, Pan, Volume

3. Practice adjusting audio input on Page 4 (Yellow):
   - Press (Shift) until {Yellow} LEDs illuminate
   - Turn {Red} dial to adjust input Volume (0-100)
   - Turn {Yellow} dial to adjust Pan (-50 Left to +50 Right)
   - Turn {Green} dial for FX1 Send amount
   - Turn {Blue} dial for FX2 Send amount

4. Apply filter to incoming audio (White page):
   - Press (Shift) until {White} LEDs illuminate
   - Turn {Yellow} dial to adjust Filter cutoff
   - Turn {Red} dial to adjust Resonance

#### Practice Challenge
Set up a simple vocal monitoring chain:
- Tilt OP-Z vertical to activate internal mic
- Access Module Track: (Track) + [E]
- Navigate to Yellow page: Press (Shift) until yellow LEDs
- Set Pan to center: Turn {Yellow} to middle position (LED should be neutral)
- Add reverb: Turn {Blue} dial halfway
- Speak/sing into mic and adjust {Red} volume dial for comfortable monitoring

---

## Day 2: Drum Track Sampling Workflow (25 minutes)

### Learning Objectives
- Create and prepare blank sample slots
- Record drum samples using sampling mode
- Understand the 12-second drum sample slice structure

### Exercises

#### Exercise 1: Preparing a Sample Slot (7 minutes)

```
Sample Slot Preparation Sequence:

    [P] + (1)-(0)  →  (Track) + (empty slot)
       ↓                     ↓
  Select Project      Hold for 3 seconds
                             ↓
              ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯
              ●→→→→→→→→→→→→→→→●
              Step LEDs animate LEFT to RIGHT
                             ↓
                    Slot ready (flashing)
```

1. Select Project 1:
   - Press [P] + (1)

2. Create blank user slot in Track 1 (Kick):
   - Press (Track) button (hold it)
   - While holding (Track), press and HOLD value key (3) - an empty slot
   - Keep both pressed for 3 seconds
   - Watch step button LEDs animate LEFT to RIGHT
   - When complete, value key (3) will FLASH = ready for recording

3. Repeat for additional tracks:
   - Track 2 (Snare): (Track) + (4) held for 3 seconds
   - Track 3 (Perc): (Track) + (5) held for 3 seconds

#### Exercise 2: First Drum Sample Recording (18 minutes)

Record a simple 4-sound percussion kit:

1. **Enter Sampling Mode**:
   - Ensure Kick track selected: (Track) + ①
   - Select your prepared slot: (Track) + (3)
   - Enter sampling mode: (Stop) + (Rec) ← press in this order
   - Step buttons show GREEN/BLUE, component key FLASHES WHITE

2. **Select Audio Input**:
   - Hold (Play) to see available inputs (lit on value keys)
   - Internal mic is default (1) - already selected
   - Release (Play)

3. **Preview Input**:
   - Press (Play) to toggle monitoring ON (button lit white)
   - Step buttons show GREEN LEDs indicating audio level
   - Make some sound - clap, tap desk, snap fingers
   - Press (Play) again to stop monitoring

4. **Adjust Input Gain**:
   - Hold (Play) to view current gain
   - Step button ④ lit YELLOW = 0dB (default, good starting point)
   - To increase: Hold (Play) + press Step ⑦ (higher gain)
   - To decrease: Hold (Play) + press Step ② (lower gain)

5. **Record Your First Sample**:
   ```
   Recording Timer (12 seconds max):

   Hold (Rec)  →  ①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯
                  ●●●●●●●●●●●●●●●●
                  RED LEDs count down 12 seconds

   Release (Rec) anytime to stop early
   ```

   - Hold (Rec) button
   - RED step LEDs illuminate in sequence (each = ~0.75 seconds)
   - Perform 4 distinct sounds evenly spaced:
     - Second 0-3: Clap
     - Second 3-6: Desk tap
     - Second 6-9: Snap
     - Second 9-12: Vocal "tss"
   - Release (Rec) when done or let it complete 12 seconds

6. **Play Sample Slices**:
   ```
   24-Key Keyboard Layout:

   ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ⑪ ⑫
   Ⓕ Ⓖ Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓐ Ⓑ Ⓒ

   Sample automatically sliced across 24 keys
   Keys ①-④ should contain your 4 sounds
   ```

   - Press keyboard keys Ⓕ, Ⓖ, Ⓐ, Ⓑ to hear your sounds
   - Each key plays different slice of the 12-second recording

7. **Exit Sampling Mode**:
   - Press (Stop)

#### Practice Challenge
Record a beatbox pattern:
- Prepare new slot: (Track) + (6) held
- Enter sampling mode: (Stop) + (Rec)
- Record 12-second beatbox: kick, snare, hi-hat sounds
- Exit and play back slices on keyboard
- Create a simple 4-step pattern using your beatbox sounds

---

## Day 3: Drum Sample Editing (30 minutes)

### Learning Objectives
- Adjust sample slice start/end points
- Modify slice pitch, gain, and direction
- Set playback modes (Gate, Trigger, Loop)

### Exercises

#### Exercise 1: Slice Trimming & Control Layout (15 minutes)

```
Sampling Mode Controls - Primary (White LEDs):

{Green}      {Blue}       {Yellow}     {Red}
 Start        End          Pitch        Gain
  ●            ●            ●            ●
  ○            ○            ○            ○

 0-100%      0-100%      -50 to +50   -24 to +24


Sampling Mode Controls - Secondary (Yellow LEDs):
Press (Shift) to toggle

{Green}      {Blue}       {Yellow}     {Red}
Not Used    Not Used     Direction     Mode
  ●            ●            ●            ●
  ○            ○            ○            ○

              Normal/     Gate/Trigger/
              Reverse        Loop
```

1. **Load yesterday's drum sample**:
   - Select Kick track: (Track) + ①
   - Select your sample slot: (Track) + (3)
   - Enter sampling mode: (Stop) + (Rec)

2. **Select first slice to edit**:
   - Press keyboard key Ⓕ (your clap sound)
   - Key lights up showing current selection

3. **View slice markers on step buttons**:
   ```
   Step Button Indicators:
   ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ⑪ ⑫ ⑬ ⑭ ⑮ ⑯
   ●                 ●
   ↑                 ↑
   GREEN = Start     BLUE = End
   ```

4. **Adjust slice boundaries**:
   - Ensure PRIMARY mode (white LEDs on dials)
   - Turn {Green} dial slowly to move start point
   - Turn {Blue} dial slowly to move end point
   - Step buttons update showing new GREEN/BLUE positions
   - Press Ⓕ repeatedly to hear result

5. **Trim a tight clap sound**:
   - Turn {Green} dial right to remove silence before clap
   - Turn {Blue} dial left to cut off tail
   - Goal: shortest possible clean clap

6. **Adjust pitch**:
   - Keep on PRIMARY mode
   - Turn {Yellow} dial for fine pitch adjustment
   - {Yellow} LED shows GREEN when at 0 (original pitch)
   - Or use (-) / (+) buttons for half-note steps
   - Try pitching clap down 5 semitones: Press (-) 5 times

7. **Adjust gain**:
   - Turn {Red} dial to adjust slice volume
   - {Red} LED shows GREEN at 0dB (unity)
   - Increase if clap too quiet relative to other sounds

#### Exercise 2: Playback Modes & Direction (15 minutes)

1. **Access Secondary controls**:
   - Press (Shift) to toggle to YELLOW LED mode
   - Dial LEDs should now glow yellow

2. **Change playback direction**:
   - Select your snap sound: Press keyboard Ⓐ
   - Turn {Yellow} dial:
     - GREEN LED = Normal forward playback
     - BLUE LED = Reverse playback
   - Press Ⓐ to hear reversed snap

3. **Set playback modes**:
   ```
   Playback Modes ({Red} dial - Secondary):

   TRIGGER (Blue LED):  ─────────→│
                        Plays to end even when key released

   GATE (Green LED):    ─────→│ (key held)
                        Stops when key released

   LOOP (Yellow LED):   ─────→┐
                              └→┘  (while key held)
                        Loops continuously
   ```

   - Turn {Red} dial on secondary mode:
     - BLUE LED = Trigger (one-shot)
     - GREEN LED = Gate (stops on release)
     - YELLOW LED = Loop (repeats)

4. **Experiment with modes**:
   - Select your "tss" hi-hat sound
   - Set to LOOP mode: Turn {Red} until YELLOW LED
   - Press and HOLD the key - sound loops
   - Try GATE mode - sound stops when key released

#### Practice Challenge
Create a reverse cymbal effect:
- Select a slice with the longest tail
- Switch to Secondary mode: Press (Shift)
- Set direction to Reverse: Turn {Yellow} until BLUE LED
- Set mode to Trigger: Turn {Red} until BLUE LED
- Exit sampling mode: Press (Stop)
- Sequence the reverse sound before a downbeat

---

## Day 4: Synth Track Sampling (25 minutes)

### Learning Objectives
- Record tonal synth samples (6 seconds)
- Set sample start/end and loop points
- Create chromatic playable instruments

### Exercises

#### Exercise 1: Recording Tonal Samples (12 minutes)

```
Synth Sample Mapping (6 seconds, chromatic):

Keyboard:  Ⓕ  Ⓖ  Ⓐ  Ⓑ  Ⓒ  Ⓓ  Ⓔ  Ⓕ  Ⓖ  Ⓐ...
Pitch:     F  G  A  B  C  D  E  F  G  A...
                     ↑
              Root note = A (440Hz)
              Sample plays at original pitch
```

1. **Prepare synth slot**:
   - Select Bass track: (Track) + ⑤
   - Create new slot: Hold (Track) + (6) for 3 seconds
   - Step LEDs animate, slot (6) flashes when ready

2. **Enable test tone for tuning reference**:
   - Enter sampling mode: (Stop) + (Rec)
   - Press (Track) button to toggle test tone ON
   - You'll hear 440Hz tone (note A)
   - Hold (Track) + Turn {Green} dial to adjust tone volume

3. **Record a vocal tone**:
   - Tilt OP-Z vertical to activate internal mic
   - Preview: Press (Play) to monitor
   - Match the 440Hz test tone with your voice
   - Press (Track) to turn off test tone
   - Hold (Rec) for 6 seconds
   - Sustain your vocal tone "Aahhh" at A440 pitch
   - RED LEDs count down 6 seconds
   - Release (Rec) when done

4. **Test chromatic playback**:
   - Press (Stop) to exit sampling mode
   - Play keyboard chromatically
   - Your voice pitched across 2 octaves!

#### Exercise 2: Setting Loop Points (13 minutes)

```
Synth Sample Structure:

Primary Mode (White LEDs):
① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ⑪ ⑫ ⑬ ⑭ ⑮ ⑯
●                                 ●
↑GREEN = Sample Start    BLUE = Sample End↑


Secondary Mode (Yellow LEDs):
① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩ ⑪ ⑫ ⑬ ⑭ ⑮ ⑯
        ●               ●
        ↑GREEN           ↑BLUE
    Loop Start      Loop End

Playback: [Note On]──[Sample]──┐
                                └→[Loop]→┘
```

1. **Enter sampling mode**:
   - (Track) + ⑤ to select Bass track
   - (Track) + (6) to select your vocal sample
   - (Stop) + (Rec) to enter sampling mode

2. **Trim sample boundaries (Primary mode)**:
   - Ensure WHITE LEDs on dials
   - Turn {Green} dial to set sample start (remove breath noise)
   - Turn {Blue} dial to set sample end (trim tail)
   - Step buttons show GREEN start, BLUE end markers

3. **Set loop points (Secondary mode)**:
   - Press (Shift) to switch to YELLOW LED mode
   - Step buttons now show different GREEN/BLUE markers (loop points)
   - Turn {Green} dial to set loop start point
     - Position this after initial attack, in sustained portion
   - Turn {Blue} dial to set loop end point
     - Keep some sustain area for smooth looping
   - Goal: seamless loop during sustained tone

4. **Test sustain**:
   - Exit sampling mode: Press (Stop)
   - Press and HOLD keyboard key Ⓐ
   - Listen for smooth loop during sustain
   - Re-enter sampling mode if loop clicks

#### Practice Challenge
Create a melodic instrument:
- Prepare new Bass track slot
- Use test tone: Press (Track) in sampling mode
- Whistle or hum a pure tone at 440Hz for 6 seconds
- Set tight loop points for smooth sustain
- Compose a simple melody using your custom instrument

---

## Day 5: USB Sampling & Sample Pack Integration (30 minutes)

### Learning Objectives
- Sample audio from computer via USB
- Install third-party sample packs
- Understand sample pack file structure

### Exercises

#### Exercise 1: USB Audio Sampling (15 minutes)

```
USB Audio Connection:

┌──────────────┐         USB-C
│   Computer   │◄──────────────┐
│              │                │
│ Audio Output │         ┌──────┴──────┐
│ Set to OP-Z  │         │    OP-Z     │
└──────────────┘         │             │
                         │  Sampling   │
                         │    Mode     │
                         └─────────────┘
```

1. **Configure computer audio**:
   - Connect OP-Z to computer via USB-C
   - **On Mac**: System Preferences → Sound → Output → "OP-Z, USB"
   - **On PC**: Control Panel → Sound → Playback → "OP-Z" → Set Default

2. **Prepare sample slot**:
   - Select Snare track: (Track) + ②
   - Create slot: Hold (Track) + (7) for 3 seconds

3. **Enter sampling mode**:
   - (Stop) + (Rec)

4. **Select USB input**:
   - Hold (Play) to view inputs
   - Press value key (3) for USB audio
   - Release (Play)

5. **Sample from computer**:
   - On computer: Play a drum loop, song, or sound
   - On OP-Z: Press (Play) to preview - you should hear computer audio
   - Adjust gain if needed: Hold (Play) + Step buttons
   - Hold (Rec) to record 12 seconds
   - Capture drum loop or musical phrase
   - Release when done

6. **Play sampled material**:
   - Press (Stop) to exit sampling mode
   - Play keyboard to trigger slices of computer audio

#### Exercise 2: Installing Sample Packs (15 minutes)

```
OP-Z Content Mode File Structure:

OP-Z (Disk)
├── bounces
├── config
├── projects
├── rejected
└── samplepacks
    ├── 1-kick
    │   ├── 01 (Factory: ~AlainKicks.aif - 0 bytes)
    │   ├── 02 (Empty - ready for samples)
    │   ├── 03 (User: MyKicks.aif - 836KB)
    │   └── 04-10...
    ├── 2-snare
    ├── 3-perc
    ├── 4-fx
    ├── 5-bass
    ├── 6-lead
    ├── 7-arpeggio
    └── 8-chord

Sample Requirements:
- Drum tracks (1-4): 12-second .aif files, sliced across 24 keys
- Synth tracks (5-8): 6-second .aif files, chromatic mapping
- One sample per slot
- Max 24MB total sample storage
```

1. **Enter Content Mode**:
   - Power OFF OP-Z
   - Hold (Track) button
   - While holding, power ON
   - Release (Track) when all track LEDs glow GREEN
   - Connect to computer via USB-C
   - OP-Z appears as external disk

2. **Navigate to sample packs folder**:
   - On computer, open OP-Z disk
   - Open `samplepacks` folder
   - You'll see folders: 1-kick, 2-snare, 3-perc, 4-fx, 5-bass, 6-lead, 7-arpeggio, 8-chord

3. **Identify empty slots**:
   - Open `1-kick` folder
   - Look for numbered folders: 01, 02, 03... 10
   - Empty slots contain no files
   - Factory samples show as ~name.aif (0 bytes)
   - User samples show with size (e.g., 836KB)

4. **Install a sample** (if you have compatible OP-1 format samples):
   - Find a compatible 12-second drum .aif file
   - Drag into an empty slot folder (e.g., `1-kick/05/`)
   - Or find a 6-second synth .aif file
   - Drag into synth track slot (e.g., `5-bass/08/`)

5. **Exit Content Mode**:
   - Eject OP-Z disk from computer
   - Or on OP-Z: Press (Play) while in content mode
   - Disconnect USB-C
   - Power cycle OP-Z

6. **Test new samples**:
   - Select track with new sample
   - Press (Track) + corresponding slot number
   - Play keyboard to test

#### Practice Challenge
Create a complete workflow:
- Sample a drum loop from your computer via USB
- Record a vocal melody into a synth track via internal mic
- Explore the content mode file structure
- Document which slots contain which samples for future reference

---

## Quick Reference Card

### Audio Input Selection
| Input | Activation | Indicator |
|-------|------------|-----------|
| Internal Mic | Tilt vertical + Press [Screen] | LED: Green (ready) / Red (active) |
| Headset Mic | Yellow button on headset or [Screen]+(2) | LED: Orange |
| USB Audio | Computer output set to OP-Z | [Screen]+(3) |

### Module Track I/O Access
```
(Track) + [E] → (Shift) cycles pages
  White: Filter | Green: P5-P8 | Purple: LFO | Yellow: FX/Pan/Vol
```

### Sampling Mode Quick Keys
| Action | Button Combo | Visual Feedback |
|--------|--------------|-----------------|
| Enter Sampling | (Stop) + (Rec) | Green/Blue steps, flashing component |
| Preview Input | (Play) | Green LEDs = input level |
| Check Gain | Hold (Play) | Yellow step LED shows current gain |
| Adjust Gain | Hold (Play) + Step ①-⑯ | Step ④ = 0dB |
| Record | Hold (Rec) | Red LEDs count down time |
| Toggle Test Tone | (Track) in sampling mode | 440Hz tone on/off |
| Exit Sampling | (Stop) | Return to normal mode |

### Sampling Controls (While in Sampling Mode)

**Primary Controls (White LEDs):**
```
{Green}          {Blue}           {Yellow}         {Red}
Start Point      End Point        Pitch            Gain
0-100%           0-100%           -50 to +50       -24dB to +24dB
                                  LED GREEN = 0    LED GREEN = 0dB
```

**Secondary Controls (Yellow LEDs) - Press (Shift):**
```
{Green}          {Blue}           {Yellow}         {Red}
[Synth: Loop     [Synth: Loop     Direction        Playback Mode
 Start]           End]
[Drum: N/A]      [Drum: N/A]      Normal/Reverse   Gate/Trigger/Loop
                                  Green/Blue       Green/Blue/Yellow
```

### Pitch Adjustment
- **Fine**: Turn {Yellow} dial (Primary mode)
- **Semitones**: Press (-) or (+) buttons

### Playback Modes (Drum Samples)
| Mode | Symbol | {Red} LED | Behavior |
|------|--------|-----------|----------|
| Trigger | → | Blue | Plays to end, ignores key release |
| Gate | → | Green | Stops when key released |
| Loop | ⟲ | Yellow | Loops while key held |

### Sample Slot Management
| Action | Command | Animation |
|--------|---------|-----------|
| Create Slot | Hold (Track) + empty (1)-(0) | LEDs animate LEFT→RIGHT 3 sec |
| Clear Slot | Hold (Track) + user (1)-(0) | LEDs animate RIGHT→LEFT 3 sec |
| Select Slot | (Track) + (1)-(0) | Selected slot flashes |

### Recording Times
- **Drum Tracks (1-4)**: 12 seconds → sliced across 24 keys
- **Synth Tracks (5-8)**: 6 seconds → chromatic mapping, root = A440

### Content Mode (File Management)
```
Power OFF → Hold (Track) → Power ON → Release when green
Path: OP-Z/samplepacks/[1-kick through 8-chord]/[01-10]/
Exit: Eject disk or Press (Play), then disconnect
```

### Step Button LED Indicators in Sampling Mode
| Color | Primary Mode | Secondary Mode |
|-------|--------------|----------------|
| GREEN | Sample/Slice Start | Loop Start (synth only) |
| BLUE | Sample/Slice End | Loop End (synth only) |
| RED | Recording timer | - |
| YELLOW | Input gain level | - |

### Copy/Paste Drum Slice
1. Select source slice: Press keyboard key
2. Paste to destination: (Shift) + destination key

### Common Workflows

**Quick Drum Recording:**
```
[P]+(1) → (Track)+empty slot (hold 3s) → (Stop)+(Rec) →
Hold (Rec) 12s → (Stop) → Play keys
```

**Quick Synth Recording:**
```
[P]+(1) → (Track)+empty slot (hold 3s) → (Stop)+(Rec) →
(Track) for test tone → Hold (Rec) 6s → (Stop) → Play melody
```

**USB Sampling:**
```
Computer audio → OP-Z → (Stop)+(Rec) →
Hold (Play) + (3) for USB → Hold (Rec) → (Stop)
```

---

## Tips & Best Practices

1. **Avoid Feedback**: Lower headphone volume or use headphones when recording with internal mic

2. **Optimal Recording Levels**: Aim for gain around 0dB (step button ④ when holding Play), adjust up/down as needed

3. **Clean Slices**: Trim silence from drum slice start/end points for tighter rhythms

4. **Smooth Loops**: For synth samples, set loop points in sustained portion, avoid attack transients

5. **Test Tone Tuning**: Use built-in 440Hz test tone to pitch-match vocal/acoustic recordings

6. **File Management**: Name sample files clearly before importing - OP-Z shows filenames in app

7. **Sample Pack Compatibility**: OP-Z uses OP-1 format; tools: op1.fun or Xfer OP-1 Drum Utility

8. **Storage Limit**: 24MB total - monitor sample pack sizes in content mode

9. **Factory Samples**: Indicated by tilde prefix (~name.aif) and 0 bytes - these are pointers, not deletable from device

10. **Rejected Folder**: When adding multiple samples to one slot, extras automatically move to `rejected` folder

---

## Week Completion Goals

By the end of this week, you should be able to:

- ✓ Select and monitor all three audio input sources
- ✓ Navigate the Module Track I/O and apply FX/filtering to input audio
- ✓ Create blank sample slots and manage user vs. factory samples
- ✓ Record 12-second drum samples and play back slices
- ✓ Edit drum slice boundaries, pitch, gain, direction, and playback modes
- ✓ Record 6-second synth samples with chromatic pitch mapping
- ✓ Set sample start/end points and loop points for sustained tones
- ✓ Sample audio from computer via USB connection
- ✓ Access Content Mode and navigate sample pack file structure
- ✓ Install compatible third-party sample packs

---

## Next Steps

**Week 9 Preview**: Performance & Live Control
- Punch-in effects and motion recording
- Performance mode techniques
- Step components and parameter locks
- Live muting and pattern switching
- Unity visual integration

**Further Exploration**:
- Create custom drum kits using household objects
- Record instrument samples and build chromatic synths
- Sample from vinyl records or tape for lo-fi textures
- Build sample packs with OP-1 tools for sharing
- Integrate OP-Z into DAW workflows for hybrid production

---

**Remember**: Sampling is the heart of the OP-Z's creative power. The ability to capture and manipulate audio anywhere makes this device a complete portable production studio. Experiment with unconventional sound sources - the world is your sample library!