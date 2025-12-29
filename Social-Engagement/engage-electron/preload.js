const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readDroppedFile: (filePath) => ipcRenderer.invoke('read-dropped-file', filePath),
  onNavCommand: (callback) => ipcRenderer.on('nav-command', (event, command) => callback(command)),
  clearXSession: () => ipcRenderer.invoke('clear-x-session'),

  db: {
    savePosts: (posts) => ipcRenderer.invoke('db:save-posts', posts),
    queryPosts: (filters) => ipcRenderer.invoke('db:query-posts', filters),
    getPost: (identifier) => ipcRenderer.invoke('db:get-post', identifier),
    markDone: (postId, done) => ipcRenderer.invoke('db:mark-done', { postId, done }),
    getDoneUrls: () => ipcRenderer.invoke('db:get-done-urls'),
    getAnalytics: (options) => ipcRenderer.invoke('db:get-analytics', options),
    migrateLocalStorage: (doneUrls) => ipcRenderer.invoke('db:migrate-localstorage', { doneUrls })
  }
});
