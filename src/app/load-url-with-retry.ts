import { BrowserWindow } from 'electron';

export const LoadURLWithRetry = (
  mainWindow: BrowserWindow,
  url: string,
  retryInterval = 1000
) => {
  const tryLoad = () => {
    mainWindow.loadURL(url).catch((err) => {
      setTimeout(tryLoad, retryInterval);
    });
  };
  tryLoad();
};
