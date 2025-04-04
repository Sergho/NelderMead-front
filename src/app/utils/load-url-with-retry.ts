import { BrowserWindow } from 'electron';

export const LoadURLWithRetry = (mainWindow: BrowserWindow, url: string, retryInterval = 1000) => {
  const tryLoad = () => {
    mainWindow.loadURL(url).catch(() => {
      setTimeout(tryLoad, retryInterval);
    });
  };
  tryLoad();
};
