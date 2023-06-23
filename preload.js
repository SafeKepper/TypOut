// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'electron',
    {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ['close-window','minimize-window', 'toggle-fullscreen'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        }
    }
);
