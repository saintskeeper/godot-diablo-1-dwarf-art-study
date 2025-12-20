# Week 11: Motion & Visuals - OP-Z Curriculum

## Overview
This week explores the visual capabilities of the OP-Z, including DMX lighting control on Track 15, and Photomatic/Motion features on Track 16. These features transform the OP-Z from an audio sequencer into a complete audio-visual performance instrument.

**Required Equipment:**
- OP-Z
- OP-Z app (iOS/Android/Mac)
- Tablet or smartphone
- Optional: DMX lighting setup (USB hub, DMX interface, DMX fixture)
- Optional: HDMI output for projector/monitor

---

## Day 1: DMX Lights Track Fundamentals (15-20 minutes)

### Learning Objectives
- Understand DMX512 protocol basics
- Navigate Light Track modes
- Trigger basic light patterns

### Hands-On Practice

#### Exercise 1.1: Understanding the Lights Track
```
Hardware Signal Flow:
OP-Z → USB-C → Powered USB Hub → DMX Interface → DMX Fixture
        ↓
    (Power Pack)
```

**Recommended Hardware:**
- Kingston Nucleum USB Hub (USB-C with power distribution)
- Enttec DMX USB Pro Mk2 or Enttec DMX USB Pro
- DMX RGBW light fixture (8-channel)

#### Exercise 1.2: Selecting Light Track Modes
1. (Track) + [15] - Select lights track
2. (-) or (+) - Toggle between:
   - Fixture Preview Mode (LEDs animate)
   - Step Sequence Mode (LEDs static)

#### Exercise 1.3: Operating Lights Manually
1. (Track) + [15] - Select lights track
2. (-) or (+) - Select Fixture Preview mode
3. (1) through (0) - Select preset light patterns
4. Press white component keys (F) through (E) - Trigger light effects
5. Observe how your DMX fixture responds

**Practice Routine:**
- Spend 5 minutes cycling through all 10 preset patterns
- Spend 5 minutes trying different component key effects
- Note: Effects depend on your DMX fixture's profile

#### Exercise 1.4: Step Sequencing Lights
1. (Track) + [15] - Select lights track
2. (-) or (+) - Toggle to Step View (no LED animation)
3. (1) - Select pattern 1
4. [1] + [5] + [9] + [13] - Program on downbeats
5. (Play) - Watch the sequence

**Challenge:** Create a 16-step light sequence with pattern changes every 4 steps

---

## Day 2: DMX Profiles & Light Controls (20-25 minutes)

### Learning Objectives
- Access and edit DMX profiles
- Understand channel mapping
- Control light parameters with encoders

### Hands-On Practice

#### Exercise 2.1: Accessing DMX Profile
1. Hold (Track) while powering ON OP-Z - Enter content mode
2. Connect OP-Z to computer
3. Navigate to: OP-Z → config → dmx.json
4. **IMPORTANT:** Backup dmx.json before editing
5. View file structure in text editor

**Default Profile Structure:**
```json
{
  "profiles": [
    {
      "name": "rgb",
      "channels": ["red", "green", "blue"]
    }
  ],
  "config": [
    { "fixture": 1, "profile": "rgb" }
  ]
}
```

#### Exercise 2.2: Understanding OP-Z Light Controls

**Primary Controls (White LEDs):**
```
{Green}          {Blue}           {Yellow}         {Red}
Main Color       Alternate Color  Pattern Speed    Intensity
Knob 1           Knob 2           Knob 3           Knob 4
```

**Secondary Controls (Yellow LEDs):**
- (Shift) to toggle to secondary page
- Knob 5-8 (currently unused in default profile)

#### Exercise 2.3: Live Light Performance
1. (Track) + [15] - Select lights track
2. Create basic 4-step sequence: [1] [5] [9] [13]
3. (Play)
4. While playing:
   - Turn {Green} - Change main color
   - Turn {Blue} - Switch alternate color
   - Turn {Yellow} - Adjust pattern scroll speed
   - Turn {Red} - Control intensity/dimming

**Practice Routine:**
- Create 3 different 16-step light patterns
- Practice smooth transitions between patterns using encoders
- Experiment with (Shift) + encoder combinations

