import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as fs from 'node:fs';
import { pathToFileURL } from 'node:url';

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // In development, load from dev server; in production, load from built files
  const isDev = process.env['NODE_ENV'] === 'development';

  const locale = app.getLocale().split('-')[0] || 'en';

  if (isDev) {
    mainWindow.loadURL(`http://localhost:4200/${locale}/home`);
    mainWindow.webContents.openDevTools();
  } else {
    // Load the built Angular app
    const fullPath = path.join(__dirname, '../../browser/browser/index.html');
    const url = pathToFileURL(path.resolve(fullPath)).href;
    mainWindow.loadURL(`${url}#/${locale}/home`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
