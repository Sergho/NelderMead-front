import { app, BrowserWindow } from 'electron';
import { config } from 'dotenv';
import { WINDOW_SIZE } from './settings';

config();

let mainWindow: BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: WINDOW_SIZE.width,
    height: WINDOW_SIZE.height,
  });

  mainWindow.loadURL(process.env.FRONTEND_HOST);
});
