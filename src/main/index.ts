import { app, BrowserWindow } from 'electron';
import { WINDOW_SIZE } from './settings';
import path from 'path';
import { HOST, FRONTEND_PORT } from '../settings';
import { LoadURLWithRetry } from './load-url-with-retry';
import { startServer } from '../server';

if (process.env.NELDERMEAD_ENV !== 'dev') {
	startServer();
}

app.on('ready', () => {
	const mainWindow = new BrowserWindow({
		width: WINDOW_SIZE.width,
		height: WINDOW_SIZE.height,
	});

	if (process.env.NELDERMEAD_ENV === 'dev') {
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