#### Exercise 2.4: OP-Z Channel Types Reference

| Channel    | Range  | Description                    |
|------------|--------|--------------------------------|
| Red        | 0-255  | Red color                      |
| Green      | 0-255  | Green color                    |
| Blue       | 0-255  | Blue color                     |
| White      | 0-255  | White color                    |
| Intensity  | 0-255  | Intensity/dimmer               |
| Fog        | 0, 255 | Triggered by animation 14      |
| Knob 1-4   | 0-255  | Primary page encoders          |
| Knob 5-8   | 0-255  | Secondary page encoders        |

**Challenge:** Create a custom DMX profile for your specific light fixture

---

## Day 3: Photomatic Basics (25-30 minutes)

### Learning Objectives
- Switch between Motion and Photomatic
- Understand camera roll structure
- Capture and sequence images

### Hands-On Practice

#### Exercise 3.1: Photomatic Setup
```
System Architecture:
- 10 Camera Rolls (system-wide, not project-specific)
- 24 Media Slots per roll (mapped to keyboard F-E)
- Max video length: 10 seconds
- Formats: png, jpg, mp4, mov, gif
```

#### Exercise 3.2: Selecting Photomatic
1. Connect OP-Z to device running OP-Z app
2. (Track) + [16] - Select motion track
3. Hold [Screen] + turn color dial OR swipe app
4. Select PHOTOMATIC icon
5. Release [Screen] or tap to confirm

#### Exercise 3.3: Camera Roll Navigation
1. In app, tap "ROLL X" at bottom of screen
2. Swipe to view all 10 rolls
3. On OP-Z: (Shift) + (1) through (0) - Select rolls 1-10
4. Note: Rolls are global across all projects

#### Exercise 3.4: Capturing Photos with Device Camera
1. (Track) + [16] - Select photomatic
2. Select Roll 1: (Shift) + (1)
3. Tap screen to show menu
4. Tap yellow camera icon (top right)
5. Tap FLIP - Switch front/rear camera
6. Tap SNAP - Capture photo to current slot
7. Press (F) - Select next slot (slot 1)
8. Tap SNAP - Capture another photo
9. Repeat for 8 photos (slots F-C)

**Practice Routine:**
- Capture a series of photos telling a visual story
- Take photos of different objects, angles, or colors
- Try both front and rear camera

#### Exercise 3.5: Sequencing Photomatic
1. (Track) + [16] - Photomatic selected
2. Ensure Roll 1 is selected
3. Press (F) - Select first photo
4. [1] - Program photo on step 1
5. Press (G) - Select second photo
6. [5] - Program photo on step 5
7. Press (A) - Select third photo
8. [9] - Program photo on step 9
9. Press (B) - Select fourth photo
10. [13] - Program photo on step 13
11. (Play) - Watch your photo sequence

**Challenge:** Create a 16-step photo slideshow synchronized to a beat

---

## Day 4: Photomatic Effects & Image Controls (25-30 minutes)

### Learning Objectives
- Apply punch-in effects
- Use image adjustment controls
- Create parameter locks per step

### Hands-On Practice

#### Exercise 4.1: Photomatic Punch-In Effects

**Effect Map:**
```
(Shift) + White Component Keys = Punch-In Effects

(F) Previous Image    (4) Invert Colors    (B) Punch Zoom     (9) Kill Red
(G) Next Image        (5) Flip Horizontal  (7) White Out      (0) Kill Green
(A) Random Image      (6) Flip Vertical    (8) Black Out      (D) Kill Blue
(3) First Image                            (E) Sharpen
```

#### Exercise 4.2: Live Punch-In Performance
1. (Track) + [16] - Select photomatic
2. Create simple sequence with one photo on steps [1] [5] [9] [13]
3. (Play)
4. While playing, press and hold:
   - (Shift) + (4) - Invert colors (hold, then release)
   - (Shift) + (B) - Punch zoom effect
   - (Shift) + (7) - White out flash
   - (Shift) + (9) - Kill red channel

