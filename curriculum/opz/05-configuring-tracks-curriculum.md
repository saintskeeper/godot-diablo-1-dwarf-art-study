# Week 5: Configuring Tracks
## OP-Z Learning Curriculum

### Overview
This week focuses on mastering the Configurator app and customizing your OP-Z track configuration. You'll learn to load, move, and organize plugs (sample packs, synth engines, and effects) across all tracks to create setups tailored to your workflow.

**Key Concepts:**
- Plugs: Preset/patch elements including sample packs, synth engines, and effects
- Value Keys: The 10 slots (1-0) where plugs are loaded on each track
- Configurator: The OP-Z app tool for assigning plugs to slots
- Commit/Revert: Applying or canceling configuration changes

---

## Day 1: Understanding the Configurator (15 minutes)

### Learning Objectives
- Navigate to the Configurator in the OP-Z app
- Understand the Configurator interface layout
- Learn the relationship between value keys and plug slots

### Hands-On Exercise

**Exercise 1A: Opening the Configurator**
```
1. Connect OP-Z to your device with the app running
2. On OP-Z: Hold [Screen] + turn {Red}
   - Alternatively: Hold [Screen] + press any green-lit track key
3. Scroll options left/right until CONFIGURATOR is centered
4. Release [Screen] to select
```

**Exercise 1B: Exploring the Interface**
```
With Configurator open:

1. Observe the track name at top (starts with KICK)
2. Identify the 10 round slots representing value keys [1]-[0]
   - Filled slots show plug icons
   - Empty slots appear greyed with numbers
3. Locate the plug library at bottom
4. Find the +/- track navigation buttons
5. Notice the COMMIT and REVERT buttons
```

**Exercise 1C: Track Navigation**
```
Practice navigating tracks:

1. In app: Tap + to advance to SNARE track
2. In app: Tap - to return to KICK track
3. On OP-Z: Press track key [2] (Snare)
   - App updates to show SNARE track
4. On OP-Z: Press track key [1] (Kick)
   - App returns to KICK track
5. Navigate through all 8 audio tracks (tracks 1-8)
6. View FX tracks (9-10)
```

### ASCII Reference: Configurator Interface
```
┌─────────────────────────────────────────────────┐
│                    KICK                     +/- │
├─────────────────────────────────────────────────┤
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐            │
│  │ A │  │ B │  │ C │  │ D │  │ E │  [REVERT]  │
│  └───┘  └───┘  └───┘  └───┘  └───┘  [COMMIT]  │
│  Value Key Slots 1-5                            │
│                                                 │
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐            │
│  │ 6 │  │ 7 │  │ 8 │  │ 9 │  │ 0 │            │
│  └───┘  └───┘  └───┘  └───┘  └───┘            │
│  Value Key Slots 6-0                            │
│                                                 │
│  Library: [◀ PlugA PlugB PlugC PlugD ▶]        │
│           ├─────────┤                          │
│           Selected Plug                         │
└─────────────────────────────────────────────────┘
```

### Knowledge Check
- How do you access the Configurator?
- What do the 10 round slots represent?
- How can you navigate between tracks?

### Practice Notes
Document your observations about the default configuration:
- Which tracks have all 10 slots filled?
- Which have empty slots?
- What's the currently selected plug on the OP-Z for each track?

---

## Day 2: Loading Plugs to Slots (20 minutes)

### Learning Objectives
- Browse available plugs for each track
- Load new plugs into empty slots
- Replace existing plugs
- Commit changes to the OP-Z

### Hands-On Exercise

**Exercise 2A: Browsing the Library**
```
1. Open Configurator
2. Navigate to KICK track
3. In app: Swipe left/right across the plug library
4. Observe:
   - Z-Kicks (factory z-sound kicks)
   - TE-Kicks (factory TE kicks)
   - Cuckoo Kicks
   - Seba Kicks
   - RDMT Kicks
5. Note: Selected plug appears in center with round icon below
```

**Exercise 2B: Loading a New Plug to an Empty Slot**
```
1. Navigate to PERCUSSION track (track 3)
2. Notice slot [6] is empty (greyed)
3. Swipe library to select "Vinyl" pack
4. In app: Drag the round icon from selection box
5. Drop onto empty slot [6]
6. Slot [6] now shows Vinyl icon
7. COMMIT button illuminates yellow
8. Tap COMMIT to apply change to OP-Z
9. On OP-Z: Hold [Track 3] + press [6]
   - Vinyl percussion sounds now accessible
```

