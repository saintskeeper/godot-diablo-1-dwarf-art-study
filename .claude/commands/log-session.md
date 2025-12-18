# Create Daily Session Log

Create today's session log file for accountability tracking.

## Arguments
- `$ARGUMENTS` - Optional: domain override (art, blender, godot, opz, integration, review)

## Instructions

1. **Determine session details:**
   - Get today's date
   - Determine day of week
   - Map day to domain (unless overridden by argument):
     - Monday → art
     - Tuesday → blender
     - Wednesday → godot
     - Thursday → blender
     - Friday → opz
     - Saturday → integration
     - Sunday → review
   - Calculate week number: Week 1 started December 9, 2025

2. **Get curriculum task:**
   - Read `docs/quarters/curriculum-q1.md`
   - Find the task for today's week and day
   - If week > 12, check `docs/quarters/q2-q4.md`

3. **Create log file:**
   - Path: `logs/daily/week-{NN}/{YYYY-MM-DD}-{dow}-{domain}.md`
   - Create the week folder if it doesn't exist
   - Use the template from `docs/templates/daily-log.md`
   - Pre-fill:
     - `week:` with week number
     - `day:` with day of week (lowercase)
     - `domain:` with domain
     - `date:` with YYYY-MM-DD
     - `curriculum_task:` with today's task from curriculum

4. **Report:**
   - Log file path created
   - Today's curriculum task
   - Domain being worked on

## Day/Domain Quick Reference
```
MON = art (Procreate)
TUE = blender (Modeling)
WED = godot (Mechanics)
THU = blender (Render pipeline)
FRI = opz (Music/SFX)
SAT = integration (Godot assembly)
SUN = review (Ship + plan)
```

## Example Output

```
Created: logs/daily/week-01/2025-12-09-mon-art.md

Week 1 | Monday | Art
Task: Procreate orientation - canvas setup, brushes, basic shapes

Ready to log your session!
```
