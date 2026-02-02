import { test, expect } from '@playwright/test';

test.describe('it is an example', () => {
  test('description goes here', async ({ page }) => {
    await page.goto('/');

    expect(2 + 2).toBe(4);
  });
});
