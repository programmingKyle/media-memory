const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    frameHandler: (data) => ipcRenderer.invoke('frame-handler', data),

    addMedia: (data) => ipcRenderer.invoke('add-media', data),
    getMedia: (data) => ipcRenderer.invoke('get-media', data),
    editMedia: (data) => ipcRenderer.invoke('edit-media', data),
    checkMediaEntry: (data) => ipcRenderer.invoke('check-media-entry', data),
});