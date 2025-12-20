# OP-Z System Week - Curriculum

**Chapter 13: System Settings & Maintenance**

*A 5-day practical curriculum covering system configuration, OS updates, backing up, factory reset, and battery replacement*

---

## Overview

This week focuses on the essential system-level functions of the OP-Z. These are "set and forget" features that support the configuration and maintenance of your device. While not used daily, understanding these functions is crucial for optimal OP-Z performance and troubleshooting.

**Key Topics:**
- System configuration via general.json file
- OS updates and version checking
- Backing up and restoring data
- Factory reset procedures
- Battery replacement

---

## Day 1: Understanding Boot Modes & Configuration Settings (15 minutes)

### Learning Objectives
- Master the three boot modes of OP-Z
- Understand the general.json configuration file
- Practice entering content and upgrade modes

### Warm-up: Boot Mode Practice (5 minutes)

**Normal Boot:**
```
Power switch: OFF → ON
Result: 4 green dial LEDs, ready to play
```

**Content Mode Boot:**
```
1. Hold (Track) button
2. Power switch: OFF → ON while holding
3. Release (Track)
Result: All 16 step LEDs green, OP-Z appears as disk drive
```

**Upgrade Mode Boot:**
```
1. Hold [Screen] button
2. Power switch: OFF → ON while holding
3. Release [Screen]
Result: 4 white dial LEDs, Kick step flashes white
```

### Main Exercise: Exploring the Config Folder (10 minutes)

**Setup:**
```
┌─────────────┐
│   COMPUTER  │
│             │
└──────┬──────┘
       │ USB Cable
┌──────┴──────┐
│    OP-Z     │
│  [TRACK] +  │
│  Power ON   │
└─────────────┘
```

**Step-by-step:**

1. **Enter Content Mode:**
   - Hold (Track)
   - Power ON OP-Z
   - Verify: All 16 step LEDs illuminate green

2. **Navigate Folder Structure:**
   ```
   OP-Z/
   ├── bounces/
   ├── config/
   │   ├── dmx.json
   │   ├── midi.json
   │   └── general.json ← We're interested in this
   ├── projects/
   ├── rejected/
   └── samplepacks/
   ```

3. **View general.json:**
   - Open in text editor (TextEdit, Notepad, VS Code)
   - DO NOT edit yet, just observe the structure

**Default general.json structure:**
```json
{
  "backlit_keys" : false,
  "disable_headphone_db_reduction" : false,
  "disable_microphone_mode" : false,
  "disable_param_page_reset" : false,
  "disable_start_sound" : false,
  "disable_track_preview" : false,
  "generous_chords" : false,
  "latch_notes_with_shift" : false,
  "temp_param_add_fx_a" : true
}
```

### Understanding Each Setting

| Setting | Default | What it Does |
|---------|---------|--------------|
| backlit_keys | false | Illuminates all buttons in dark conditions |
| disable_headphone_db_reduction | false | Removes audio level reduction based on headphone impedance |
| disable_microphone_mode | false | Disables auto-mic when tilted 90 degrees |
| disable_param_page_reset | false | Retains parameter pages when changing tracks |
| disable_start_sound | false | Plays startup jingle (set true to disable) |
| disable_track_preview | false | Allows track preview when selecting |
| generous_chords | false | Increases polyphony to 6 notes (default is 4) |
| latch_notes_with_shift | false | Enables note latching with (Shift) |
| temp_param_add_fx_a | true | Adds FX1 send during parameter tweaking |

### Cool Down: Safe Ejecting

**Always eject properly:**
```
Computer method: Right-click disk → Eject
OR
OP-Z method: Press (Play) to eject from device
```

---

## Day 2: Creating Custom Configuration Profiles (20 minutes)

### Learning Objectives
- Safely backup original configuration
- Create custom general.json files
- Understand JSON syntax requirements

### Warm-up: Backup Original Config (5 minutes)

**Critical first step:**
```
1. Enter Content Mode: Hold (Track) + Power ON
2. Navigate to config/general.json
3. Copy to computer desktop
4. Rename: general-ORIGINAL-BACKUP.json
5. Store safely
```

### Main Exercise: Creating Your Custom Profile (15 minutes)

**Scenario: Performance Setup**

Create a configuration optimized for live performance with backlit keys and no startup sound.

