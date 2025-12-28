# Engage Electron

Desktop app for quick social media engagement with embedded X.com posts. Bypasses X-Frame-Options restrictions via Electron header stripping.

## Quick Start

```bash
cd engage-electron
npm install   # First time only
npm start
```

## First-Time Setup

1. Click "Login to X.com first" on the empty state
2. Log in to X.com in the webview
3. Click "Done - I'm logged in"
4. Session persists across app restarts

## Loading Content

**Drag & Drop:** Drop a `.json` file onto the drop zone

**Paste:** Press `Cmd+V` or click "Paste JSON" button

## JSON Format

```json
[
  {
    "summary": "Post description",
    "author": "@username",
    "followers": "~50K+",
    "likes": "1234",
    "retweets": "56",
    "comments": "78",
    "url": "https://x.com/user/status/123456789",
    "suggested_comment": "Your reply idea"
  }
]
```

Required fields: `url`, `author`. Others are optional but improve the card display.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Cmd+J` / `j` / `↓` | Next card |
| `Cmd+K` / `k` / `↑` | Previous card |
| `Cmd+F` / `f` / `Enter` | Focus webview (for scrolling/clicking) |
| `Cmd+D` / `d` | Mark done & advance |
| `Cmd+R` / `r` | Reload current post |
| `Escape` | Focus sidebar |
| `Cmd+V` | Paste JSON |

**Note:** `Cmd+K`, `Cmd+J`, and `Cmd+F` override default macOS shortcuts when the app is focused.

## How It Works

Electron intercepts HTTP responses and strips `X-Frame-Options` and `Content-Security-Policy` headers, allowing X.com to load in a `<webview>` tag. The webview shares Electron's session, so your login persists.

```javascript
// main.js - the magic
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  const headers = Object.fromEntries(
    Object.entries(details.responseHeaders || {}).filter(
      ([key]) => !/^(x-frame-options|content-security-policy)$/i.test(key)
    )
  );
  callback({ responseHeaders: headers });
});
```

---

## Notes for Next Agent

### What's Working
- X.com posts load with logged-in session
- Card navigation and done tracking
- Copy suggested comment to clipboard
- JSON paste and drag-drop loading
- Session persists between app restarts
- Focus button (F key) enables webview interaction

### Known Issues / Quirks

1. **Webview Focus**: Clicking directly in the webview doesn't always work. User must press `f` or click "Focus (F)" button to enable scrolling/clicking inside X.com.

2. **Login Flow**: The login webview works but sometimes X.com shows extra verification. User may need to complete login, click "Done", then re-login if session didn't stick.

3. **Fake Tweet URLs**: The `example.json` contains sample URLs that may not be real tweets. When testing, use actual tweet URLs.

4. **Console Warnings**: macOS shows AVCapture deprecation warnings - harmless, can be ignored.

### Future Improvements

- [ ] **Auto-focus webview** - Find a way to make webview clickable without needing Focus button
- [ ] **Markdown table parsing** - Support the same format as engage-launcher
- [ ] **Session indicator** - Show logged-in status in header
- [ ] **Multiple lists** - Tabs for different engagement campaigns
- [ ] **Auto-advance timer** - Option to auto-move to next card after X seconds
- [ ] **Analytics** - Track engagement stats over time
- [ ] **Menubar mode** - Quick-access from menubar
- [ ] **Build/package** - Add electron-builder for distributable .app/.dmg

### Architecture Notes

```
engage-electron/
├── main.js           # Main process, header stripping, window creation
├── preload.js        # IPC bridge (minimal - just file reading)
├── renderer/
│   ├── index.html    # Shell with empty state + main layout
│   ├── styles.css    # Dark theme, all styling
│   └── app.js        # All renderer logic (500+ lines)
├── example.json      # Sample engagement data
├── SPEC.md           # Original MVP specification
└── package.json      # Electron 28.x
```

### Key Functions in app.js

- `parseAndLoadJSON()` - Validates and loads post data
- `selectCard(index)` - Loads post into webview
- `focusWebview()` - Injects focus into webview (workaround)
- `markDone()` / `saveDoneState()` - Progress persistence
- `showLoginView()` - First-time login flow

### Related Files

- `../engage-launcher/` - Original Python popup-based launcher
- `../engagemet-tests/example.md` - Markdown table format example