**Exercise 2C: Replacing an Existing Plug**
```
1. Navigate to KICK track
2. Current slot [1] contains "Z-Kicks"
3. Swipe library to select "Cuckoo Kicks"
4. Drag Cuckoo Kicks icon to slot [1]
5. Z-Kicks is replaced (but retained in library)
6. Tap COMMIT
7. Test on OP-Z: Hold [Track 1] + press [1]
   - Cuckoo Kicks now loaded
```

**Exercise 2C: Understanding Plug Behavior**
```
Test scenario: Moving a loaded plug

1. Navigate to SNARE track
2. Assume slot [1] has "Z-Snares"
3. Drag Z-Snares from slot [1] to slot [5]
4. Result:
   - Slot [5] now has Z-Snares
   - Slot [1] becomes empty
   - (Plugs can only exist in ONE slot at a time)
5. Tap REVERT (red button) to cancel
```

### ASCII Reference: Drag and Drop Process
```
BEFORE:                      AFTER:
┌───┐  ┌───┐  ┌───┐        ┌───┐  ┌───┐  ┌───┐
│ A │  │   │  │ C │   →    │ A │  │NEW│  │ C │
└───┘  └───┘  └───┘        └───┘  └───┘  └───┘
  1      2      3             1      2      3

Library:                    Selection Box:
[◀ OLD NEW ▶]     →        [ NEW ]
                                ↓ DRAG
                            Drop to slot 2
```

### Practice Tasks
1. Load "RDMT Kicks" to KICK track slot [5]
2. Load "Vinyl" to SAMPLE track slot [7]
3. Replace BASS track slot [1] engine with "Uranus"
4. Commit all changes
5. Test each new plug on hardware

### Knowledge Check
- What happens to a replaced plug?
- Can one plug exist in multiple slots simultaneously?
- What does the yellow COMMIT button indicate?

---

## Day 3: Moving and Swapping Plugs (25 minutes)

### Learning Objectives
- Move plugs between slots on the same track
- Swap plug positions
- Organize plugs for live performance workflow
- Use Revert to undo unwanted changes

### Hands-On Exercise

**Exercise 3A: Moving Plugs to Empty Slots**
```
1. Navigate to KICK track
2. Drag slot [1] plug to empty slot [6]
3. Result:
   - Slot [6] now contains the plug
   - Slot [1] is now empty
4. Tap COMMIT to apply
5. On OP-Z: Test new value key position
   - Hold [Track 1] + press [6]
```

**Exercise 3B: Swapping Plug Positions**
```
1. Navigate to KICK track
2. Assume:
   - Slot [1] = Z-Kicks
   - Slot [2] = TE-Kicks
3. Drag slot [1] icon to slot [2]
4. Result: Plugs SWAP positions
   - Slot [1] = TE-Kicks
   - Slot [2] = Z-Kicks
5. Tap COMMIT
```

**Exercise 3C: Creating a Performance Layout**
```
Organize KICK track for live use:

Goal: Place favorite kicks in slots [1]-[4] for easy access

1. Review all loaded kick plugs
2. Decide your preferred order:
   - Slot [1]: Main electronic kick (Z-Kicks)
   - Slot [2]: Acoustic kick (RDMT Kicks)
   - Slot [3]: Unique character (Cuckoo)
   - Slot [4]: Heavy kick (Seba)
3. Drag and rearrange to achieve layout
4. COMMIT changes
5. Practice switching: Hold [Track 1] + press [1], [2], [3], [4]
```

**Exercise 3D: Using REVERT**
```
Practice safe experimentation:

1. Navigate to SNARE track
2. Make several changes:
   - Move slot [1] to slot [5]
   - Replace slot [2] with different plug
   - Swap slots [3] and [4]
3. Before committing, tap REVERT (red button)
4. All changes are undone
5. Configuration reloads from OP-Z
6. Original layout restored
```

### ASCII Reference: Swap Operation
```
BEFORE SWAP:               AFTER SWAP:
┌─────┐  ┌─────┐          ┌─────┐  ┌─────┐
│  A  │  │  B  │    →     │  B  │  │  A  │
└─────┘  └─────┘          └─────┘  └─────┘
   1        2                1        2

Process: Drag A onto B, they exchange positions
```

### Practice Tasks

