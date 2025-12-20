# OP-Z Step Components - Week 7 Curriculum

## Overview
Step components offer unlimited variation for audio tracks, enabling each step to be configured with pitch, sequencing, parameter actions, and more. This week focuses on mastering the 14 step components to create evolving patterns, polyrhythms, and generative sequences.

**Key Concept**: Step components ensure the 16-step limitation becomes a creative advantage through layering, chaining, and combining components.

---

## Hardware Reference

```
COMPONENT KEYS (white keys):
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ F │ G │ A │ B │ C │ D │ E │ F │ G │ A │ B │ C │ D │ E │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
│PLS│HLD│MUL│VEL│ UP│ DN│RND│PRT│SWP│TON│JMP│PRM│CMP│TRG│

VALUE KEYS (black keys):
┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐
│1 │2 │3 │4 │5 │6 │7 │8 │9 │0 │
└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘

STEP BUTTONS:
┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │10 │11 │12 │13 │14 │15 │16 │
└───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
```

---

## Day 1: Foundations & Time-Based Components (20 minutes)

### Learning Objectives
- Understand step component basics
- Master Pulse and Pulse Hold
- Learn component assignment workflow

### Exercise 1.1: Adding Your First Step Component (5 min)

**Create a simple kick pattern on Track 1:**
1. (Track) + [1] to select Kick track
2. Tap [1], [5], [9], [13] to create 4-on-floor pattern
3. Press (Play) to hear it

**Add Pulse component to step 13:**
1. Hold (Shift) + [13] - LED flashes green
2. Still holding (Shift), press (F) - Pulse component
3. Still holding (Shift), press [4] - Count 4 setting
4. Release (Shift)
5. Listen - step 13 now re-triggers 4 times, extending the pattern

**What's happening?**: The pattern now extends beyond 16 steps because Pulse adds extra triggers.

### Exercise 1.2: Pulse Hold for Sustained Notes (5 min)

**Create a bass line on Track 5:**
1. (Track) + [5] to select Bass track
2. Tap [1], [7], [13] to add bass notes
3. Press (Play)

**Add Pulse Hold to step 7:**
1. Hold (Shift) + [7]
2. Still holding (Shift), press (G) - Pulse Hold
3. Still holding (Shift), press [6] - Count 6
4. Release (Shift)
5. Listen - step 7 holds for 6 counts

**Difference**: Pulse re-triggers, Pulse Hold sustains the note.

### Exercise 1.3: Multiply Component (5 min)

**Add Multiply to create rapid-fire hi-hats:**
1. (Track) + [3] to select Hi-Hat track
2. Tap [9] to add a hi-hat on step 9
3. Hold (Shift) + [9]
4. Still holding (Shift), press (A) - Multiply
5. Still holding (Shift), press [8] - x8 multiply
6. Release (Shift)
7. Listen - step 9 now plays 8 times within the same step duration

**Key Insight**: Multiply does NOT extend pattern length, it fits all triggers within the step.

### Exercise 1.4: Viewing Components (5 min)

**Check your work:**
1. Hold (Shift) and observe LEDs:
   - Dull red = step with trigger only
   - Green = step with component assigned
2. Hold (Shift) + [13] to see Pulse component lit white
3. Hold (Shift) + [7] to see Pulse Hold lit white
4. Hold (Shift) + [9] to see Multiply lit white

**Practice**: Add and remove components:
- To delete: Hold (Shift) + [step], tap the lit white component key, release (Shift)

---

## Day 2: Note-Based Components (25 minutes)

### Learning Objectives
- Master Velocity variations
- Explore Ramp Up, Ramp Down, Random
- Create evolving melodic patterns

### Exercise 2.1: Velocity for Humanization (7 min)

**Create a snare pattern with velocity variation:**
1. (Track) + [2] to select Snare track
2. Tap [5], [13] for snare hits
3. Add velocity to step 5:
   - Hold (Shift) + [5]
   - Press (B) - Velocity
   - Press [2] - setting -3 (quieter)
   - Release (Shift)
4. Add velocity to step 13:
   - Hold (Shift) + [13]
   - Press (B) - Velocity
   - Press [7] - setting +2 (louder)
   - Release (Shift)
5. Listen - notice the dynamic variation

**Experiment**: Try setting step 5 to [0] (Random) for unpredictable velocities.

### Exercise 2.2: Ramp Up for Rising Melodies (6 min)

**Create an ascending lead line:**
1. (Track) + [6] to select Lead track
2. Tap [1] to add a note
3. Hold (Shift) + [1]
4. Press (C) - Ramp Up
5. Press [4] - 5 Steps, 1 Octave
6. Release (Shift)
7. Listen - the pitch rises one step per pattern cycle

