# Ambient Audio & Sound Layers

> Week 2 | Friday | Music 🎵

## Curriculum Task

**Evening (25 min):** Audio Identity
- Create or find audio that fits YOUR version
- Layer ambient sounds + point sources
- The audio should match your reinterpretation, not the original

---

## Written Resources

### How To Make Ambiences For Games (Game Audio Learning)
- **URL:** https://www.gameaudiolearning.com/knowledgebase/how-to-make-ambiences-for-games
- **Why:** Comprehensive guide to game ambient sound design
- **Key takeaways:**
  - Use layered approach: base ambience + point sources
  - Ambient bed persists when player enters environment
  - Detail sounds recorded separately, added as spot effects

### Creating Audio Soundscapes for Video Games (Splice)
- **URL:** https://splice.com/blog/audio-soundscape-for-video-games/
- **Why:** Practical techniques for building atmosphere
- **Key takeaways:**
  - Start with subtle ambient foundation
  - Gradually add distinct elements as needed
  - Avoid overwhelming the player

### The Art of Immersion: Ambient Audio (Wayline)
- **URL:** https://www.wayline.io/blog/ambient-audio-game-worlds
- **Why:** Focus on emotional atmosphere through sound
- **Key takeaways:**
  - Ambience influences emotions and controls mood
  - Can use abstract sounds (synth drones) for unnatural atmospheres
  - Repetition kills immersion — add variation

---

## The Layered Approach

### Layer 1: Base Ambience (Always playing)
```
Low, continuous sound that defines the space
- Cave: distant water drip, wind echo
- Forest: wind through leaves, distant birds
- Dungeon: low rumble, distant chains
- Town: crowd murmur, distant activity

Should be:
- Seamlessly looping
- Low in the mix (foundation, not focus)
- Not distracting
```

### Layer 2: Point Sources (Spatial)
```
Sounds attached to specific locations/objects
- Torch: fire crackle
- Fountain: water flow
- Machine: mechanical hum
- Character: breathing, footsteps

Should be:
- Positioned in space (if 2D, use panning)
- Volume based on distance
- Can be one-shot or looping
```

### Layer 3: Random Events (Occasional)
```
Sounds that happen randomly to prevent monotony
- Bird calls
- Distant thunder
- Creaking wood
- Footsteps in the distance

Should be:
- Infrequent (every 10-30 seconds)
- Randomized timing
- Multiple variations to avoid repetition
```

---

## Audio in Godot

### Basic Setup

```
Scene
├── Ambience
│   ├── BaseAmbience (AudioStreamPlayer)
│   ├── TorchSound (AudioStreamPlayer2D)  — positioned at torch
│   └── RandomEvents (Node with script)
```

### AudioStreamPlayer (Non-positional)
```
For: Base ambience, music, UI sounds
- Add AudioStreamPlayer node
- Assign your .wav or .ogg to Stream
- Set Autoplay: ON for ambience
- Adjust Volume dB
```

### AudioStreamPlayer2D (Positional)
```
For: Point sources (fire, water, etc.)
- Add AudioStreamPlayer2D node
- Position at sound source
- Assign audio to Stream
- Adjust Max Distance (how far sound travels)
- Adjust Attenuation (how sound fades with distance)
```

### Looping Audio

```
1. Import your audio file
2. In FileSystem, click the audio file
3. In Import dock:
   - Loop: ON
   - Click "Reimport"
```

### Random Event Script

```gdscript
# random_sounds.gd
extends Node

@export var sounds: Array[AudioStream] = []
@export var min_interval: float = 10.0
@export var max_interval: float = 30.0

@onready var player = $AudioStreamPlayer

var timer: float = 0.0
var next_play: float = 0.0

func _ready():
    next_play = randf_range(min_interval, max_interval)

func _process(delta):
    timer += delta
    if timer >= next_play:
        play_random_sound()
        timer = 0.0
        next_play = randf_range(min_interval, max_interval)

func play_random_sound():
    if sounds.size() > 0:
        player.stream = sounds.pick_random()
        player.play()
```

