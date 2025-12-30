# Engagement Launcher

A local dashboard for quickly engaging with social media posts from curated lists.

## What It Does

- Parses engagement target lists from markdown tables or JSON
- Displays posts as cards in a sidebar with stats, suggested comments, and copy buttons
- Opens posts in a positioned popup window for engagement (with your logged-in session)
- Tracks progress with "Done" checkboxes (persisted to localStorage)
- Keyboard navigation for speed

## Usage

### Quick Start (Makefile)

```bash
cd engage-launcher

make up                        # Start server with defaults
make down                      # Stop server
make restart                   # Restart server
make status                    # Check if running

# Custom options
make up INPUT=myfile.json      # Different input file
make up PORT=9000              # Different port
```

### Manual

```bash
source venv/bin/activate
python engage-launcher/launcher.py path/to/posts.md
python engage-launcher/launcher.py path/to/posts.json --port 9000
```

Opens Firefox automatically at `http://localhost:8877`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `j` / `↓` | Next card |
| `k` / `↑` | Previous card |
| `d` | Mark done & next |

## Input Formats

### Markdown Table
Must have columns: Post (summary), Author, Account Size, Likes, Retweets, Comments, Link to Post, Suggested Comment

### JSON Array
```json
[
  {
    "summary": "Post description",
    "author": "@username",
    "followers": "~50K+",
    "likes": "1234",
    "retweets": "56",
    "comments": "78",
    "url": "https://x.com/user/status/123",
    "suggested_comment": "Your reply idea here"
  }
]
```

## Technical Constraints

### Why Popup Instead of Iframe?

X.com has multiple layers of iframe protection:
1. `X-Frame-Options: DENY` header
2. `Content-Security-Policy: frame-ancestors` directive
3. Firefox Enhanced Tracking Protection
4. JavaScript frame-busting

We attempted:
- **Local proxy stripping headers** - Works for simple sites, but X.com's SPA requires full JS execution with cookies
- **Firefox extension** - Can strip headers, but Firefox enforces frame protection at browser level beyond what extensions can override
- **Direct iframe** - Blocked by all of the above

**Solution:** Popup window positioned to align with the dashboard's right panel. The popup:
- Uses your logged-in Firefox session
- Auto-closes when navigating to next post
- Positions itself to feel integrated with the dashboard

### Future Possibilities

If true iframe embedding is needed:
1. **Electron app** - WebViews don't respect X-Frame-Options
2. **Playwright with Firefox profile** - Programmatic browser control
3. **Wait for X.com policy changes** - Unlikely

## File Structure

```
engage-launcher/
├── launcher.py           # Main script
├── Makefile              # make up/down/restart/status
├── README.md             # This file
├── .gitignore            # Ignores output/, .server.pid
├── firefox-extension/    # Attempted extension (doesn't fully work)
│   ├── manifest.json
│   └── background.js
├── output/               # Generated dashboards (gitignored)
└── .server.pid           # PID file when running (gitignored)
```

## Dependencies

- Python 3.10+
- Firefox browser
- No pip packages required (stdlib only)