**Practice Routine:**
- Play sequence and trigger different effects on beat
- Practice smooth effect timing
- Try combining multiple effects

#### Exercise 4.3: Image Adjustment Controls

**Primary Page (White LEDs):**
```
{Green}      {Blue}        {Yellow}      {Red}
Hue          Saturation    Brightness    Contrast
Knob 1       Knob 2        Knob 3        Knob 4
```

**Secondary Page (Green LEDs):**
```
{Green}      {Blue}        {Yellow}      {Red}
Crossfade    Zoom          Double        Woozy
Knob 5       Knob 6        Knob 7        Knob 8
```

#### Exercise 4.4: Parameter Lock Image Adjustments
1. (Track) + [16] - Photomatic selected
2. Create 4-step sequence: [1] [5] [9] [13]
3. Hold [1] + turn {Green} - Adjust hue for step 1
4. Hold [5] + turn {Blue} - Adjust saturation for step 5
5. Hold [9] + turn {Yellow} - Adjust brightness for step 9
6. Hold [13] + turn {Red} - Adjust contrast for step 13
7. (Play) - Watch parameter locks in action

#### Exercise 4.5: Advanced Image Effects
1. Ensure sequence is playing
2. (Shift) - Switch to secondary encoder page (Green LEDs)
3. Turn {Green} (Knob 5) - Crossfade between images
4. Turn {Blue} (Knob 6) - Zoom in/out
5. Turn {Yellow} (Knob 7) - Double overlay effect
6. Turn {Red} (Knob 8) - Woozy distortion

**Practice Routine:**
- Create a sequence with varied parameter locks on each step
- Practice smooth encoder movements while sequence plays
- Experiment with extreme settings

**Challenge:** Create a photomatic sequence with:
- 8 different images
- Parameter locks on every step
- Live punch-in effects recorded

---

## Day 5: Motion Track & Video Connections (20-25 minutes)

### Learning Objectives
- Understand Unity/Videolab system
- Load and control videopaks
- Connect to external displays
- Integrate motion with audio tracks

### Hands-On Practice

#### Exercise 5.1: Selecting Motion Utility
1. Connect OP-Z to device with OP-Z app
2. (Track) + [16] - Select motion track
3. Hold [Screen] + turn color dial OR swipe in app
4. Select MOTION icon
5. Release [Screen] or tap to confirm

#### Exercise 5.2: Videopak Navigation
```
Videopak System:
- 10 videopak slots (alphabetically ordered)
- Factory videopaks: Decotora EP1, Z-Land EP1
- Community videopaks available
- ZPAK format for easy installation
```

**Videopak Selection:**
1. In app, tap videopak name at bottom
2. Swipe to view available videopaks
3. Tap to select a videopak
4. On OP-Z: (Shift) + (1) through (0) - Select first 10 videopaks

#### Exercise 5.3: Motion Effects & Scene Changes

**Scene Changes (Black Value Keys):**
- (1) through (0) - Change animation viewpoint/angle
- Effects are programmed per videopak

**Animation Effects (White Component Keys):**
- (F) through (E) - Trigger visual effects (14 total)
- Effects unique to each videopak

**Example - Decotora EP1 Effects:**
```
(F) Hue Drift              (C) Color Fades
(G) Vertical Scroll        (D) De-focus
(A) Split/Mirror/Rotate    (E) Monochrome
(B) Diffuse                (F) Greyscale
(C) 3D                     (G) Horizontal pixel bars
(D) Grain Kaleidoscope     (A) Halftone
(E) Scan Lines             (B) Color fades
(F) Greyscale              (C) Pixelate
```

#### Exercise 5.4: Sequencing Motion
1. (Track) + [16] - Motion selected
2. Select videopak (Shift) + (1) for slot 1
3. Press (1) - Scene change 1
4. [1] - Program on step 1
5. Press (F) - Effect 1
6. [5] - Program effect on step 5
7. Press (2) - Scene change 2
8. [9] - Program on step 9
9. (Play) - Watch animation sequence

**Practice Routine:**
- Create 16-step motion sequence
- Combine scene changes with effects
- Sync to audio playing on other tracks

