import { expect, test } from '@playwright/test';

test.describe('ButtonComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-button--default&viewMode=story',
      );
      await page.locator('npn-button button').waitFor();
    });

    test('should render the button with label', async ({ page }) => {
      const button = page.locator('npn-button button');

      await expect(button).toBeVisible();
      await expect(button).toContainText('Click me');
    });

    test('should be clickable', async ({ page }) => {
      const button = page.locator('npn-button button');

      await expect(button).toBeEnabled();
      await button.click();
    });
  });

  test.describe('Disabled story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-button--disabled&viewMode=story',
      );
      await page.locator('npn-button button').waitFor();
    });

    test('should render a disabled button', async ({ page }) => {
      const button = page.locator('npn-button button');

      await expect(button).toBeVisible();
      await expect(button).toBeDisabled();
      await expect(button).toContainText('Cannot click');
    });
  });

  test.describe('WithIcon story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-button--with-icon&viewMode=story',
      );
      await page.locator('npn-button button').waitFor();
    });

    test('should render button with label and icon', async ({ page }) => {
      const button = page.locator('npn-button button');

      await expect(button).toBeVisible();
      await expect(button).toContainText('Save');
    });

    test('should display the icon', async ({ page }) => {
      const icon = page.locator('npn-button .pi-check');

      await expect(icon).toBeVisible();
    });
  });

  test.describe('IconOnly story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-button--icon-only&viewMode=story',
      );
      await page.locator('npn-button button').waitFor();
    });

    test('should render a rounded icon-only button', async ({ page }) => {
      const button = page.locator('npn-button button');

      await expect(button).toBeVisible();
    });

    test('should display the pencil icon', async ({ page }) => {
      const icon = page.locator('npn-button .pi-pencil');

      await expect(icon).toBeVisible();
    });
  });

  test.describe('Success story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-button--success&viewMode=story',
      );
      await page.locator('npn-button button').waitFor();
    });

    test('should render button with Confirm label', async ({ page }) => {
      const button = page.locator('npn-button button');

      await expect(button).toBeVisible();
      await expect(button).toContainText('Confirm');
    });
  });

  test.describe('Danger story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-button--danger&viewMode=story',
      );
      await page.locator('npn-button button').waitFor();
    });

    test('should render button with Delete label', async ({ page }) => {
      const button = page.locator('npn-button button');

      await expect(button).toBeVisible();
      await expect(button).toContainText('Delete');
    });

    test('should display the trash icon', async ({ page }) => {
      const icon = page.locator('npn-button .pi-trash');

      await expect(icon).toBeVisible();
    });
  });
});
