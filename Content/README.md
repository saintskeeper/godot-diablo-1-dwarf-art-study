# Content Wheel Workflow

Weekly content production system for WaltMakes. Transforms one week of game study work into:

- 1 long-form YouTube video (10 min)
- 5-8 YouTube Shorts
- 28-30 Twitter posts (4/day)
- 1 blog post
- 1 Itch.io devlog

---

## Directory Structure

```
Content/
├── recordings/week-{N}/       # Raw screen recordings
├── youtube-longform/week-{N}/ # Scripts, shorts plans
├── shorts/                    # Exported short clips
├── twitter/week-{N}/          # Post banks, images
├── itch/                      # Devlog HTML files
├── raw-videos/                # Unedited footage
└── src-generator/             # Source templates
```

---

## Weekly Calendar

### Recording Phase (Week N - During Development)

| Day | Capture |
|-----|---------|
| Mon-Sat | Screen record sessions, WIP screenshots |
| Sunday | Final prototype, batch talking head segments |

### Publishing Phase (Week N+1)

| Day | Twitter (4/day) | YouTube | Blog/Itch |
|-----|-----------------|---------|-----------|
| Mon | WIP, Process, Engage, Tip | Short #1 (8am) | - |
| Tue | Tip, WIP, Story, CTA | Short #2 (8am) | - |
| Wed | Process, Tip, Engage, WIP | Short #3 (8am) | Blog drops |
| Thu | Story, Process, Tip, CTA | **LONGFORM (10am)** | - |
| Fri | WIP, Engage, Tip, Tip | Short #4 (8am) | - |
| Sat | Story, WIP, Process, CTA | Short #5 (8am) | Itch drops |
| Sun | Engage, Tip, Engage, Preview | Short #6 | - |

**Twitter posting times:** 7am, 12pm, 5pm, 9pm

---

## Skills & Commands

### Sunday (Batch Production Day)

```bash
# 1. Generate YouTube script and shorts plan
/yt-initial-prep {week}
# Output: youtube-longform/week-{N}/script.md, shorts-plan.md

# 2. Generate Twitter content bank
/twitter-week-content {week}
# Output: twitter/week-{N}/posts.md
```

### Monday-Wednesday

```bash
# 3. Generate blog post from video script
/blog-from-youtube {week}
# Output: /Publishing/content/Blog/.../articles/week-{N}-{slug}.mdx

# 4. Generate cover art for blog
/generate_cover {slug}
```

### After Video Edit

```bash
# 5. Finalize shorts with timestamps
/youtube-shorts-from-longform {week}
# Output: youtube-longform/week-{N}/shorts-final.md
```

### Saturday

```bash
# 6. Generate Itch.io devlog
/itch-weekly-update {week}
# Output: itch/week-{N}-devlog.html
```

---

## Quick Reference

### Twitter Content Mix (28-30 posts)

| Type | Count | Example |
|------|-------|---------|
| PROCESS | 7-8 | "before/after on the tavern scene..." |
| TIPS | 8-10 | "Godot tip: use @export vars for..." |
| WIP | 5-6 | "current state of week 3 prototype..." |
| ENGAGE | 4-5 | "question for godot devs: how do you..." |
| CTA | 4 | "new video: Week 3 making games..." |
| STORY | 2-3 | "started this because my dad got sick..." |
| THREADS | 2-3 | Multi-tweet process breakdowns |
| PREVIEW | 1 | "Week 4 starts tomorrow..." |

### Thread Format (Tweet Hunter)

```
---TWEET 1---
Hook that stands alone

---TWEET 2---
Continue the story

---TWEET 3---
Build to payoff

---TWEET 4---
Deliver value + CTA

---END THREAD---
```

### Shorts Categories

| Type | Hook Pattern |
|------|--------------|
| Tool Tip | "The [tool] trick no one talks about" |
| Process Reveal | "Watch this work on the first try" |
| Hot Take | "Unpopular opinion:" |
| Quick Win | "I made this in [timeframe]" |

### Cross-Platform Distribution

| Content | Platforms |
|---------|-----------|
| Tool Tips | YT Shorts + Twitter |
| Process Reveals | YT Shorts + Twitter + TikTok |
| Hot Takes | Twitter + TikTok |
| Quick Wins | All platforms |

---

## Checklist Templates

### Sunday Batch Day

- [ ] Finalize prototype to "shippable ugly"
- [ ] Record prototype demo (1-2 min)
- [ ] Run `/yt-initial-prep {week}`
- [ ] Review/edit script.md
- [ ] Batch record talking head (hook, thoughts, outro)
- [ ] Run `/twitter-week-content {week}`
- [ ] Queue images for Twitter posts

### Publishing Week

- [ ] Edit long-form video
- [ ] Export Shorts #1-3
- [ ] Run `/blog-from-youtube {week}`
- [ ] Add images to blog, run `/generate_cover`
- [ ] Publish blog (Wednesday)
- [ ] Upload long-form (Thursday 10am)
- [ ] Run `/youtube-title` and `/youtube-thumbnail`
- [ ] Export remaining Shorts
- [ ] Run `/itch-weekly-update {week}`
- [ ] Publish Itch devlog (Saturday)
- [ ] Upload asset pack if applicable

---

## File Naming Conventions

| Content | Pattern |
|---------|---------|
| Screen recordings | `recordings/week-{N}/session-{date}.mov` |
| Screenshots | `twitter/week-{N}/images/{description}.png` |
| YouTube script | `youtube-longform/week-{N}/script.md` |
| Shorts plan | `youtube-longform/week-{N}/shorts-final.md` |
| Twitter posts | `twitter/week-{N}/posts.md` |
| Blog post | `/Publishing/.../articles/week-{N}-{slug}.mdx` |
| Itch devlog | `itch/week-{N}-devlog.html` |

---

## Voice Quick Reference

**Do:**
- First person, conversational
- Specific details ("got 8 bars" not "made progress")
- Honest about struggles
- Include tool names

**Avoid:**
- Marketing hype ("excited to announce")
- Hashtag spam
- Vague updates
- Over-apologizing

---

*See individual skill files in `~/.claude/skills/` for detailed documentation.*