**Task 3A: Optimize SNARE Track**
```
Rearrange snare track for your workflow:
1. Place most-used snares in [1]-[3]
2. Place specialty snares in [4]-[6]
3. Leave [7]-[0] empty or fill with variations
4. Commit and test with quick switches during playback
```

**Task 3B: Create Multi-Genre BASS Setup**
```
Configure bass track for versatility:
1. Slot [1]: Saw (aggressive)
2. Slot [2]: Uranus (clean)
3. Slot [3]: Analog (warm)
4. Slot [4]: EP (mellow)
5. Practice switching bass engines mid-pattern
```

**Task 3C: Experiment and Revert**
```
1. Make radical changes to any track
2. Commit changes
3. Test on hardware
4. If unsatisfied, create new configuration
5. Use Revert to return to last committed state
```

### Knowledge Check
- What's the difference between moving and swapping plugs?
- When should you use COMMIT vs REVERT?
- How can slot organization improve live performance?

---

## Day 4: Configuring All Track Types (30 minutes)

### Learning Objectives
- Configure sample tracks (Kicks, Snares, Perc, Sample)
- Configure synth engine tracks (Bass, Lead, Arp, Chord)
- Configure FX tracks with different effect engines
- Understand track-specific plug libraries

### Hands-On Exercise

**Exercise 4A: Sample Track Configuration**
```
PERCUSSION Track Setup:

1. Navigate to PERC (track 3)
2. Available sample packs:
   - Z-Perc, TE-Perc, Cuckoo Perc, Seba Perc, Vinyl, RDMT Perc
3. Create diverse percussion palette:
   [1] Z-Perc (electronic)
   [2] TE-Perc (classic)
   [3] Vinyl (texture/atmosphere)
   [4] Seba Perc (unique)
   [5] RDMT Perc (acoustic)
4. Commit changes
5. Test: Hold [Track 3] + cycle through [1]-[5]
```

**Exercise 4B: Synth Engine Configuration**
```
LEAD Track Setup:

1. Navigate to LEAD (track 6)
2. Available engines (not samples):
   - Volt, Digital, Cluster, Saw, Electric, Bow
   - Analog, Organ, Shade, Uranus, EP
3. Load complementary synth colors:
   [1] Volt (fat & sparky)
   [2] Digital (sharp & binary)
   [3] Cluster (airy & moody)
   [4] Saw (filtered waves)
   [5] Electric (complex)
   [6] Bow (string synth)
4. Commit
5. Create simple melody on track 6
6. Switch engines: Hold [Track 6] + press [1]-[6]
   - Listen to same melody with different timbres
```

**Exercise 4C: FX Track Configuration**
```
FX1 Track Setup:

1. Navigate to FX1 (track 9)
2. Available effects:
   - Delay, RYMD (reverb), Dist, Crush
   - Chorus-80, Reverb (with pre-delay)
3. Organize by use case:
   [1] Delay (rhythmic/spacious)
   [2] RYMD (basic reverb)
   [3] Dist (character/grit)
   [4] Crush (lo-fi/aggressive)
4. Commit changes
5. Test: Create pattern on any track
   - (Track) + (Shift) + [9] to send signal to FX1
   - Hold [Track 9] + switch between [1]-[4]
```

**Exercise 4D: Cross-Track Configuration Strategy**
```
Create cohesive multi-track setup:

SAMPLE Track (track 4):
1. Load diverse one-shots and FX
   [1] Z-FX (risers, impacts)
   [2] TE-FX (sweeps)
   [3] Cuckoo FX (unique)
   [4] Nedavine FX (texture)
   [5] Vinyl (atmosphere)

CHORD Track (track 8):
1. Load musical engines for pads
   [1] Shade (smooth piano)
   [2] Saw (classic pad)
   [3] Cluster (ambient)
   [4] Bow (strings)

FX2 Track (track 10):
1. Complement FX1 with different effects
   [1] RYMD (quick reverb)
   [2] Chorus-80 (width)
   [3] Reverb (lush, with pre-delay)

Commit all changes and test full arrangement
```

### ASCII Reference: Track Types Overview
```
SAMPLE TRACKS (Kits)        SYNTH TRACKS (Engines)
┌──────────────────┐        ┌──────────────────┐
│ 1. KICK          │        │ 5. BASS          │
│ 2. SNARE         │        │ 6. LEAD          │
│ 3. PERC          │        │ 7. ARP           │
│ 4. SAMPLE        │        │ 8. CHORD         │
└──────────────────┘        └──────────────────┘

EFFECT TRACKS               CONTROL TRACKS
┌──────────────────┐        ┌──────────────────┐
│ 9. FX1           │        │ 11. TAPE         │
│ 10. FX2          │        │ 12. MASTER       │
└──────────────────┘        │ 13-16. (Special) │
                            └──────────────────┘
```

