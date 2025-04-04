import path from 'path';
import { BrowserWindow } from 'electron';

export const LoadHTML = (mainWindow: BrowserWindow) => {
  mainWindow.loadFile(path.resolve(__dirname, '../../client/index.html'));
};
