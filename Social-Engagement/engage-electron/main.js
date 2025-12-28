const { app, BrowserWindow, session, ipcMain, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#0a0a0a',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true
    }
  });

  mainWindow.loadFile('renderer/index.html');

  // Strip X-Frame-Options and CSP headers to allow iframe embedding
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = Object.fromEntries(
      Object.entries(details.responseHeaders || {}).filter(
        ([key]) => !/^(x-frame-options|content-security-policy|content-security-policy-report-only)$/i.test(key)
      )
    );
    callback({ responseHeaders });
  });

  // Open devtools in dev mode
  if (process.argv.includes('--enable-logging')) {
    mainWindow.webContents.openDevTools();
  }

  // Build menu with custom accelerators to override global shortcuts
  const template = [
    {
      label: 'Engage',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'Navigate',
      submenu: [
        {
          label: 'Previous Card',
          accelerator: 'CmdOrCtrl+K',
          click: () => mainWindow.webContents.send('nav-command', 'prev')
        },
        {
          label: 'Next Card',
          accelerator: 'CmdOrCtrl+J',
          click: () => mainWindow.webContents.send('nav-command', 'next')
        },
        {
          label: 'Focus Webview',
          accelerator: 'CmdOrCtrl+F',
          click: () => mainWindow.webContents.send('nav-command', 'focus')
        },
        { type: 'separator' },
        {
          label: 'Mark Done & Next',
          accelerator: 'CmdOrCtrl+D',
          click: () => mainWindow.webContents.send('nav-command', 'done')
        },
        {
          label: 'Reload Post',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow.webContents.send('nav-command', 'reload')
        },
        { type: 'separator' },
        {
          label: 'Clear Queue & Paste New',
          accelerator: 'CmdOrCtrl+Shift+N',
          click: () => mainWindow.webContents.send('nav-command', 'clear-queue')
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload', accelerator: 'CmdOrCtrl+Shift+R' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for file operations
ipcMain.handle('read-dropped-file', async (event, filePath) => {
  const fs = require('fs');
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Clear X.com session cookies for logout
ipcMain.handle('clear-x-session', async () => {
  try {
    // Clear ALL storage data for a fresh start
    await session.defaultSession.clearStorageData({
      storages: ['cookies', 'localstorage', 'sessionstorage', 'cachestorage', 'indexdb', 'serviceworkers']
    });
    // Also clear cache
    await session.defaultSession.clearCache();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
