import * as PATH from 'node:path';

import { expect, test } from '@playwright/test';
import {
  _electron as electron,
  BrowserContext,
  ElectronApplication,
  Page,
} from 'playwright';

test.describe('Check Home Page', () => {
  let app: ElectronApplication;
  let firstWindow: Page;
  let context: BrowserContext;

  test.beforeAll(async () => {
    app = await electron.launch({
      args: [
        PATH.join(__dirname, '../app/main.js'),
        PATH.join(__dirname, '../app/package.json'),
      ],
    });
    context = app.context();
    await context.tracing.start({ screenshots: true, snapshots: true });
    firstWindow = await app.firstWindow();
    await firstWindow.waitForLoadState('domcontentloaded');
  });

  test('Launch electron app', async () => {
    const windowState: {
      isVisible: boolean;
      isDevToolsOpened: boolean;
      isCrashed: boolean;
    } = await app.evaluate(async (process) => {
      const mainWindow = process.BrowserWindow.getAllWindows()[0];

      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
        isCrashed: mainWindow.webContents.isCrashed(),
      });

      return new Promise((resolve) => {
        if (mainWindow.isVisible()) {
          resolve(getState());
        } else {
          mainWindow.once('ready-to-show', () =>
            setTimeout(() => resolve(getState()), 0),
          );
        }
      });
    });

    expect(windowState.isVisible).toBeTruthy();
    expect(windowState.isDevToolsOpened).toBeFalsy();
    expect(windowState.isCrashed).toBeFalsy();
  });

  // Test('Check Home Page design', async ({ browserName}) => {
  //   // Uncomment if you change the design of Home Page in order to create a new screenshot
  //   Const screenshot = await firstWindow.screenshot({ path: '/tmp/home.png' });
  //   Expect(screenshot).toMatchSnapshot(`home-${browserName}.png`);
  // });

  test('Check title', async () => {
    const elem = await firstWindow.$('app-home h1');
    const text = elem ? await elem.innerText() : null;
    expect(text).toBe('App works !');
  });

  test.afterAll(async () => {
    await context.tracing.stop({ path: 'e2e/tracing/trace.zip' });
    await app.close();
  });
});
