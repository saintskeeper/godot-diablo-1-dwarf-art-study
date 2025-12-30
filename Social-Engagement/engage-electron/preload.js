const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readDroppedFile: (filePath) => ipcRenderer.invoke('read-dropped-file', filePath),
  onNavCommand: (callback) => ipcRenderer.on('nav-command', (event, command) => callback(command)),
  clearXSession: () => ipcRenderer.invoke('clear-x-session'),
  onFeedbackImported: (callback) => ipcRenderer.on('feedback-imported', (event, result) => callback(result)),

  db: {
    savePosts: (posts) => ipcRenderer.invoke('db:save-posts', posts),
    queryPosts: (filters) => ipcRenderer.invoke('db:query-posts', filters),
    getPost: (identifier) => ipcRenderer.invoke('db:get-post', identifier),
    markDone: (postId, done) => ipcRenderer.invoke('db:mark-done', { postId, done }),
    getDoneUrls: () => ipcRenderer.invoke('db:get-done-urls'),
    getAnalytics: (options) => ipcRenderer.invoke('db:get-analytics', options),
    migrateLocalStorage: (doneUrls) => ipcRenderer.invoke('db:migrate-localstorage', { doneUrls })
  },

  myContent: {
    saveFeedbackReport: (data) => ipcRenderer.invoke('db:save-feedback-report', data),
    getMyPosts: (options) => ipcRenderer.invoke('db:get-my-posts', options),
    getMyPost: (identifier) => ipcRenderer.invoke('db:get-my-post', identifier),
    getAnalytics: (options) => ipcRenderer.invoke('db:get-my-content-analytics', options),
    getScoreTrends: (range) => ipcRenderer.invoke('db:get-score-trends', range),
    getActionItems: (options) => ipcRenderer.invoke('db:get-action-items', options),
    updateActionItem: (id, status) => ipcRenderer.invoke('db:update-action-item', { id, status }),
    getBenchmarks: (options) => ipcRenderer.invoke('db:get-benchmarks', options),
    getPatterns: (reportId) => ipcRenderer.invoke('db:get-patterns', reportId)
  }
});