**Step 1: Create new file on computer**
```json
{
  "backlit_keys" : true,
  "disable_headphone_db_reduction" : false,
  "disable_microphone_mode" : false,
  "disable_param_page_reset" : false,
  "disable_start_sound" : true,
  "disable_track_preview" : false,
  "generous_chords" : false,
  "latch_notes_with_shift" : true,
  "temp_param_add_fx_a" : true
}
```

**Changes made:**
- `"backlit_keys" : true` → Keys will be illuminated
- `"disable_start_sound" : true` → No startup jingle
- `"latch_notes_with_shift" : true` → Hold notes with (Shift)

**Step 2: Install on OP-Z**
```
1. Save file as: general.json
2. Enter Content Mode on OP-Z
3. Navigate to config folder
4. Delete or rename existing general.json
5. Copy new general.json to config folder
6. Eject OP-Z: Press (Play)
7. Power cycle: OFF → ON
8. Test: All buttons should now be backlit
```

### JSON Syntax Rules - CRITICAL

**What will work:**
```json
{
  "backlit_keys" : true,
  "disable_start_sound" : false
}
```

**What will FAIL (and be rejected):**
```json
{
  "backlit_keys" : true,    // NO COMMENTS ALLOWED
  "disable_start_sound" : false,  // Extra comma on last line = ERROR
}
```

**If file is rejected:**
- OP-Z moves it to `/rejected/` folder
- Default general.json is restored automatically
- Check your syntax and try again

### Pro Tip: Multiple Profiles

**Organization strategy:**
```
Computer folder: OP-Z-Configs/
├── general-ORIGINAL.json
├── general-PERFORMANCE.json (backlit, no startup)
├── general-STUDIO.json (track preview, param reset)
└── general-EXPERIMENTAL.json (generous chords, latching)

Swap as needed by renaming to general.json
```

---

## Day 3: OS Updates & System Information (25 minutes)

### Learning Objectives
- Check current firmware version
- Perform an OS update
- Access system information and logs

### Warm-up: Checking Current OS Version (5 minutes)

**Method 1: Via OP-Z App**
```
1. Open OP-Z app on phone/tablet
2. Ensure Bluetooth connected
3. Navigate to: Devices
4. Look for: "FW 1.2.20" (or current version)
```

**Method 2: Via File System**
```
1. Enter Upgrade Mode: Hold [Screen] + Power ON
   (4 white dial LEDs, Kick step flashes white)
2. Connect USB to computer
3. Open OP-Z disk
4. Navigate to: systeminfo/version.txt
5. First line shows current OS version
```

### Main Exercise: Understanding Update Process (10 minutes)

**DO NOT perform actual update unless new firmware is available**

**Update Process Diagram:**
```
1. DOWNLOAD                2. UPGRADE MODE           3. TRANSFER
┌──────────┐              ┌──────────┐              ┌──────────┐
│ Teenage  │              │  OP-Z    │              │ Computer │
│Engineer  │─────────────▶│          │◀─────────────│          │
│ Website  │  .zfw file   │ [Screen] │  USB cable   │Drag/drop │
└──────────┘              │  + ON    │              │ .zfw file│
                          └──────────┘              └──────────┘
                          ┌──────────┐
4. EJECT & UPDATE         │Color dials│
   Computer: Eject OP-Z   │flash and  │
   OR                     │update     │
   OP-Z: Press (Play)     └──────────┘
                          ┌──────────┐
5. COMPLETE               │ 4 green  │
   OP-Z returns normal    │dial LEDs │
                          └──────────┘
```

**Detailed Steps:**

**Step 1: Download Firmware**
- Visit: teenage.engineering/products/op-z
- Download latest OS file: `z_firmware_X_X_XX.zfw`
- Read included instructions (may differ per version)

**Step 2: Enter Upgrade Mode**
```
1. Hold [Screen] button
2. Power: OFF → ON (while holding)
3. Release [Screen]
4. Verify: 4 white dial LEDs, Kick step flashes white
```

**Step 3: Transfer Firmware**
```
1. Connect USB cable
2. Open OP-Z disk on computer
3. Drag .zfw file to ROOT directory (not in any folder)
4. Wait for transfer to complete
```

**Step 4: Eject and Update**
```
Method A (Computer): Right-click OP-Z disk → Eject
Method B (OP-Z): Press (Play) button

CRITICAL: Do NOT unplug or power off during update!
```

