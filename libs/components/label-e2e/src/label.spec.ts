import { expect, test } from '@playwright/test';

test.describe('LabelComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=components-label--default&viewMode=story');
      await page.locator('npn-label span').waitFor();
    });

    test('should render the label with text', async ({ page }) => {
      const label = page.locator('npn-label span');

      await expect(label).toBeVisible();
      await expect(label).toContainText('Label');
    });

    test('should apply uppercase text transform', async ({ page }) => {
      const label = page.locator('npn-label span');

      await expect(label).toHaveCSS('text-transform', 'uppercase');
    });
  });

  test.describe('LongText story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=components-label--long-text&viewMode=story');
      await page.locator('npn-label span').waitFor();
    });

    test('should render the label with long text', async ({ page }) => {
      const label = page.locator('npn-label span');

      await expect(label).toBeVisible();
      await expect(label).toContainText('This is a longer label text');
    });
  });

  test.describe('Empty story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=components-label--empty&viewMode=story');
      await page.locator('npn-label').waitFor({ state: 'attached' });
    });

    test('should render an empty label', async ({ page }) => {
      const label = page.locator('npn-label span');

      await expect(label).toBeAttached();
      await expect(label).toHaveText('');
    });
  });
});
