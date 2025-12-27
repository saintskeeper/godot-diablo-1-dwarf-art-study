# Engage Electron - MVP Specification

## Overview

A lightweight Electron desktop app for quickly engaging with curated social media posts. Embeds X.com posts directly in an iframe by stripping X-Frame-Options headers at the session level, preserving your logged-in session for authentic engagement.

## Problem Statement

X.com blocks iframe embedding via:
- `X-Frame-Options: DENY`
- `Content-Security-Policy: frame-ancestors`
- JavaScript frame-busting

The current Python launcher uses popup windows as a workaround, but this creates a disconnected UX. Electron can intercept response headers before they reach the webview, enabling true iframe embedding.

## Core Features (MVP)

### 1. Content Loading
Two methods to load engagement targets:

**Paste JSON**
- Keyboard shortcut (Cmd+V / Ctrl+V) when no input focused
- Or click "Paste JSON" button
- Validates JSON structure on paste
- Shows error toast if invalid

**Drag & Drop**
- Drop zone visible on empty state
- Accepts `.json` files only
- Visual feedback during drag hover
- Validates on drop

### 2. Post Card Sidebar
- Scrollable list of engagement target cards
- Each card displays:
  - Author handle + follower count
  - Engagement stats (likes, retweets, comments)
  - Post summary
  - Suggested comment with copy button
  - "Done" checkbox (persisted)
- Active card highlighted
- Done cards dimmed (opacity 0.4)
- Keyboard navigation: `j`/`k` or arrows

### 3. Embedded Post View
- Full X.com post loaded in iframe/webview
- Uses your logged-in X.com session
- Header bar shows current post info
- Navigation buttons: Prev / Next / Reload
- "Mark Done & Next" button

### 4. Progress Tracking
- Done count displayed: "X / Y done"
- State persisted to localStorage
- Option to reset progress
- Option to hide completed cards

## Technical Architecture

```
engage-electron/
├── package.json
├── main.js              # Electron main process
├── preload.js           # Preload script for IPC
├── renderer/
│   ├── index.html       # Main window
│   ├── styles.css       # Dark theme styles
│   └── app.js           # Renderer logic
└── SPEC.md              # This file
```

### Header Stripping (main.js)
```javascript
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  const headers = Object.fromEntries(
    Object.entries(details.responseHeaders).filter(
      ([key]) => !/x-frame-options|content-security-policy/i.test(key)
    )
  );
  callback({ responseHeaders: headers });
});
```

### Webview vs Iframe
Use `<webview>` tag with:
- `partition="persist:xsession"` - Shares session with main window
- `allowpopups` - For OAuth flows if needed
- `webpreferences="contextIsolation=yes"`

Or use `<iframe>` since we're stripping headers at session level.

## Data Format

```json
[
  {
    "summary": "Post description/summary",
    "author": "@username",
    "followers": "~50K+",
    "likes": "1234",
    "retweets": "56",
    "comments": "78",
    "url": "https://x.com/user/status/123456789",
    "suggested_comment": "Your engagement reply idea"
  }
]
```

All fields required. The `url` must be a valid X.com post URL.

## UI/UX Design

### Layout
```
┌─────────────────────────────────────────────────────────────┐
│  Engage                                    [Paste] [Reset]  │
├──────────────────┬──────────────────────────────────────────┤
│                  │  @author - Post summary...               │
│  ┌────────────┐  │  ┌──────────────────────────────────┐   │
│  │ Card 1     │  │  │                                  │   │
│  │ @user      │  │  │                                  │   │
│  │ ❤️ 1.2K    │  │  │      X.com Post Iframe           │   │
│  └────────────┘  │  │                                  │   │
│  ┌────────────┐  │  │                                  │   │
│  │ Card 2 ✓   │  │  │                                  │   │
│  │ (dimmed)   │  │  │                                  │   │
│  └────────────┘  │  │                                  │   │
│  ┌────────────┐  │  └──────────────────────────────────┘   │
│  │ Card 3     │  │  [← Prev] [Next →] [Reload] [Done+Next] │
│  │ (active)   │  │                                          │
│  └────────────┘  │                                          │
│                  │                                          │
│  5 / 20 done     │                                          │
└──────────────────┴──────────────────────────────────────────┘
```

### Empty State (No Data Loaded)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              ┌─────────────────────────────┐                │
│              │                             │                │
│              │   Drop JSON file here       │                │
│              │         or                  │                │
│              │   Cmd+V to paste JSON       │                │
│              │                             │                │
│              └─────────────────────────────┘                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Theme
- Dark theme matching X.com's dark mode
- Background: `#0a0a0a`
- Card background: `#16181c`
- Accent: `#1d9bf0` (X blue)
- Text: `#e7e9ea`
- Muted: `#71767b`

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `j` / `↓` | Next card |
| `k` / `↑` | Previous card |
| `d` | Mark done & next |
| `Enter` | Focus iframe |
| `Escape` | Focus sidebar |
| `Cmd+V` | Paste JSON (when empty or sidebar focused) |

## MVP Scope

### In Scope
- Single window app
- JSON paste and drag-drop loading
- Card list with X.com iframe
- Done tracking with localStorage
- Keyboard navigation
- Dark theme

### Out of Scope (Future)
- Markdown table parsing
- Multiple engagement lists / tabs
- Cloud sync of progress
- Auto-fetch suggested comments
- Analytics / engagement tracking
- Menubar quick-access mode

## Success Criteria

1. X.com posts load in iframe with logged-in session
2. Can paste or drag-drop JSON to load posts
3. Navigation between posts is smooth
4. Done state persists across app restarts
5. App binary size < 200MB (acceptable for Electron)

## Dependencies

```json
{
  "devDependencies": {
    "electron": "^28.0.0"
  }
}
```

No additional runtime dependencies for MVP.