**Step 5: Completion**
```
Watch dial LEDs - they will flash during update
When complete: 4 green dial LEDs appear
Safe to unplug and use normally
```

### Exercise: Reading System Logs (10 minutes)

**Accessing Upgrade History:**
```
1. Enter Upgrade Mode: Hold [Screen] + Power ON
2. Connect USB
3. Open: systeminfo/upgrade.log
```

**Example upgrade.log:**
```
------------------------------------------
[2019-11-17 10:51] upgrade started
[2019-11-17 10:51] content -> OK
[2019-11-17 10:51] os -> OK
[2019-11-17 10:51] bootloader -> Already installed
[2019-11-17 10:51] ble -> Already installed
[2019-11-17 10:51] keyboard -> Already installed
[2019-11-17 10:51] successfully upgraded to 1.2.14
------------------------------------------
```

**What each line means:**
- `content -> OK` = Factory content updated
- `os -> OK` = Operating system updated
- `bootloader -> Already installed` = No update needed
- `ble -> Already installed` = Bluetooth firmware unchanged
- `keyboard -> Already installed` = Keyboard firmware unchanged

**Accessing Serial Number:**
```
1. Enter Upgrade Mode
2. Open: systeminfo/serial.txt
3. First line = device serial number
4. Cross-reference with backplate of OP-Z
```

**System Log (for troubleshooting):**
```
Location: systeminfo/system.log
Use: When seeking technical support from Teenage Engineering
```

---

## Day 4: Backing Up & Restoring Data (30 minutes)

### Learning Objectives
- Create complete OP-Z backup
- Understand folder structure and permissions
- Restore data from backup

### Warm-up: Understanding Folder Permissions (5 minutes)

**What you can do with each folder:**

| Folder | Add | Modify | Remove |
|--------|-----|--------|--------|
| projects/ | ✓ | ✓ | ✓ |
| samplepacks/ | ✓ | ✓ | ✓ |
| bounces/ | ✗ | ✗ | ✓ |
| config/ | ✗ | ✓ | ✗ |

**Key takeaways:**
- Projects and samplepacks: Full control
- Bounces: Read and delete only (OP-Z creates these)
- Config: Modify existing files only (do not delete)

### Main Exercise: Complete Backup Procedure (15 minutes)

**Setup your backup structure:**
```
Computer: Create folder structure
OP-Z-Backups/
├── 2025-12-11-Full-Backup/
│   ├── projects/
│   ├── samplepacks/
│   ├── bounces/
│   └── config/
└── README.txt (note what's backed up)
```

**Backup Process:**

**Step 1: Enter Content Mode**
```
ASCII Diagram:
        ┌─────────────────┐
        │     COMPUTER    │
        └────────┬────────┘
                 │ USB
        ┌────────┴────────┐
        │      OP-Z       │
        │                 │
        │  ╔═══╗  ╔═══╗   │
        │  ║ T ║  ║   ║   │ Hold (Track)
        │  ╚═╤═╝  ╚═══╝   │ Power ON
        └────┼────────────┘
             │
        All 16 steps GREEN
```

1. Hold (Track) button
2. Power: OFF → ON
3. Release when all step LEDs are green

**Step 2: Copy ALL Folders**
```
1. Open OP-Z disk
2. Select all folders:
   - projects
   - samplepacks
   - bounces
   - config
3. Copy to computer backup folder
4. Verify file sizes match
```

**Step 3: Document Backup**
```
Create README.txt:
---
OP-Z BACKUP
Date: 2025-12-11
OS Version: 1.2.20
Projects: 10
Samplepacks: 3
Notes: Before installing new samplepack
---
```

**Step 4: Safe Ejection**
```
Press (Play) on OP-Z to eject
OR
Computer: Right-click → Eject
```

### Exercise: Selective Restore (10 minutes)

**Scenario: Restore single project**

```
1. Enter Content Mode: Hold (Track) + Power ON
2. Open OP-Z disk → projects folder
3. From backup: Copy specific project folder
4. Paste into OP-Z projects folder
5. Eject: Press (Play)
6. Power cycle OP-Z
7. Test: Navigate to restored project
```

**Scenario: Restore config after rejection**