**Visual representation:**
```
Cycle 1: Original note
Cycle 2: +1 step up
Cycle 3: +2 steps up
Cycle 4: +3 steps up
Cycle 5: +4 steps up
Cycle 6: Back to original (resets)
```

### Exercise 2.3: Ramp Down for Falling Bass (6 min)

**Create a descending bass:**
1. (Track) + [5] to select Bass track
2. Clear previous pattern: (Track) + Hold (Shift) + (Stop)
3. Tap [4] to add a bass note
4. Hold (Shift) + [4]
5. Press (D) - Ramp Down
6. Press [3] - 4 Steps, 1 Octave
7. Release (Shift)
8. Listen over multiple cycles - pitch descends

### Exercise 2.4: Random Pitch Variation (6 min)

**Create generative melody:**
1. (Track) + [7] to select Arp track
2. Tap [2], [6], [10], [14] for four notes
3. Add Random to step 6:
   - Hold (Shift) + [6]
   - Press (E) - Random
   - Press [2] - 3 Steps, 1 Octave
   - Release (Shift)
4. Add Random to step 14:
   - Hold (Shift) + [14]
   - Press (E) - Random
   - Press [5] - 6 Steps, 1 Octave
   - Release (Shift)
5. Listen - steps 6 and 14 change pitch randomly within range each cycle

**Creative tip**: Combine multiple Random components on different steps for generative melodies.

---

## Day 3: Note Modulation Components (30 minutes)

### Learning Objectives
- Master Portamento for glides
- Use Sweep for filter movement
- Apply Tonality for transposition

### Exercise 3.1: Portamento Glides (10 min)

**Create smooth gliding bass:**
1. (Track) + [5] to select Bass track
2. Clear track: (Track) + Hold (Shift) + (Stop)
3. Create pattern: Tap [1], [5], [9], [13]
4. Use {Pitch} encoder to set different pitches for each step

**Add portamento:**
1. Hold (Shift) + [5]
2. Press (F) second white F - Portamento
3. Press [4] - Glide 4
4. Release (Shift)
5. Repeat for steps 9 and 13 with different glide times:
   - Step 9: Glide [2]
   - Step 13: Glide [7] (longer)
6. Listen - notes glide from previous pitch

**Settings guide:**
- [1]-[8]: Glide time 1-8 (1=fastest, 8=longest)
- [9]: Direct (no glide, step change)
- [0]: Random glide time

### Exercise 3.2: Sweep for Filter Movement (10 min)

**Add filter sweeps to lead:**
1. (Track) + [6] to select Lead track
2. Create held notes: Tap [1], [9]
3. Increase note length with {Note Length} encoder

**Add filter sweep:**
1. Hold (Shift) + [1]
2. Press (A) second white A - Sweep
3. Press [1] - Filter Up then Down
4. Release (Shift)
5. Listen - filter sweeps up then down over note duration

**Try different sweep types:**
1. Hold (Shift) + [9]
2. Press (A) - Sweep
3. Press [5] - Pan (sweeps left to right)
4. Release (Shift)

**Sweep options:**
- [1]: Filter Up/Down
- [2]: Filter Down/Up
- [3]: Synth Parameter 1 Up/Down
- [4]: Synth Parameter 1 Down/Up
- [5]: Pan
- [6]-[0]: Long versions (double length)

### Exercise 3.3: Tonality for Harmonic Shifts (10 min)

**Create chord-following melody:**
1. (Track) + [8] to select Chord track
2. Add chord progression (see Week 6 curriculum)
3. (Track) + [6] for Lead track
4. Tap [3], [7], [11], [15] for melody

**Add tonality:**
1. Hold (Shift) + [7]
2. Press (B) second white B - Tonality
3. Press [4] - Offset Fifth
4. Release (Shift)
5. Step 7 now transposes up a fifth following the chord

**Try more tonality settings:**
1. Hold (Shift) + [11]
2. Press (B) - Tonality
3. Press [5] - Offset Third
4. Release (Shift)

**Tonality options:**
- [1]: Ignore chord progression
- [2]: Transpose only
- [3]: Offset Octave
- [4]: Offset Fifth
- [5]: Offset Third
- [6]: Chromatic Up
- [7]: Chromatic Down
- [8]-[0]: Quantize settings

---

## Day 4: Trigger-Based Components & Sparks (25 minutes)

### Learning Objectives
- Master Jump for pattern navigation
- Use Trigger Spark for variation
- Understand Parameter and Component Spark
- Create evolving drum patterns

