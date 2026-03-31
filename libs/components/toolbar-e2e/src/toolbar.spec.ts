import { expect, test } from '@playwright/test';

test.describe('ToolbarComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=components-toolbar--default&viewMode=story');
      await page.locator('npn-toolbar').waitFor();
    });

    test('should render the toolbar', async ({ page }) => {
      const toolbar = page.locator('npn-toolbar');

      await expect(toolbar).toBeVisible();
    });

    test('should render three columns', async ({ page }) => {
      const cols = page.locator('npn-toolbar .col');

      await expect(cols).toHaveCount(3);
    });

    test('should render three npn-button elements', async ({ page }) => {
      const buttons = page.locator('npn-toolbar npn-button');

      await expect(buttons).toHaveCount(3);
    });

    test('should render one npn-searchbar element', async ({ page }) => {
      const searchbar = page.locator('npn-toolbar npn-searchbar');

      await expect(searchbar).toHaveCount(1);
    });

    test('should render searchbar in the center column', async ({ page }) => {
      const searchbar = page.locator('npn-toolbar .col.center npn-searchbar');

      await expect(searchbar).toBeVisible();
    });

    test('should render home button with home icon', async ({ page }) => {
      const icon = page.locator(
        'npn-toolbar .col:first-child npn-button .pi-home',
      );

      await expect(icon).toBeVisible();
    });

    test('should render archive button with history icon', async ({ page }) => {
      const icon = page.locator(
        'npn-toolbar .col:first-child npn-button .pi-history',
      );

      await expect(icon).toBeVisible();
    });

    test('should render add note button with plus icon', async ({ page }) => {
      const icon = page.locator(
        'npn-toolbar .col.flex-end npn-button .pi-plus',
      );

      await expect(icon).toBeVisible();
    });

    test('should render home and archive buttons in the first column', async ({
      page,
    }) => {
      const buttons = page.locator('npn-toolbar .col:first-child npn-button');

      await expect(buttons).toHaveCount(2);
    });

    test('should render add note button in the flex-end column', async ({
      page,
    }) => {
      const button = page.locator('npn-toolbar .col.flex-end npn-button');

      await expect(button).toHaveCount(1);
    });

    test('should have clickable home button', async ({ page }) => {
      const button = page
        .locator('npn-toolbar .col:first-child npn-button button')
        .first();

      await expect(button).toBeEnabled();
      await button.click();
    });

    test('should have clickable archive button', async ({ page }) => {
      const button = page
        .locator('npn-toolbar .col:first-child npn-button button')
        .last();

      await expect(button).toBeEnabled();
      await button.click();
    });

    test('should have clickable add note button', async ({ page }) => {
      const button = page.locator(
        'npn-toolbar .col.flex-end npn-button button',
      );

      await expect(button).toBeEnabled();
      await button.click();
    });

    test('should render searchbar input', async ({ page }) => {
      const input = page.locator('npn-toolbar npn-searchbar input');

      await expect(input).toBeVisible();
    });
  });
});