### Practice Tasks

**Task 4A: Genre-Specific Setup**
```
Configure for Electronic/Techno:
- KICK: Aggressive electronic kicks
- BASS: Saw, Analog, Digital engines
- LEAD: Volt, Electric, Digital
- FX1: Delay, Dist
```

**Task 4B: Alternative Genre Setup**
```
Configure for Lo-Fi/Chill:
- KICK: RDMT (acoustic), softer samples
- BASS: Uranus, EP, Analog
- LEAD: Cluster, Shade, Bow
- CHORD: Shade, EP
- FX1: Chorus-80, RYMD
- FX2: Reverb
```

**Task 4C: Explore Default vs Custom**
```
1. Document default configuration for all tracks
2. Create completely custom setup
3. Test both in actual music creation
4. Determine which setup suits your workflow
```

### Knowledge Check
- What's the difference between sample packs and synth engines?
- How do you access different plugs during playback?
- Why might you organize FX1 and FX2 differently?

---

## Day 5: Advanced Configuration & Workflow (30 minutes)

### Learning Objectives
- Create complete custom setups for different scenarios
- Develop live performance configurations
- Understand user pack management
- Learn configuration best practices

### Hands-On Exercise

**Exercise 5A: Live Performance Setup**
```
Goal: Configure OP-Z for live improvisation

Strategy: Maximum variety, logical layout

DRUMS (Tracks 1-4):
1. KICK [1-4]: Different kick weights/characters
   - [1] Main (Z-Kicks)
   - [2] Sub (TE-Kicks)
   - [3] Acoustic (RDMT)
   - [4] Variant (Cuckoo)

2. SNARE [1-4]: Contrast and variety
   - [1] Tight electronic
   - [2] Cracking snare
   - [3] Rimshot/clap
   - [4] Acoustic

3. PERC [1-6]: Diverse textures
   - [1-2] Hi-hats/shakers
   - [3-4] Toms/cymbals
   - [5-6] Vinyl/atmosphere

4. SAMPLE [1-6]: Performance accents
   - [1-3] Risers, impacts, downlifters
   - [4-6] Vocal chops, FX

MELODIC (Tracks 5-8):
5. BASS [1-4]: Style variations
   - [1] Saw (aggressive)
   - [2] Analog (warm)
   - [3] Uranus (clean)
   - [4] EP (melodic)

6. LEAD [1-4]: Complementary timbres
   - [1] Volt (bright)
   - [2] Digital (cutting)
   - [3] Electric (complex)
   - [4] Bow (smooth)

7. ARP [1-3]: Rhythmic textures
   - [1] Saw (classic)
   - [2] Digital (sharp)
   - [3] Cluster (atmospheric)

8. CHORD [1-3]: Pad variety
   - [1] Shade (piano)
   - [2] Cluster (ambient)
   - [3] Bow (strings)

FX (Tracks 9-10):
9. FX1: Creative effects
   - [1] Delay
   - [2] Dist
   - [3] Crush

10. FX2: Spatial effects
   - [1] RYMD (quick reverb)
   - [2] Reverb (lush)
   - [3] Chorus-80 (width)

Commit all changes and practice switching during performance
```

**Exercise 5B: Studio Production Setup**
```
Goal: Configure for detailed composition work

Strategy: Precision and sonic palette expansion

Focus on loading ALL available engines:

BASS Track:
[1] Saw     [2] Uranus   [3] Electric
[4] Digital [5] Volt     [6] Bow
[7] Analog  [8] Organ    [9] Cluster
[0] EP

LEAD Track:
[1] Volt    [2] Digital  [3] Cluster
[4] Saw     [5] Electric [6] Bow
[7] Analog  [8] Organ    [9] Shade
[0] Uranus

This allows auditioning many sounds quickly
during composition phase
```

**Exercise 5C: Understanding User Packs**
```
When you create samples on OP-Z:

1. Navigate to a sample track (1-4)
2. Notice plugs labeled "U58", "U59", etc.
   - These are USER packs created on device
   - Automatically named
   - Appear in configurator library
3. Load user packs to slots like factory packs
4. Mix user and factory content
5. Organize user samples alongside factory
```

