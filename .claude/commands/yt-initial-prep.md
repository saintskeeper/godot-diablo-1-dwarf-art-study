# YouTube Initial Prep

Generate script and shorts plan for a weekly longform video from raw audio notes and curriculum materials.

## Arguments
- `$ARGUMENTS` - Required: week number (e.g., "1", "2", "3")

## Overview

This command transforms raw audio notes into production-ready content:
1. **script.md** - Full video outline with timestamps and talking points
2. **shorts-plan.md** - 6-8 extractable shorts with individual scripts

The output is "initial prep" - run this BEFORE filming to know what footage to capture.

## Input Sources

For week N, gather content from:

| Source | Path | Purpose |
|--------|------|---------|
| Audio Notes | `Content/youtube-longform/week-{N}/users-audio-notes.md` | User's raw thoughts, themes, opinions |
| Curriculum | `Learning/curriculum/week-{N}/*.md` | Daily tasks, tools used, personal wins |
| Game Study | `Games/week-{N}-study/` | Prototype, GDD, shaders, assets |

## Channel Style

**Tone:** "Come along on my journey" - authentic, not polished
**Target Length:** ~10 minutes
**Editing:** Minimal cuts, let B-roll breathe, text overlays for tool names only
**Music:** Use that week's OP-Z loop as background

## Script Structure (Template)

```
INTRO (0:00 - 1:00)
├── Hook (0:00 - 0:15): One-liner that captures the week
├── Setup (0:15 - 1:00): Weekly format, theme, what viewer will see

ACT 1: THE TOOLS (1:00 - 5:00)
├── Tool 1: What was learned + personal win
├── Tool 2: Key insight + B-roll suggestion
├── Tool 3: Breakthrough moment
└── Tool 4: Connection to bigger picture

ACT 2: THE STUDY & BUILD (5:00 - 8:00)
├── Study Game: What was noticed/learned
├── The Prototype: What emerged from the week
└── Technical Highlight: Shader, mechanic, or technique

ACT 3: THOUGHTS (8:00 - 9:30)
├── Theme from audio notes (AI, industry, creativity, etc.)
├── Personal perspective
└── Honest take (not preachy)

OUTRO (9:30 - 10:00)
├── Recap: Tools touched, thing shipped
├── Tease: Next week preview
└── CTA: Subscribe, comment prompt
```

## Shorts Extraction Pattern

Extract 6-8 shorts from different categories:

| Type | Source | Example |
|------|--------|---------|
| Tool Tip | Curriculum files | "Blender Navigation in 30 Seconds" |
| Shader/VFX | Game study shaders | "Snow Shader in Godot" |
| Game Dev Process | GDD, design decisions | "Why the Event Dice Mechanic Works" |
| Commentary | Audio notes opinions | "AI as Creative Accelerator" |
| Study Insights | Game analysis | "Why I Started with Kingdom Rush" |

Each short needs:
- Script (30-60 sec spoken)
- Type classification
- Source file reference
- B-roll suggestions
- Platform recommendation (YouTube Shorts, TikTok, both)

## Process

1. **Read audio notes first**
   - Identify main themes user wants to cover
   - Note any opinions or commentary topics
   - Find the emotional hook

2. **Explore curriculum**
   - Read each day's file for that week
   - Extract personal wins (look for user's own notes at bottom of files)
   - Identify breakthrough moments
   - Note specific tools and techniques

3. **Explore game study**
   - Read GDD if present
   - Find shaders, scripts, interesting implementations
   - Identify visual elements good for B-roll
   - Note the "shipped" artifact

4. **Ask clarifying questions** (use AskUserQuestion)
   - Confirm video length target (~10 min default)
   - Any specific topics to emphasize or skip?
   - Shorts preferences?

5. **Generate script.md**
   - Follow template structure
   - Include user's authentic voice from their notes
   - Add [B-roll: description] markers
   - Include production notes section

6. **Generate shorts-plan.md**
   - 6-8 shorts with full scripts
   - Publishing schedule suggestion
   - Production notes for batch filming

## Output Files

Create in `Content/youtube-longform/week-{N}/`:
- `script.md` - Full video script with timestamps
- `shorts-plan.md` - Shorts extraction with scripts

## Example Invocation

```
/yt-initial-prep 2
```

This reads week 2 materials and generates:
- `Content/youtube-longform/week-2/script.md`
- `Content/youtube-longform/week-2/shorts-plan.md`

## Quality Checklist

Before finishing, verify:
- [ ] Script hits ~10 min when read aloud (rough estimate)
- [ ] Each Act has clear transitions
- [ ] Personal wins from curriculum are included
- [ ] Audio notes themes are addressed
- [ ] B-roll suggestions are actionable
- [ ] Shorts can stand alone (don't assume viewers saw longform)
- [ ] Production notes list all footage needed
- [ ] Week's OP-Z loop is referenced for music

## Curriculum Note Patterns

Look for these patterns in curriculum files to find personal wins:
- Lines at end of file (user's own additions)
- Phrases like "this works", "I did it", "kinda sick"
- Exclamation points
- Informal language breaks from template

These authentic moments make the best video content.
