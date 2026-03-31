import { expect, test } from '@playwright/test';

test.describe('FooterComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=components-footer--default&viewMode=story');
      await page.locator('npn-footer').waitFor();
    });

    test('should render the footer', async ({ page }) => {
      const footer = page.locator('npn-footer');

      await expect(footer).toBeVisible();
    });

    test('should render three columns', async ({ page }) => {
      const cols = page.locator('npn-footer .col');

      await expect(cols).toHaveCount(3);
    });

    test('should render the export button', async ({ page }) => {
      const exportButton = page.locator('npn-footer .export-button');

      await expect(exportButton).toBeVisible();
    });

    test('should render the import button', async ({ page }) => {
      const importButton = page.locator('npn-footer .import-button');

      await expect(importButton).toBeVisible();
    });

    test('should display the file-export icon', async ({ page }) => {
      const icon = page.locator('npn-footer .export-button .pi-file-export');

      await expect(icon).toBeVisible();
    });

    test('should display the file-import icon', async ({ page }) => {
      const icon = page.locator('npn-footer .import-button .pi-file-import');

      await expect(icon).toBeVisible();
    });

    test('should render export button as rounded', async ({ page }) => {
      const button = page.locator('npn-footer .export-button button');

      await expect(button).toHaveClass(/p-button-rounded/u);
    });

    test('should render import button as rounded', async ({ page }) => {
      const button = page.locator('npn-footer .import-button button');

      await expect(button).toHaveClass(/p-button-rounded/u);
    });

    test('should have clickable export button', async ({ page }) => {
      const button = page.locator('npn-footer .export-button button');

      await expect(button).toBeEnabled();
      await button.click();
    });

    test('should have clickable import button', async ({ page }) => {
      const button = page.locator('npn-footer .import-button button');

      await expect(button).toBeEnabled();
      await button.click();
    });
  });
});
