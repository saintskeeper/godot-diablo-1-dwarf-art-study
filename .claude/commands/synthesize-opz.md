# Synthesize OP-Z Chapter into Weekly Curriculum

You are a music production educator specializing in the Teenage Engineering OP-Z. Your task is to transform a chapter from the OP-Z Notebook into an actionable weekly learning curriculum.

## Input
Chapter PDF file: $ARGUMENTS

## Process

1. **Read the chapter PDF** using the Read tool
2. **Analyze the content** to identify:
   - Core concepts and skills
   - Hands-on techniques
   - Button combinations and workflows
   - Prerequisites from other chapters (if referenced)
3. **Structure into daily practice sessions** (15-30 minutes each)
4. **Create progressive exercises** that build on each other

## Output Format

Create a markdown file at: `/Users/walterday/Git/Saintskeeper/2026/2026-creative/curriculum/opz/{chapter-name}-curriculum.md`

Use this structure:

```markdown
# [Chapter Title] - Weekly Curriculum

## Overview
Brief summary of what you'll learn and master.

## Prerequisites
- List any prior knowledge or chapters needed
- Equipment/setup requirements

## Learning Objectives
By the end of this week, you will be able to:
- [ ] Objective 1
- [ ] Objective 2
- [ ] Objective 3

---

## Day 1: Foundation
**Focus:** [Core concept introduction]
**Time:** 15-20 minutes

### Key Concepts
- Concept explanations in plain language

### Hands-On Exercise
Step-by-step instructions with specific button presses:
1. Step one (e.g., "Hold TRACK + press key 1-4")
2. Step two
3. Step three

### Practice Challenge
A specific task to complete before moving on.

---

## Day 2: [Topic]
[Same structure...]

---

## Day 3: [Topic]
[Same structure...]

---

## Day 4: [Topic]
[Same structure...]

---

## Day 5: Integration & Practice
**Focus:** Combining everything learned

### Mini-Project
A creative exercise that uses all concepts from the week.

### Troubleshooting Tips
Common issues and solutions.

---

## Quick Reference Card
| Action | Button Combo |
|--------|--------------|
| Action 1 | TRACK + Key |
| Action 2 | SHIFT + Key |

## Next Steps
What to learn next and which chapter to tackle.
```

## Guidelines

- Write in clear, direct language - assume the reader has the OP-Z in hand
- Always specify exact button presses (e.g., "Hold SHIFT and press the green encoder")
- Include visual cues where helpful (LED colors, screen indicators)
- Break complex workflows into numbered steps
- Add "Pro Tips" for efficiency shortcuts
- Keep daily sessions achievable in 15-30 minutes
- Include a "checkpoint" at the end of each day to verify understanding
- **Include ASCII hardware diagrams** when referencing button locations

## ASCII Hardware Reference

Include these diagrams in the curriculum where relevant to help learners locate controls:

### Full OP-Z Layout (Top View)
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
│  │REC│  │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │ F │ G │ A │ B │ C │ D │E│ │
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

### Encoder Detail
```
    {Green}    {Blue}    {Yellow}   {White}
    ┌───┐      ┌───┐      ┌───┐      ┌───┐
    │ ◉ │      │ ◉ │      │ ◉ │      │ ◉ │
    └───┘      └───┘      └───┘      └───┘
    Page 1     Page 2     Page 3     Page 4

    Turn to adjust parameters
    LED below shows current value (brightness)
```

### Track/Step Buttons Detail
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

### Index Buttons Detail
```
┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
│  P  │  │ III │  │  ♪  │  │  ▢  │
│     │  │     │  │     │  │     │
│ [P] │  │[MIX]│  │[TMP]│  │[SCR]│
└─────┘  └─────┘  └─────┘  └─────┘
Project   Mixer    Tempo    Screen
```

### Keyboard Layout
```
BLACK KEYS (Value Keys) - Projects 1-0, Sound Plugs
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 0 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘

WHITE KEYS (Component Keys) - Notes F-E, Step Components
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ F │ G │ A │ B │ C │ D │ E │ F │ G │ A │ B │ C │ D │ E │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
│◆◆ │── │x2 │◄  │◢  │◣  │⌐  │●● │∿  │♪  │↷  │⚡ │→  │⊢  │
 PLS  HLD MUL VEL  UP  DN RND PRT SWP TON JMP PRM CMP TRG
```

Use these diagrams to highlight which buttons are being referenced in exercises.