```
Problem: Edited general.json has syntax error
Result: File moved to /rejected/, defaults restored

Solution:
1. Enter Content Mode
2. Open backup: config/general.json
3. Copy to OP-Z config folder
4. Eject and restart
5. Verify settings restored
```

### Backup Strategy Recommendations

**Frequency:**
- Before OS updates: Always
- After major projects: Weekly
- Before config changes: Every time
- After adding samplepacks: Every time

**What to backup:**
- Essential: projects/, config/
- Important: samplepacks/
- Optional: bounces/ (can be recreated)

---

## Day 5: Factory Reset & Battery Replacement (25 minutes)

### Learning Objectives
- Safely perform factory reset
- Physically replace the battery
- Understand when each procedure is necessary

### Warm-up: When to Factory Reset (5 minutes)

**Good reasons to factory reset:**
- Selling or giving away OP-Z
- Major system issues or glitches
- Starting completely fresh
- Corrupted system files

**BEFORE you reset:**
- BACKUP EVERYTHING (see Day 4)
- You will lose ALL user data
- Projects, samples, configs all erased
- OS version remains the same

### Main Exercise: Factory Reset Procedure (10 minutes)

**PRACTICE ONLY - Do not execute final step unless intended**

```
Hardware Diagram:

┌───────────────────────────────────────┐
│  OP-Z TOP VIEW                        │
│                                       │
│  [SCREEN]        ┌─┐ ┌─┐ ┌─┐ ┌─┐    │
│     ●●●●●        │○│ │○│ │○│ │○│    │ ← Dials
│                  └─┘ └─┘ └─┘ └─┘    │
│  ┌──────────────────────────────┐    │
│  │ 1  2  3  4  5  6  7  8  9...│    │ ← Steps
│  └──────────────────────────────┘    │
│  (STOP)                              │
│  [TRACK]                             │
└───────────────────────────────────────┘
```

**Step-by-step Process:**

**Step 1: Backup Everything**
```
Enter Content Mode
Copy all data to computer
Verify backup is complete
Disconnect USB
```

**Step 2: Enter Upgrade Mode**
```
1. Hold [Screen] button
2. Power: OFF → ON (while holding)
3. Release [Screen]
4. Verify: 4 white dial LEDs + Kick step flashing white
```

**Step 3: Initiate Factory Reset**
```
Hold: [Screen] + (Stop) simultaneously
Watch: Dial LEDs will change
Wait: Process completes automatically
```

**Step 4: Completion Indicators**
```
Success state:
- 4 green dial LEDs
- One step LED flashing white
- Process complete
```

**Step 5: Finalize**
```
If connected to computer: Eject OP-Z
Power: OFF → ON (cycle power)
Result: OP-Z in factory fresh state
```

### Battery Replacement Exercise (10 minutes)

**Battery Specifications:**
- Type: Li-Ion rechargeable
- Voltage: 3.7v
- Capacity: 740 mAh
- Available from Teenage Engineering

**Replacement Procedure:**

```
Hardware View - Bottom Panel:

┌─────────────────────────────────────┐
│  OP-Z BOTTOM (cover removed)        │
│                                     │
│  ┌───────────────────┐              │
│  │                   │    ┌──┐      │
│  │                   │    │  │ ← Latch (yellow)
│  │    BATTERY        │    └──┘      │
│  │                   │              │
│  │    ┌──┐          │   MODULE     │
│  │    │  │←Notch    │   EXPANSION  │
│  │    └──┘          │   SLOT       │
│  └───────────────────┘              │
│     ↑                               │
│  Contacts (insert first)            │
└─────────────────────────────────────┘
```

**Step 1: Open Device**
```
1. Power OFF OP-Z
2. Flip device over (bottom facing up)
3. Locate 4 yellow latches
4. Rotate each 90° counterclockwise
5. Carefully remove bottom cover
```

**Step 2: Remove Old Battery**
```
1. Locate battery (large rectangular component)
2. Find notch on RIGHT side near expansion slot
3. Gently lever battery from notch side
4. Lift battery out
5. Set aside safely
```

**Step 3: Install New Battery**
```
CRITICAL: Insert contacts side FIRST (left side)

1. Align battery with slot
2. Insert LEFT side (contacts) first at angle
3. Lower RIGHT side (notch) into place
4. Press down gently until flush
5. Verify battery sits completely flat
```

