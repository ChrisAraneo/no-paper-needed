import { expect, test } from '@playwright/test';

test.describe('TextComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=components-text--default&viewMode=story');
      await page.locator('npn-text span').waitFor();
    });

    test('should render the text component', async ({ page }) => {
      const text = page.locator('npn-text span');

      await expect(text).toBeVisible();
      await expect(text).toContainText('Sample text');
    });

    test('should use the correct font family', async ({ page }) => {
      const text = page.locator('npn-text span');

      await expect(text).toHaveCSS('font-family', /Orienta/u);
    });

    test('should have correct font size', async ({ page }) => {
      const text = page.locator('npn-text span');

      await expect(text).toHaveCSS('font-size', '16px');
    });

    test('should have correct line height', async ({ page }) => {
      const text = page.locator('npn-text span');

      await expect(text).toHaveCSS('line-height', '20px');
    });
  });

  test.describe('LongText story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=components-text--long-text&viewMode=story');
      await page.locator('npn-text span').waitFor();
    });

    test('should render the text component with long text', async ({
      page,
    }) => {
      const text = page.locator('npn-text span');

      await expect(text).toBeVisible();
      await expect(text).toContainText(
        'This is a longer paragraph of text to demonstrate how the component handles more content.',
      );
    });
  });

  test.describe('Empty story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=components-text--empty&viewMode=story');
      await page.locator('npn-text').waitFor({ state: 'attached' });
    });

    test('should render an empty text component', async ({ page }) => {
      const text = page.locator('npn-text span');

      await expect(text).toBeAttached();
      await expect(text).toHaveText('');
    });
  });
});
