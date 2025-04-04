import { app, BrowserWindow } from 'electron';
import { getEnv } from '../../common/utils/getEnv';
import { HOST, FRONTEND_PORT } from '../../constants';
import { WINDOW_SIZE } from '../constants';
import { LoadURLWithRetry } from './load-url-with-retry';
import { LoadHTML } from './html-path-resolve';

export const startApp = () => {
  app.on('ready', () => {
    const mainWindow = new BrowserWindow({
      width: WINDOW_SIZE.width,
      height: WINDOW_SIZE.height,
    });

    if (getEnv() === 'dev') {
      LoadURLWithRetry(mainWindow, `${HOST}:${FRONTEND_PORT}`);
    } else {
      LoadHTML(mainWindow);
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
};