**Step 4: Close Device**
```
1. Align bottom cover
2. Seat cover carefully
3. Rotate all 4 yellow latches 90° clockwise
4. Verify cover is secure
5. Power ON and test
```

**Testing New Battery:**
```
1. Power ON OP-Z
2. Check: Device boots normally
3. Connect USB charger
4. Verify: Charging LED indicator (if applicable)
5. Test: Full power cycle
```

---

## Quick Reference Card

### Boot Modes

| Mode | Button Combo | LED Indicator | Use For |
|------|--------------|---------------|---------|
| Normal | Power ON | 4 green dials | Regular use |
| Content | (Track) + ON | 16 green steps | Access projects/samples/config |
| Upgrade | [Screen] + ON | 4 white dials, Kick flashes | OS updates, factory reset |

### Essential Procedures

**Access Config File:**
```
1. Hold (Track) + Power ON
2. Connect USB
3. Navigate to: config/general.json
4. Edit in text editor
5. Press (Play) to eject
6. Power cycle
```

**Update OS:**
```
1. Download .zfw from teenage.engineering
2. Hold [Screen] + Power ON
3. Connect USB
4. Drag .zfw to root directory
5. Press (Play) to eject
6. Wait for 4 green LEDs
```

**Backup Data:**
```
1. Hold (Track) + Power ON
2. Connect USB
3. Copy all folders to computer
4. Document backup with date/notes
5. Press (Play) to eject
```

**Factory Reset:**
```
1. BACKUP FIRST!
2. Hold [Screen] + Power ON
3. Hold [Screen] + (Stop)
4. Wait for 4 green LEDs + flashing step
5. Power cycle
```

**Replace Battery:**
```
1. Power OFF
2. Rotate 4 yellow latches
3. Lever battery from RIGHT notch
4. Insert new: LEFT (contacts) first
5. Close and lock latches
```

### general.json Quick Settings

**Performance Setup:**
```json
{
  "backlit_keys" : true,
  "disable_start_sound" : true,
  "latch_notes_with_shift" : true
}
```

**Studio Setup:**
```json
{
  "disable_param_page_reset" : false,
  "disable_track_preview" : false,
  "generous_chords" : true
}
```

### Important Files & Locations

| File | Path | Purpose |
|------|------|---------|
| General settings | config/general.json | Device configuration |
| Current OS | systeminfo/version.txt | Firmware version |
| Update history | systeminfo/upgrade.log | Update records |
| Serial number | systeminfo/serial.txt | Device ID |
| System log | systeminfo/system.log | Troubleshooting |

### Folder Permissions

| Folder | Add | Modify | Remove |
|--------|-----|--------|--------|
| projects | Yes | Yes | Yes |
| samplepacks | Yes | Yes | Yes |
| bounces | No | No | Yes |
| config | No | Yes | No |

### Troubleshooting

**Config file rejected:**
- Check JSON syntax (no comments, no trailing commas)
- File moved to `/rejected/` folder
- Default restored automatically

**OS update fails:**
- Ensure upgrade mode (white LEDs)
- File must be in root directory
- Don't unplug during update
- Try different USB cable/port

**Battery won't seat:**
- Insert contacts (LEFT) side first
- Battery should be completely flat
- Check for obstructions
- Don't force it

### Safety Notes

**ALWAYS:**
- Backup before major changes
- Use exact JSON syntax
- Eject properly (Play button or OS eject)
- Power OFF before opening device

**NEVER:**
- Unplug during OS update
- Force battery installation
- Edit JSON with comments
- Skip backing up before factory reset

---

## Week Complete!

You now understand the critical system-level functions of your OP-Z:

**Key Achievements:**
- Mastered all three boot modes
- Can customize device via general.json
- Know how to update OS safely
- Established backup procedures
- Can perform factory reset
- Able to replace battery

**Next Steps:**
- Establish regular backup schedule
- Create custom config profiles for different workflows
- Monitor Teenage Engineering for OS updates
- Keep backup battery on hand for performances

**Pro Tips:**
- Keep original config backed up always
- Document all custom settings
- Update OS only when stable (not before gigs)
- Replace battery every 2-3 years for optimal performance

---

*Remember: These are maintenance skills. Once configured, you may not use them often, but knowing where to look when needed is invaluable.*
