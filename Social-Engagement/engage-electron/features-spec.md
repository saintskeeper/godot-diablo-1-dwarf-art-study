# Engage Electron - Feature Spec

## Recent Additions (Dec 2024)

### 1. Global Hotkey Overrides
Override macOS default shortcuts when app is focused.

| Shortcut | Action |
|----------|--------|
| `Cmd+J` | Next card |
| `Cmd+K` | Previous card |
| `Cmd+F` | Focus webview |
| `Cmd+D` | Mark done & advance |
| `Cmd+R` | Reload current post |
| `Cmd+Shift+N` | Clear queue & paste new |

Implementation: Electron Menu API with accelerators in `main.js`, IPC to renderer.

### 2. Session Management
Full logout/re-login capability for X.com session.

**Logout Button (🔑)**
- Clears all session data: cookies, localStorage, sessionStorage, cache, service workers, indexedDB
- Shows inline login webview in main panel
- After login, reloads current post

**IPC Handler:** `clear-x-session`
```javascript
session.defaultSession.clearStorageData({
  storages: ['cookies', 'localstorage', 'sessionstorage', 'cachestorage', 'indexdb', 'serviceworkers']
});
session.defaultSession.clearCache();
```

### 3. Queue Management
Clear current queue and load new JSON without returning to empty state.

**Clear Queue Button (🗑️)**
- Clears posts array and card list
- Auto-reads clipboard and loads if valid JSON array detected
- Shows toast prompt for manual paste

**Paste from Main View**
- `Cmd+V` works from main layout (not just empty state)
- Won't intercept paste when webview is focused (for X.com interactions)
- Automatically replaces current queue with new JSON

---

## Planned Features

### Chrome User-Agent Spoofing
Spoof Electron UA as Chrome to avoid X.com detection/throttling.

### Session Health Indicator
- Show logged-in status in header
- Detect stuck spinner (>5s) and prompt re-login

### Auto-detect Stale Session
- Monitor webview load events
- Timeout detection for failed loads

---

## Architecture

```
engage-electron/
├── main.js           # Main process, menu, IPC handlers
├── preload.js        # IPC bridge (readDroppedFile, onNavCommand, clearXSession)
├── renderer/
│   ├── index.html    # Shell with header actions (🗑️ 🔄 🔑)
│   ├── styles.css    # Dark theme, inline login styles
│   └── app.js        # Renderer logic, menu command handlers
└── features-spec.md  # This file
```

## Key IPC Channels

| Channel | Direction | Purpose |
|---------|-----------|---------|
| `nav-command` | main→renderer | Menu accelerator actions |
| `read-dropped-file` | renderer→main | File drop handling |
| `clear-x-session` | renderer→main | Logout/session clear |
