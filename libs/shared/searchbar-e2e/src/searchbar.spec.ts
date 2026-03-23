import { expect, test } from '@playwright/test';

test.describe('SearchbarComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-searchbar--default&viewMode=story',
      );
      await page.locator('npn-searchbar').waitFor();
    });

    test('should render the searchbar', async ({ page }) => {
      const searchbar = page.locator('npn-searchbar');

      await expect(searchbar).toBeVisible();
    });

    test('should render an input element', async ({ page }) => {
      const input = page.locator('npn-searchbar input');

      await expect(input).toBeVisible();
    });

    test('should render the search icon', async ({ page }) => {
      const icon = page.locator('npn-searchbar .pi-search');

      await expect(icon).toBeVisible();
    });

    test('should have an empty value by default', async ({ page }) => {
      const input = page.locator('npn-searchbar input');

      await expect(input).toHaveValue('');
    });

    test('should accept typed input', async ({ page }) => {
      const input = page.locator('npn-searchbar input');

      await input.fill('test query');

      await expect(input).toHaveValue('test query');
    });
  });

  test.describe('WithPlaceholder story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-searchbar--with-placeholder&viewMode=story',
      );
      await page.locator('npn-searchbar').waitFor();
    });

    test('should render the searchbar with placeholder', async ({ page }) => {
      const input = page.locator('npn-searchbar input');

      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute('placeholder', 'Search documents...');
    });

    test('should have an empty value', async ({ page }) => {
      const input = page.locator('npn-searchbar input');

      await expect(input).toHaveValue('');
    });

    test('should accept typed input', async ({ page }) => {
      const input = page.locator('npn-searchbar input');

      await input.fill('annual report');

      await expect(input).toHaveValue('annual report');
    });
  });

  test.describe('WithValue story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-searchbar--with-value&viewMode=story',
      );
      await page.locator('npn-searchbar').waitFor();
    });

    test('should render the searchbar with a pre-filled value', async ({
      page,
    }) => {
      const input = page.locator('npn-searchbar input');

      await expect(input).toBeVisible();
      await expect(input).toHaveValue('Annual report');
    });

    test('should render the placeholder', async ({ page }) => {
      const input = page.locator('npn-searchbar input');

      await expect(input).toHaveAttribute('placeholder', 'Search documents...');
    });

    test('should allow clearing and typing new value', async ({ page }) => {
      const input = page.locator('npn-searchbar input');

      await input.clear();
      await expect(input).toHaveValue('');

      await input.fill('new search');
      await expect(input).toHaveValue('new search');
    });
  });
});
