import { app, BrowserWindow } from 'electron';
import { config } from 'dotenv';
import { WINDOW_SIZE } from './settings';
import { exec } from 'child_process';
import { LoadURLWithRetry } from './load-url-with-retry';

config();

const childProcesses = [];

if (process.env.ENV === 'prod') {
  childProcesses.push(exec('npm run prod:express'));
  childProcesses.push(exec('npm run prod:react'));
}

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: WINDOW_SIZE.width,
    height: WINDOW_SIZE.height,
  });

  LoadURLWithRetry(mainWindow, `${process.env.HOST}:${process.env.FRONTEND_PORT}`);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  for (const process of childProcesses) {
    process.kill();
  }
});
