# Pre-Pair Resources for Week $ARGUMENTS

Prepare learning resources for Week $ARGUMENTS of the Q1 curriculum.

## Instructions

1. **Read the curriculum** from `docs/quarters/curriculum-q1.md` and extract Week $ARGUMENTS's activities

2. **For each activity in that week**, gather resources:
   - 1-2 written articles/tutorials (beginner-friendly, step-by-step)
   - 1-2 YouTube videos (under 30 min preferred, matching the skill level)
      - IF videos are longer than 15min be sure to write out WHERE in the video relevent content is
   - Focus on the specific techniques mentioned in the curriculum

3. **Create resource files** under `resources/week-$ARGUMENTS/`:
   - Use format: `{day}-{domain}-{description}.md`
   - Example: `monday-art-procreate-brushes.md`, `tuesday-blender-viewport-navigation.md`

4. **Each resource file should contain**:
   ```markdown
   # [Activity Title]

   > Week $ARGUMENTS | [Day] | [Domain]

   ## Curriculum Task
   [Copy the specific task from curriculum-q1.md]

   ## Written Resources

   ### [Article Title]
   - **URL:** [link]
   - **Why:** [1 sentence on why this helps]
   - **Key takeaways:** [2-3 bullet points]

   ## Video Resources

   ### [Video Title]
   - **URL:** [YouTube link]
   - **Duration:** [X min]
   - **Why:** [1 sentence on why this helps]
   - **Timestamps:**
     - 0:00 - [topic]
     - X:XX - [relevant section]

   ## Quick Reference
   [Any shortcuts, commands, or quick tips extracted from resources]
   ```

5. **Search strategy by domain**:
   - **Blender**: Search "Blender [technique] beginner tutorial 2024/2025"
   - **Procreate**: Search "Procreate [technique] tutorial iPad"
   - **Godot**: Search "Godot 4 [feature] tutorial"
   - **OP-Z**: Search "OP-Z [technique] tutorial" or "Teenage Engineering OP-Z"

6. **After gathering**, create a `resources/week-$ARGUMENTS/README.md` summary:
   ```markdown
   # Week $ARGUMENTS Resources

   > [Week Theme from curriculum]

   ## This Week's Focus
   [Brief description]

   ## Resource Index
   | Day | Domain | File | Status |
   |-----|--------|------|--------|
   | Mon | Art | [link to file] | Ready |
   | ... | ... | ... | ... |

   ## Time Estimates
   - Pre-reading: ~X min
   - Video watching: ~X min
   - Total prep: ~X min
   ```

7. **Save all web research** to the resource files (not ai-docs) since these are curriculum-specific

## Output

When complete, report:
- Number of resource files created
- Total estimated prep time
- Any activities where resources were hard to find
