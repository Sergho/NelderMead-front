import { app, BrowserWindow } from 'electron';
import path from 'path';
import { getEnv } from '../../common/utils/getEnv';
import { HOST, FRONTEND_PORT } from '../../settings';
import { WINDOW_SIZE } from '../settings';
import { LoadURLWithRetry } from './load-url-with-retry';

export const startApp = () => {
  app.on('ready', () => {
    const mainWindow = new BrowserWindow({
      width: WINDOW_SIZE.width,
      height: WINDOW_SIZE.height,
    });

    if (getEnv() === 'dev') {
      LoadURLWithRetry(mainWindow, `${HOST}:${FRONTEND_PORT}`);
    } else {
      mainWindow.loadFile(path.join(__dirname, '../../dist/renderer/index.html'));
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
};