**Exercise 5D: Configuration Documentation**
```
Create a personal reference:

1. Open Notes app or text editor
2. Document your custom setup:

CUSTOM SETUP: Live Techno
────────────────────────────
KICK:
[1] Z-Kicks - main
[2] RDMT - acoustic accent
[3] Seba - heavy drop

BASS:
[1] Saw - lead bass
[2] Analog - warm sub
[3] Digital - aggressive

FX1:
[1] Delay - 1/4 note
[2] Dist - drive
[3] Crush - lo-fi breaks

3. Keep this reference for quick setup recreation
```

### ASCII Reference: Complete Hardware Integration
```
OP-Z HARDWARE:
┌────────────────────────────────────────┐
│  Encoders: {Red} {Blue} {Green} {Yel} │
│                                        │
│  Track Keys: [1][2][3][4][5][6][7][8] │
│              [9][10][11][12]...       │
│                                        │
│  Value Keys: [1][2][3][4][5]          │
│              [6][7][8][9][0]          │
│                                        │
│  Access Plug:                          │
│  Hold [Track] + Press [Value Key]     │
└────────────────────────────────────────┘

CONFIGURATOR APP:
┌────────────────────────────────────────┐
│  Configure which plug loads to which   │
│  value key slot                        │
│                                        │
│  [Track] → Shows 10 slots → Load plugs│
│  Commit → Changes go to hardware       │
└────────────────────────────────────────┘
```

### Practice Tasks

**Task 5A: Create Three Setups**
```
1. SETUP A: "Minimal Techno"
   - Sparse, focused plug selection
   - Only essential sounds loaded

2. SETUP B: "Experimental"
   - Unusual combinations
   - Focus on texture and atmosphere

3. SETUP C: "Maximum Variety"
   - All slots filled
   - Every plug type represented

Document all three for future reference
```

**Task 5B: Speed Configuration Challenge**
```
Time yourself:
1. Start with current configuration
2. Reconfigure KICK, SNARE, BASS, LEAD tracks
   - New plugs in all slots [1]-[4]
3. Commit changes
4. Test on hardware

Goal: Complete in under 3 minutes
Builds muscle memory for live setup changes
```

**Task 5C: Integration Exercise**
```
Create 8-bar pattern using your custom setup:

1. Program drums using configured kits
2. Switch kick samples mid-pattern
   - Hold [Track 1] + [1] for bars 1-4
   - Hold [Track 1] + [2] for bars 5-8
3. Do same with bass engines
4. Add FX switching
5. Practice smooth transitions between plugs
```

### Knowledge Check
- How would you configure for maximum live flexibility?
- What's the advantage of documenting your setups?
- How do user packs integrate with factory content?

### Reflection Questions
1. Which configuration strategy suits your workflow better: minimal or maximal?
2. How does track configuration affect your creative process?
3. What configuration changes improved your OP-Z experience most?

---

## Quick Reference Card

### Accessing Configurator
```
1. Connect OP-Z to app
2. Hold [Screen] + turn {Red} encoder
   OR Hold [Screen] + press green track key
3. Scroll to CONFIGURATOR (centered)
4. Release [Screen] to open
```

### Configurator Interface Elements
```
+/-              Navigate between tracks
Round Slots      10 value key positions ([1]-[0])
Plug Library     Swipe to browse available plugs
Selection Box    Shows currently selected plug
COMMIT (yellow)  Apply changes to OP-Z
REVERT (red)     Cancel changes, reload from device
```

### Loading a Plug
```
1. Navigate to desired track (+/- or track key)
2. Swipe library to select plug
3. Drag round icon from selection box
4. Drop onto target slot [1]-[0]
5. Tap COMMIT
```

### Moving a Plug
```
1. Drag plug from source slot
2. Drop onto destination slot
   - Empty slot: Plug moves
   - Filled slot: Plugs swap
3. Tap COMMIT
```

### Accessing Plugs on Hardware
```
Hold [Track Key] + Press [Value Key]

Example:
- Hold [1] + press [3] = Kick track, slot 3
- Hold [5] + press [2] = Bass track, slot 2
- Hold [9] + press [1] = FX1 track, slot 1
```

### Plug Rules
```
- One plug can only exist in ONE slot at a time
- Replacing a plug keeps it in the library
- User packs (U##) created on device appear automatically
- Synth engines are not samples (engine parameters only)
- FX tracks can have different effect engines per slot
```

