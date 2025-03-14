import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, './preload.ts'),
    },
  });

  mainWindow.loadURL('http://localhost:3000');
});