---

## Finding/Creating Audio

### Free Sound Sources

| Source | URL | Notes |
|--------|-----|-------|
| Freesound.org | freesound.org | Huge library, check licenses |
| Pixabay | pixabay.com/sound-effects | Free, no attribution |
| OpenGameArt | opengameart.org | Game-specific sounds |
| Zapsplat | zapsplat.com | Free with attribution |

### Creating with OP-Z

For YOUR interpretation, consider creating custom ambience:

```
Ambient Pad:
1. Use a soft synth sound (Chord or Lead track)
2. Long attack, long release
3. Minimal notes — just drones
4. Layer multiple takes with slight detuning

Point Sources:
1. Use punch-in effects for one-shots
2. Sample mode for custom sounds
3. Keep it simple — single tones or textures
```

### Procreate + GarageBand (iOS)

```
1. Record sounds with your phone
2. Import to GarageBand
3. Apply effects (reverb, EQ)
4. Export as .wav
5. Import to Godot
```

---

## Audio Design for Mood

Match audio to your scene's emotion:

| Mood | Base Ambience | Point Sources | Random Events |
|------|---------------|---------------|---------------|
| Cozy | Gentle wind, fire crackle | Hearth fire, bubbling pot | Wood settling, distant owl |
| Eerie | Low drone, distant echoes | Dripping water, chains | Whispers, footsteps |
| Tense | Heartbeat-like pulse | Electric hum, breathing | Metal groans, scratches |
| Mystical | Ethereal pads, chimes | Crystal resonance, magic hum | Bells, celestial sounds |
| Grim | Industrial rumble | Clanking, steam hiss | Crows, distant screams |

---

## Mixing Tips

### Volume Hierarchy
```
1. Dialogue/UI (loudest) — not applicable for scene study
2. Point sources (mid-loud) — things the player should notice
3. Base ambience (quiet) — foundation, not distracting
4. Random events (varies) — occasional punctuation
```

### Frequency Balance
```
- Too much bass = listener fatigue, impacts lose punch
- Ambience should be "light" — leave room for everything else
- Use EQ to carve space between layers
```

### Testing
```
- Play for 2+ minutes — does it get annoying?
- Mute it — does the scene feel empty?
- Is any single element too prominent?
- Does it match the FEELING of your visuals?
```

---

## Quick Implementation

### Minimal Setup (5 min)
```
1. Add AudioStreamPlayer
2. Find a looping ambient track that fits
3. Assign to Stream
4. Autoplay: ON
5. Adjust volume until it sits behind visuals
```

### Better Setup (15 min)
```
1. Base ambience (AudioStreamPlayer)
2. 1-2 point sources (AudioStreamPlayer2D at locations)
3. Looping enabled on all
4. Volumes balanced
```

### Full Setup (25 min)
```
1. Base ambience layer
2. Multiple point sources
3. Random event script with 3-5 sounds
4. All volumes mixed
5. Matches your visual mood
```

---

## Pro Tips

1. **Audio sells the vibe** — even great visuals feel empty without sound
2. **Your interpretation needs YOUR audio** — don't just copy reference's sounds
3. **Silence is a tool** — not every moment needs sound
4. **Test with eyes closed** — does the audio alone evoke the mood?
5. **Layer subtly** — you should barely notice individual elements

### Common Mistakes
- Ambience too loud (should be barely noticeable)
- No variation (gets boring fast)
- Wrong mood (audio and visuals fighting)
- Too many layers (audio mud)
- Forgetting to loop

---

## This Week's Success Criteria

- [ ] Base ambience track playing
- [ ] At least one point source (fire, water, etc.)
- [ ] Audio loops cleanly
- [ ] Volumes are balanced
- [ ] Mood matches your visual interpretation
- [ ] Audio is YOURS, not copied from reference
