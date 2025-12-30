const { app, BrowserWindow, session, ipcMain, Menu, Notification } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { initDatabase, closeDatabase } = require('./db');
const { savePosts, queryPosts, getPost, markDone, getDoneUrls, migrateFromLocalStorage } = require('./db/posts');
const { getAnalytics } = require('./db/analytics');
const {
  saveFeedbackReport,
  getMyPosts,
  getMyPost,
  getMyContentAnalytics,
  getScoreTrends,
  getActionItems,
  updateActionItemStatus,
  getBenchmarkPosts,
  getPatternReport
} = require('./db/my-content');

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
  initDatabase();
  createWindow();
  setupFeedbackWatcher();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('before-quit', () => {
  stopFeedbackWatcher();
  closeDatabase();
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

// Database IPC handlers
ipcMain.handle('db:save-posts', async (event, posts) => {
  try {
    return savePosts(posts);
  } catch (error) {
    console.error('db:save-posts error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:query-posts', async (event, filters) => {
  try {
    return queryPosts(filters);
  } catch (error) {
    console.error('db:query-posts error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:get-post', async (event, identifier) => {
  try {
    return getPost(identifier);
  } catch (error) {
    console.error('db:get-post error:', error);
    return null;
  }
});

ipcMain.handle('db:mark-done', async (event, { postId, done }) => {
  try {
    return markDone(postId, done);
  } catch (error) {
    console.error('db:mark-done error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:get-done-urls', async () => {
  try {
    return getDoneUrls();
  } catch (error) {
    console.error('db:get-done-urls error:', error);
    return [];
  }
});

ipcMain.handle('db:get-analytics', async (event, options) => {
  try {
    return getAnalytics(options);
  } catch (error) {
    console.error('db:get-analytics error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:migrate-localstorage', async (event, { doneUrls }) => {
  try {
    return migrateFromLocalStorage(doneUrls);
  } catch (error) {
    console.error('db:migrate-localstorage error:', error);
    return { success: false, error: error.message };
  }
});

// My Content IPC handlers
ipcMain.handle('db:save-feedback-report', async (event, jsonData) => {
  try {
    return saveFeedbackReport(jsonData);
  } catch (error) {
    console.error('db:save-feedback-report error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:get-my-posts', async (event, options) => {
  try {
    return getMyPosts(options);
  } catch (error) {
    console.error('db:get-my-posts error:', error);
    return [];
  }
});

ipcMain.handle('db:get-my-post', async (event, identifier) => {
  try {
    return getMyPost(identifier);
  } catch (error) {
    console.error('db:get-my-post error:', error);
    return null;
  }
});

ipcMain.handle('db:get-my-content-analytics', async (event, options) => {
  try {
    return getMyContentAnalytics(options);
  } catch (error) {
    console.error('db:get-my-content-analytics error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:get-score-trends', async (event, range) => {
  try {
    return getScoreTrends(range);
  } catch (error) {
    console.error('db:get-score-trends error:', error);
    return [];
  }
});

ipcMain.handle('db:get-action-items', async (event, options) => {
  try {
    return getActionItems(options);
  } catch (error) {
    console.error('db:get-action-items error:', error);
    return [];
  }
});

ipcMain.handle('db:update-action-item', async (event, { id, status }) => {
  try {
    return updateActionItemStatus(id, status);
  } catch (error) {
    console.error('db:update-action-item error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('db:get-benchmarks', async (event, options) => {
  try {
    return getBenchmarkPosts(options);
  } catch (error) {
    console.error('db:get-benchmarks error:', error);
    return [];
  }
});

ipcMain.handle('db:get-patterns', async (event, reportId) => {
  try {
    return getPatternReport(reportId);
  } catch (error) {
    console.error('db:get-patterns error:', error);
    return null;
  }
});

// Folder watcher for auto-importing feedback JSON
let feedbackWatcher = null;
const FEEDBACK_FOLDER = path.join(os.homedir(), 'engage-feedback');

function setupFeedbackWatcher() {
  // Create folder if it doesn't exist
  if (!fs.existsSync(FEEDBACK_FOLDER)) {
    fs.mkdirSync(FEEDBACK_FOLDER, { recursive: true });
    console.log(`Created feedback folder: ${FEEDBACK_FOLDER}`);
  }

  // Watch for new files
  feedbackWatcher = fs.watch(FEEDBACK_FOLDER, (eventType, filename) => {
    if (eventType === 'rename' && filename && filename.endsWith('.json')) {
      const filePath = path.join(FEEDBACK_FOLDER, filename);

      // Wait a moment for file to be fully written
      setTimeout(() => {
        if (fs.existsSync(filePath)) {
          try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(content);

            // Check if it's a feedback report (has walter_posts_reviewed or walter_summary)
            if (jsonData.walter_posts_reviewed || jsonData.walter_summary) {
              const result = saveFeedbackReport(jsonData);

              if (result.success) {
                // Show notification
                if (Notification.isSupported()) {
                  new Notification({
                    title: 'Feedback Imported',
                    body: `Imported ${result.postsProcessed} posts from ${filename}`
                  }).show();
                }

                // Notify renderer to refresh
                if (mainWindow && !mainWindow.isDestroyed()) {
                  mainWindow.webContents.send('feedback-imported', result);
                }

                // Move file to processed folder
                const processedFolder = path.join(FEEDBACK_FOLDER, 'processed');
                if (!fs.existsSync(processedFolder)) {
                  fs.mkdirSync(processedFolder, { recursive: true });
                }
                fs.renameSync(filePath, path.join(processedFolder, filename));
              }
            }
          } catch (error) {
            console.error('Error processing feedback file:', error);
          }
        }
      }, 500);
    }
  });

  console.log(`Watching for feedback files in: ${FEEDBACK_FOLDER}`);
}

function stopFeedbackWatcher() {
  if (feedbackWatcher) {
    feedbackWatcher.close();
    feedbackWatcher = null;
  }
}