### Exercise 4.1: Jump Components (7 min)

**Create a jumping sequence:**
1. (Track) + [1] to select Kick track
2. Clear and create: [1], [5], [9], [13]
3. Hold (Shift) + [9]
4. Press (C) second white C - Jump
5. Press [1] - Jump to Start
6. Release (Shift)
7. Listen - pattern jumps back to start at step 9, never reaching 13

**Try different jumps:**
1. Hold (Shift) + [5]
2. Press (C) - Jump
3. Press [5] - Jump Forward
4. Release (Shift)
5. Pattern now skips ahead from step 5

**Jump options:**
- [1]: Jump to Start
- [2]: Jump to 2/4 (step 5)
- [3]: Jump to 3/4 (step 9)
- [4]: Jump to 4/4 (step 13)
- [5]: Jump Forward 1 step
- [6]: Jump Back 1 step
- [7]: Jump Random
- [8]: Stay (don't advance)
- [9]: Align to Global Track

### Exercise 4.2: Trigger Spark for Evolving Patterns (8 min)

**Create a hi-hat pattern that evolves:**
1. (Track) + [3] to select Hi-Hat track
2. Create pattern: [2], [4], [6], [8], [10], [12], [14], [16]

**Add trigger spark to create variation:**
1. Hold (Shift) + [4]
2. Press (E) second white E - Trigger Spark
3. Press [2] - Pattern 1,2 (plays on cycle 1 and 2, silent on cycle 3+)
4. Release (Shift)

5. Hold (Shift) + [8]
6. Press (E) - Trigger Spark
7. Press [4] - Pattern 1,2,3,4 (plays every 4 cycles)
8. Release (Shift)

9. Hold (Shift) + [12]
10. Press (E) - Trigger Spark
11. Press [3] - Pattern 1,2,3
12. Release (Shift)

**Listen over 8+ cycles** - the pattern evolves and changes!

**Trigger Spark settings:**
- [1]: Every cycle
- [2]: Cycles 1,2 only
- [3]: Cycles 1,2,3 only
- [4]: Cycles 1,2,3,4
- [5]: Cycles 1,2,3,4,5
- [9]: Random
- [0]: Reset Counter

### Exercise 4.3: Parameter Spark (5 min)

**Make filter cutoff change on specific cycles:**
1. (Track) + [6] to select Lead track
2. Add a long note on [1]
3. Change filter cutoff parameter with encoder
4. Hold (Shift) + [1]
5. Press (D) second white D - Parameter Spark
6. Press [4] - Trigger on cycles 1,2,3,4
7. Release (Shift)
8. Listen - filter change only happens every 4 cycles

### Exercise 4.4: Component Spark (5 min)

**Make a Multiply component only trigger on certain cycles:**
1. (Track) + [2] to select Snare
2. Add snare on [13]
3. Add Multiply to step 13:
   - Hold (Shift) + [13]
   - Press (A) - Multiply
   - Press [3] - x3
   - Release (Shift)

**Add Component Spark to control when Multiply triggers:**
1. Hold (Shift) + [13]
2. Press (D) thirteenth white key - Component Spark
3. Press [4] - Trigger component on cycles 1,2,3,4
4. Release (Shift)
5. Listen - the snare roll only happens every 4 cycles!

**Key concept**: Component Spark controls whether OTHER components on the same step activate.

---

## Day 5: Layering & Advanced Techniques (30 minutes)

### Learning Objectives
- Layer multiple components on single steps
- Create complex evolving patterns
- Build a complete track using step components
- Master component workflow

### Exercise 5.1: Layering Multiple Components (10 min)

**Create a super-powered snare fill:**
1. (Track) + [2] to select Snare
2. Clear track: (Track) + Hold (Shift) + (Stop)
3. Add snare on [16]

**Layer components:**
1. Add Multiply:
   - Hold (Shift) + [16]
   - Press (A) - Multiply
   - Press [6] - x6
   - Release (Shift)

2. Add Velocity variation:
   - Hold (Shift) + [16]
   - Press (B) - Velocity
   - Press [0] - Random
   - Release (Shift)

3. Add Trigger Spark:
   - Hold (Shift) + [16]
   - Press (E) second white E - Trigger Spark
   - Press [2] - Plays cycles 1,2
   - Release (Shift)

4. Add Component Spark to control Multiply:
   - Hold (Shift) + [16]
   - Press (D) thirteenth white - Component Spark
   - Press [4] - Component active cycles 1,2,3,4
   - Release (Shift)

**Result**: A snare fill that only happens every other cycle, with random velocities, and the multiply only triggers every 4th cycle. Complex variation!

### Exercise 5.2: Viewing Multiple Components (5 min)

**Check layered components:**
1. Hold (Shift) + [16] while looking at step 16
2. All active components show lit white:
   - (A) Multiply
   - (B) Velocity
   - (D) Component Spark
   - (E) Trigger Spark

**Practice changing values:**
1. Hold (Shift) + [16]
2. LONG PRESS (A) - Multiply component
3. Press [8] - change to x8
4. Release (Shift)

**Remember**: LONG PRESS the component key to change its value without deleting it.

### Exercise 5.3: Editing Component Values (5 min)

**Change existing component settings:**
1. Hold (Shift) + [16]
2. LONG PRESS (B) - Velocity (hold it down)
3. Press [7] - set to +2 (louder)
4. Release (Shift)

**Delete a component:**
1. Hold (Shift) + [16]
2. QUICK TAP (D) - Component Spark (tap quickly)
3. Release (Shift)
4. Component Spark is now removed

### Exercise 5.4: Complete Track Creation (10 min)

**Build a complete evolving pattern using step components:**

**Kick Track (Track 1):**
1. Pattern: [1], [5], [9], [13]
2. Add Pulse to [13]:
   - (Shift) + [13] > (F) > [2] > Release

**Snare Track (Track 2):**
1. Pattern: [5], [13]
2. Add Multiply to [13]:
   - (Shift) + [13] > (A) > [4] > Release
3. Add Trigger Spark to [13]:
   - (Shift) + [13] > (E) > [4] > Release

**Hi-Hat Track (Track 3):**
1. Pattern: [1], [3], [5], [7], [9], [11], [13], [15]
2. Add Velocity Random to [3], [7], [11], [15]:
   - For each: (Shift) + [step] > (B) > [0] > Release
3. Add Trigger Spark to [7]:
   - (Shift) + [7] > (E) > [3] > Release

**Bass Track (Track 5):**
1. Pattern: [1], [7], [13]
2. Set different pitches with {Pitch} encoder
3. Add Portamento to [7] and [13]:
   - For each: (Shift) + [step] > (F) Portamento > [5] > Release
4. Add Ramp Down to [1]:
   - (Shift) + [1] > (D) Ramp Down > [4] > Release

**Lead Track (Track 6):**
1. Pattern: [4], [12]
2. Add Sweep to [4]:
   - (Shift) + [4] > (A) Sweep > [1] > Release
3. Add Random to [12]:
   - (Shift) + [12] > (E) Random > [3] > Release
4. Add Trigger Spark to [12]:
   - (Shift) + [12] > (E) Trigger Spark > [5] > Release

**Listen and refine** - Your pattern should evolve over many cycles!

---

## Quick Reference Card

### Step Component Workflow

**Adding a Component:**
```
1. Hold (Shift)
2. Press [Step 1-16]
3. Press Component Key (white F-E)
4. Press Value Key (black 1-0)
5. Release (Shift)
```

**Changing Component Value:**
```
1. Hold (Shift)
2. Press [Step]
3. LONG PRESS Component Key
4. Press new Value Key
5. Release (Shift)
```

**Deleting a Component:**
```
1. Hold (Shift)
2. Press [Step]
3. QUICK TAP Component Key
4. Release (Shift)
```

**Viewing Components:**
```
Hold (Shift) to see:
- Dull red = trigger only
- Green = has component
- Lit white = active components
```

**Delete All Components on Track:**
```
1. (Track) + [Step] to select track
2. Hold (Shift) + (Stop)
3. Wait for green LED sequence
4. Release buttons
```

### 14 Step Components Summary

**TIME-BASED COMPONENTS:**
1. **Pulse (F)** - Re-triggers step by count, extends pattern
2. **Pulse Hold (G)** - Holds note by count, extends pattern
3. **Multiply (A)** - Multiplies triggers within step, no extension

**NOTE-BASED COMPONENTS:**
4. **Velocity (B)** - Sets trigger strength (-4 to +3, Mute, Random)
5. **Ramp Up (C)** - Pitch rises each cycle (2-6 steps, 1-3 octaves)
6. **Ramp Down (D)** - Pitch falls each cycle (2-6 steps, 1-3 octaves)
7. **Random (E)** - Random pitch change each cycle (2-6 steps, 1-3 octaves)
8. **Portamento (F second)** - Glide from previous note (Glide 1-8, Direct, Random)
9. **Sweep (A second)** - Sweeps parameters over cycle (Filter, Synth P1, Pan, Long versions)
10. **Tonality (B second)** - Transposes by condition (Ignore, Offset, Chromatic, Quantize)

**TRIGGER-BASED COMPONENTS:**
11. **Jump (C second)** - Relocates next step (Start, 2/4, 3/4, 4/4, Fwd, Back, Random, Stay, Align, Gate)
12. **Parameter Spark (D second)** - Sets when parameter triggers (1-8 cycle patterns, Random, Reset)
13. **Component Spark (D thirteenth)** - Sets when components trigger (1-8 cycle patterns, Random, Reset)
14. **Trigger Spark (E second)** - Sets when step triggers (1-8 cycle patterns, Random, Reset)

### LED Indicators

**When (Shift) is held:**
- **Dull Red** = Step has trigger, no component
- **Green** = Step has component assigned
- **Green Flashing** = Currently selected step
- **White Lit** = Component is active on selected step

### Value Key Defaults

Most components default to setting **[4]** or **[5]**

**Common Values:**
- **Pulse/Hold**: [1]-[9] = Count 1-9, [0] = Random
- **Multiply**: [1]-[8] = x1-x8, [9] = Broken Chord, [0] = Quantize
- **Velocity**: [1] = -4, [5] = 0, [8] = +3, [9] = Mute, [0] = Random
- **Ramp/Random**: [1]-[5] = 2-6 steps/1 oct, [6]-[0] = 2-6 steps/3 oct
- **Sparks**: [1]-[8] = Pattern cycles, [9] = Random, [0] = Reset Counter

### Creative Tips

1. **Create longer-sounding patterns**: Use Trigger Spark to make steps play every 2-4 cycles
2. **Humanize drums**: Add Random Velocity to hi-hats and percussion
3. **Build evolving melodies**: Combine Ramp Up/Down with Trigger Spark
4. **Create fills**: Use Multiply + Trigger Spark on last step
5. **Generative sequences**: Multiple Random components on different steps
6. **Dynamic arrangements**: Parameter Spark to bring effects in/out
7. **Polyrhythms**: Pulse components with different counts on different tracks
8. **Complex variations**: Layer 3-4 components on key steps
9. **Controlled chaos**: Component Spark controls when other components activate
10. **Pattern extension**: Pulse/Hold extend beyond 16 steps for longer sequences

### Component Categories

**Extend Pattern Length:**
- Pulse
- Pulse Hold

**Stay Within 16 Steps:**
- Multiply
- Velocity
- Ramp Up/Down
- Random
- Portamento
- Sweep
- Tonality
- Jump
- All Sparks

### Practice Patterns

**Pattern 1 - Evolving Hi-Hat:**
```
Steps: All 16 steps triggered
Step 2: Velocity Random
Step 4: Trigger Spark [3]
Step 8: Trigger Spark [2]
Step 12: Trigger Spark [4]
Step 16: Multiply [4] + Trigger Spark [8]
```

**Pattern 2 - Rising Bass:**
```
Steps: [1], [7]
Step 1: Ramp Up [4]
Step 7: Portamento [5] + Velocity [7]
```

**Pattern 3 - Generative Lead:**
```
Steps: [3], [7], [11], [15]
Step 3: Random [3]
Step 7: Sweep [1] + Trigger Spark [4]
Step 11: Random [5] + Tonality [4]
Step 15: Multiply [2] + Component Spark [3]
```

---

## Week 7 Completion Checklist

- [ ] Can add step components using (Shift) workflow
- [ ] Understand difference between Pulse and Pulse Hold
- [ ] Can use Multiply for rapid-fire triggers
- [ ] Can add Velocity variations for dynamics
- [ ] Can create ascending/descending patterns with Ramp
- [ ] Can use Random for generative melodies
- [ ] Understand Portamento for pitch glides
- [ ] Can apply Sweep for filter/parameter movement
- [ ] Can use Tonality for harmonic transposition
- [ ] Can navigate patterns with Jump
- [ ] Can create evolving patterns with Trigger Spark
- [ ] Understand Parameter Spark vs Component Spark
- [ ] Can layer multiple components on one step
- [ ] Can view and edit existing components
- [ ] Can delete individual and all components
- [ ] Created a complete evolving track

---

## Next Week Preview

**Week 8: Master Track, Chord Progression & Advanced Sequencing**
- Master track programming
- Chord progressions and chord step components
- Advanced pattern chaining
- Song mode and arrangement

---

## Notes Section

**Key Insights from Practice:**

**Common Mistakes to Avoid:**
- Forgetting to hold (Shift) through entire process
- Quick tap vs long press when editing components
- Not listening over multiple cycles to hear Spark effects
- Adding too many components without understanding each one first

**Creative Discoveries:**

**Questions for Further Exploration:**
