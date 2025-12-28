const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readDroppedFile: (filePath) => ipcRenderer.invoke('read-dropped-file', filePath),
  onNavCommand: (callback) => ipcRenderer.on('nav-command', (event, command) => callback(command)),
  clearXSession: () => ipcRenderer.invoke('clear-x-session')
});
