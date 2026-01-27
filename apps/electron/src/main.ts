/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable func-style */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';

import { app, BrowserWindow, screen } from 'electron';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.includes('--serve');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false,
      webSecurity: !serve,
    },
  });

  if (serve) {
    import('electron-debug').then((debug) => {
      debug.default({ isEnabled: true, showDevTools: true });
    });

    import('electron-reloader').then((reloader) => {
      const reloaderFn = (reloader as any).default || reloader;
      reloaderFn(module);
    });
    const locale = app.getLocale();
    win.loadURL(`http://localhost:4200?locale=${locale}`);
  } else {
    // Path when running in production (packaged electron app)
    // The compiled electron main.js is in dist/apps/electron/
    // The browser build is in dist/apps/browser/
    const fullPath = path.join(__dirname, '../browser/index.html');
    const locale = app.getLocale();
    const url = pathToFileURL(path.resolve(fullPath)).href;
    win.loadURL(`${url}?locale=${locale}`);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // In an array if your app supports multi windows, this is the time
    // When you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // Initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // To stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // Dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch {
  // Catch Error
  // Throw e;
}