#### Exercise 5.5: External Display Connection

**HDMI Connection Setup:**
```
OP-Z → Bluetooth → Device (iPhone/iPad/Mac)
                      ↓
                  Lightning → HDMI Adapter
                      ↓
                  Projector/Monitor/TV

Note: Menu options don't appear on external display
Only animation/photomatic output is transmitted
```

**Connection Steps:**
1. Connect Lightning to HDMI adapter to device
2. Connect HDMI cable from adapter to display
3. Open OP-Z app on device
4. Select Motion or Photomatic
5. (Play) sequence on OP-Z
6. External display shows full-screen output

**Recommended Adapter:**
- Apple Lightning to Digital AV Adapter (official)
- Third-party adapters may not work correctly

#### Exercise 5.6: Audio-Visual Integration
1. Create kick pattern on Track 1: [1] [5] [9] [13]
2. Create hi-hat pattern on Track 2: [1] [3] [5] [7] [9] [11] [13] [15]
3. (Track) + [16] - Select motion/photomatic
4. Create visual sequence aligned with kick: [1] [5] [9] [13]
5. Add visual effects on hi-hat beats
6. (Play) - Watch synchronized audio-visual performance

**Practice Routine:**
- Create complete project with audio tracks 1-14
- Add complementary light sequence on Track 15
- Add photomatic or motion on Track 16
- Practice live performance with all visual controls

**Challenge:** Create a complete audio-visual performance:
- 4 audio tracks
- 1 light sequence (Track 15)
- 1 photomatic or motion sequence (Track 16)
- Live performance with encoder tweaks

---

## Quick Reference Card

### Hardware Overview
```
OP-Z Top Panel - Tracks 15 & 16

┌─────────────────────────────────────┐
│  Encoders                   LEDs    │
│  {G} {B} {Y} {R}           ○ ○ ○ ○ │
│                                     │
│  Track Buttons                      │
│  [1][2][3]...[13][14][15][16]      │
│                           ▲   ▲     │
│                        Lights│      │
│                             Motion  │
└─────────────────────────────────────┘
```

### Track 15: Lights (DMX)

**Mode Selection:**
- (Track) + [15] - Select lights track
- (-) or (+) - Toggle Fixture Preview / Step Sequence

**Manual Control:**
- (1)-(0) - Select preset patterns
- (F)-(E) - Trigger light effects

**Sequencing:**
- [1]-[16] + (1)-(0) - Program pattern to step
- [1]-[16] + (F)-(E) - Program effect to step

**Encoders (Primary Page - White LEDs):**
- {Green} - Main Color (Knob 1)
- {Blue} - Alternate Color (Knob 2)
- {Yellow} - Pattern Speed (Knob 3)
- {Red} - Intensity (Knob 4)

**DMX Profile Access:**
- Hold (Track) + Power ON - Content mode
- Navigate to: config/dmx.json
- Backup before editing!

### Track 16: Photomatic

**Mode Selection:**
- (Track) + [16] - Select motion track
- Hold [Screen] + dial - Select PHOTOMATIC
- (Shift) + (1)-(0) - Select camera roll 1-10

**Media Selection:**
- (F)-(E) - Select media slot 1-24

**Sequencing:**
- [1]-[16] + (F)-(E) - Program media to step

**Punch-In Effects:**
- (Shift) + (F) - Previous image
- (Shift) + (G) - Next image
- (Shift) + (A) - Random image
- (Shift) + (3) - First image
- (Shift) + (4) - Invert colors
- (Shift) + (5) - Flip horizontal
- (Shift) + (6) - Flip vertical
- (Shift) + (B) - Punch zoom
- (Shift) + (7) - White out
- (Shift) + (8) - Black out
- (Shift) + (E) - Sharpen
- (Shift) + (9) - Kill red
- (Shift) + (0) - Kill green
- (Shift) + (D) - Kill blue

**Encoders (Primary - White LEDs):**
- {Green} - Hue (Knob 1)
- {Blue} - Saturation (Knob 2)
- {Yellow} - Brightness (Knob 3)
- {Red} - Contrast (Knob 4)