### Default Factory Packs - Sample Tracks
```
KICK:     Z-Kicks, TE-Kicks, Cuckoo, Seba, RDMT
SNARE:    Z-Snares, TE-Snares, Cuckoo, Seba, RDMT
PERC:     Z-Perc, TE-Perc, Cuckoo, Seba, Vinyl, RDMT
SAMPLE:   Z-FX, TE-FX, Cuckoo, Seba, Nedavine, Vinyl, RDMT
```

### Default Factory Engines - Synth Tracks
```
BASS/LEAD/ARP/CHORD Available Engines:
- Saw (filtered waves)
- Uranus (clean)
- Electric (complex)
- Digital (sharp)
- Volt (fat & sparky)
- Bow (string synth)
- Analog (warm)
- Organ (FM)
- Cluster (airy)
- Shade (piano - Chord default)
- EP (electric piano)
```

### Default Factory Effects - FX Tracks
```
FX1/FX2:
- Delay (digital delay)
- RYMD (basic reverb)
- Dist (overdrive)
- Crush (bit crusher)
- Chorus-80 (oldschool chorus)
- Reverb (with pre-delay)
```

### Track Configuration Overview
```
Tracks 1-4:   Sample-based (kits/one-shots)
Tracks 5-8:   Synth engines (oscillators/synthesis)
Tracks 9-10:  Effects processing
Tracks 11-12: Tape, Master (limited config)
Tracks 13-16: Performance, I/O, Lights, Motion (no config)
```

### Workflow Tips
```
✓ Organize frequently-used plugs in slots [1]-[4] for easy access
✓ Use REVERT to experiment safely
✓ Document custom setups in notes
✓ Mix factory and user packs freely
✓ Configure different setups for studio vs live
✓ Test configurations during actual music-making
✓ Check for app updates for new plugs
✓ Current selection on device shown with tag indicator
```

### Common Workflows
```
LIVE PERFORMANCE:
- Diverse options in [1]-[6]
- Leave some slots for spontaneity
- Quick-access favorites in [1]-[3]

STUDIO PRODUCTION:
- Fill all 10 slots for maximum choice
- Group similar sounds together
- Experiment with unusual combinations

MINIMAL/FOCUSED:
- Only load essentials
- Reduce decision fatigue
- Fast, efficient workflow
```

### ASCII Hardware Reminder
```
OP-Z TOP VIEW:
┌─────────────────────────────────────────┐
│ {Red} {Blue} {Green} {Yellow}           │ Encoders
│                                         │
│ Track:  [1][2][3][4][5][6][7][8]       │ Audio
│         [9][10][11][12][13][14][15][16]│ FX/Control
│                                         │
│ Value:  [1][2][3][4][5][6][7][8][9][0] │ Plug Access
│                                         │
│ Other:  [Screen][Shift][Track][Stop]   │ Functions
└─────────────────────────────────────────┘

Hold [Track] + [Value] to access configured plugs
```

### Troubleshooting
```
Changes not appearing on hardware?
→ Make sure you tapped COMMIT

Can't find a plug?
→ Swipe through entire library, some plugs unloaded by default

Plug appears in two slots?
→ Not possible - drag again, plug can only be in ONE slot

Want original configuration back?
→ If not committed: tap REVERT
→ If committed: manually reconfigure or factory reset
```

---

## Week 5 Completion Checklist

- [ ] Successfully opened Configurator app
- [ ] Navigated between all 16 tracks
- [ ] Loaded new plug to empty slot
- [ ] Replaced existing plug
- [ ] Moved plug between slots
- [ ] Swapped two plug positions
- [ ] Used COMMIT to apply changes
- [ ] Used REVERT to cancel changes
- [ ] Configured sample track (Kicks, Snares, Perc, or Sample)
- [ ] Configured synth track (Bass, Lead, Arp, or Chord)
- [ ] Configured both FX tracks
- [ ] Created custom live performance setup
- [ ] Accessed plugs on hardware (Hold Track + Value Key)
- [ ] Documented personal configuration
- [ ] Tested configuration in actual music creation

### Next Week Preview
Week 6 will cover advanced sequencing techniques including step components, parameter locks, and automation, building on your customized track configurations.

---

**Remember:** Configuration is personal. The best setup is one that matches YOUR workflow, whether that's minimal and focused or maximal and exploratory. Experiment freely - you can always revert or reconfigure.
