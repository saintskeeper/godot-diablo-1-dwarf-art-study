const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  readDroppedFile: (filePath) => ipcRenderer.invoke('read-dropped-file', filePath)
});
