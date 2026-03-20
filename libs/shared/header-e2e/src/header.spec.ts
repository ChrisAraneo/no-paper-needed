import { expect, test } from '@playwright/test';

test.describe('HeaderComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=shared-header--default&viewMode=story');
      await page.locator('npn-header header').waitFor();
    });

    test('should render a header with text', async ({ page }) => {
      const header = page.locator('npn-header header');

      await expect(header).toBeVisible();
      await expect(header).toContainText('Sample Header Text');
    });

    test('should render an h1 element by default', async ({ page }) => {
      const h1 = page.locator('npn-header header h1');

      await expect(h1).toBeVisible();
    });

    test('should apply lg size class by default', async ({ page }) => {
      const h1 = page.locator('npn-header header h1');

      await expect(h1).toHaveClass(/lg/u);
    });
  });

  test.describe('ExtraLarge story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-header--extra-large&viewMode=story',
      );
      await page.locator('npn-header header').waitFor();
    });

    test('should render a header with xl size', async ({ page }) => {
      const h1 = page.locator('npn-header header h1');

      await expect(h1).toBeVisible();
      await expect(h1).toHaveClass(/xl/u);
    });

    test('should display the header text', async ({ page }) => {
      const header = page.locator('npn-header header');

      await expect(header).toContainText('Sample Header Text');
    });
  });

  test.describe('Medium story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=shared-header--medium&viewMode=story');
      await page.locator('npn-header header').waitFor();
    });

    test('should render a header with md size', async ({ page }) => {
      const h1 = page.locator('npn-header header h1');

      await expect(h1).toBeVisible();
      await expect(h1).toHaveClass(/md/u);
    });

    test('should display the header text', async ({ page }) => {
      const header = page.locator('npn-header header');

      await expect(header).toContainText('Sample Header Text');
    });
  });

  test.describe('H2 story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=shared-header--as-h-2&viewMode=story');
      await page.locator('npn-header header').waitFor();
    });

    test('should render an h2 element', async ({ page }) => {
      const h2 = page.locator('npn-header header h2');

      await expect(h2).toBeVisible();
    });

    test('should not render an h1 element', async ({ page }) => {
      const h1 = page.locator('npn-header header h1');

      await expect(h1).toHaveCount(0);
    });

    test('should display the header text', async ({ page }) => {
      const h2 = page.locator('npn-header header h2');

      await expect(h2).toContainText('Sample Header Text');
    });

    test('should apply lg size class', async ({ page }) => {
      const h2 = page.locator('npn-header header h2');

      await expect(h2).toHaveClass(/lg/u);
    });
  });

  test.describe('H3 story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=shared-header--as-h-3&viewMode=story');
      await page.locator('npn-header header').waitFor();
    });

    test('should render an h3 element', async ({ page }) => {
      const h3 = page.locator('npn-header header h3');

      await expect(h3).toBeVisible();
    });

    test('should not render an h1 element', async ({ page }) => {
      const h1 = page.locator('npn-header header h1');

      await expect(h1).toHaveCount(0);
    });

    test('should display the header text', async ({ page }) => {
      const h3 = page.locator('npn-header header h3');

      await expect(h3).toContainText('Sample Header Text');
    });

    test('should apply lg size class', async ({ page }) => {
      const h3 = page.locator('npn-header header h3');

      await expect(h3).toHaveClass(/lg/u);
    });
  });

  test.describe('AllSizes story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-header--all-sizes&viewMode=story',
      );
      await page.locator('npn-header header').first().waitFor();
    });

    test('should render three headers', async ({ page }) => {
      const headers = page.locator('npn-header header');

      await expect(headers).toHaveCount(3);
    });

    test('should render xl header as h1', async ({ page }) => {
      const h1 = page.locator('npn-header header h1.xl');

      await expect(h1).toBeVisible();
      await expect(h1).toContainText('Extra Large Header');
    });

    test('should render lg header as h2', async ({ page }) => {
      const h2 = page.locator('npn-header header h2.lg');

      await expect(h2).toBeVisible();
      await expect(h2).toContainText('Large Header');
    });

    test('should render md header as h3', async ({ page }) => {
      const h3 = page.locator('npn-header header h3.md');

      await expect(h3).toBeVisible();
      await expect(h3).toContainText('Medium Header');
    });
  });
});