**Encoders (Secondary - Green LEDs):**
- (Shift) to toggle page
- {Green} - Crossfade (Knob 5)
- {Blue} - Zoom (Knob 6)
- {Yellow} - Double (Knob 7)
- {Red} - Woozy (Knob 8)

**Parameter Locks:**
- Hold [Step] + turn encoder - Lock parameter to step
- Hold (Rec) + (Stop) - Clear all parameter locks

### Track 16: Motion

**Mode Selection:**
- (Track) + [16] - Select motion track
- Hold [Screen] + dial - Select MOTION
- (Shift) + (1)-(0) - Select videopak 1-10

**Scene/Effect Control:**
- (1)-(0) - Change scene/angle
- (F)-(E) - Trigger animation effects

**Sequencing:**
- [1]-[16] + (1)-(0) - Program scene to step
- [1]-[16] + (F)-(E) - Program effect to step

**Encoders:**
- Controls are videopak-specific
- Typically control zoom, rotation, animation speed, colors
- Experiment with each videopak

### Camera Roll Structure
```
System-Wide (Not Project-Specific):
┌──────────────────────────────────┐
│ Roll 1  Roll 2  Roll 3 ... Roll 10│
│   ↓                               │
│ 24 Slots Each                    │
│ F F# G G# A A# B C C# D D# E F... │
└──────────────────────────────────┘
```

### Installing Videopaks (ZPAK Format)

**iOS/iPad:**
1. Download .zpak file
2. Tap file → Share → OP-Z app

**Mac:**
1. Download .zpak file
2. Open OP-Z app → Motion
3. Tap "CLICK TO IMPORT"
4. Select .zpak file

### DMX Channel Types (Default Profile)
| Channel   | Range | Description              |
|-----------|-------|--------------------------|
| red       | 0-255 | Red color                |
| green     | 0-255 | Green color              |
| blue      | 0-255 | Blue color               |
| white     | 0-255 | White color              |
| intensity | 0-255 | Intensity/dimmer         |
| fog       | 0,255 | Fog (animation 14)       |
| knob1-8   | 0-255 | Encoder controls         |

### Tips & Tricks

**Photomatic:**
- Max video length: 10 seconds
- Supported formats: png, jpg, mp4, mov, gif
- Camera rolls are shared across all projects
- Use parameter locks for dynamic image changes per step

**Motion:**
- Version compatibility is critical (Unity/Videolab/App)
- Videopak effects are unique per pak
- Encoder functions programmed per videopak
- Mac app can be CPU-intensive

**Lights:**
- DMX512 offers 512 channels (think MIDI for lights)
- TE recommends Kingston Nucleum hub + Enttec DMX interface
- Use powered USB hub to avoid draining OP-Z
- Profile must match your fixture's channel configuration

**External Video:**
- Use official Apple Lightning to HDMI adapter
- Menus don't appear on external display
- Connect device to projector/monitor via HDMI
- Full-screen output for performances

---

## Week Completion Checklist

- [ ] Connected DMX lighting hardware (if available)
- [ ] Created and sequenced light patterns on Track 15
- [ ] Edited or viewed DMX profile configuration
- [ ] Switched between Photomatic and Motion utilities
- [ ] Captured photos using device camera
- [ ] Created photomatic sequence with 8+ images
- [ ] Applied punch-in effects live
- [ ] Used parameter locks for image adjustments
- [ ] Selected and controlled motion videopaks
- [ ] Created integrated audio-visual project
- [ ] Connected device to external display (if available)
- [ ] Performed complete audio-visual sequence

## Next Steps

**Week 12 Preview:** Advanced performance techniques, project management, and putting it all together for a complete OP-Z performance.

**Additional Practice:**
- Explore community videopaks from synthpaks.com
- Create custom DMX profiles for your lighting setup
- Build themed photomatic rolls (nature, architecture, abstract)
- Practice synchronized audio-visual performances
- Experiment with Unity/Videolab for custom animations

---

**Remember:** The visual features of the OP-Z transform it from a synthesizer/sampler into a complete audio-visual performance instrument. Practice integrating visuals with your audio tracks for compelling live performances!
