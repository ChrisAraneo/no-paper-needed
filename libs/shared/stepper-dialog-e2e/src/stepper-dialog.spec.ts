import { expect, test } from '@playwright/test';

test.describe('StepperDialogComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-stepperdialog--default&viewMode=story',
      );
      await page.locator('.p-dialog').waitFor();
    });

    test('should render the dialog', async ({ page }) => {
      const dialog = page.locator('.p-dialog');

      await expect(dialog).toBeVisible();
    });

    test('should display the dialog title', async ({ page }) => {
      const header = page.locator('.p-dialog-title');

      await expect(header).toContainText('Add new note');
    });

    test('should display three steps', async ({ page }) => {
      const steps = page.locator('p-step');

      await expect(steps).toHaveCount(3);
    });

    test('should display the first step content', async ({ page }) => {
      const content = page.locator('npn-step-panel .content');

      await expect(content).toContainText('Step 1: Choose a date');
    });

    test('should display the Next button', async ({ page }) => {
      const actions = page.locator('npn-step-panel .actions');

      await expect(actions).toContainText('Next');
    });
  });

  test.describe('SecondStep story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-stepperdialog--second-step&viewMode=story',
      );
      await page.locator('.p-dialog').waitFor();
    });

    test('should display the second step content', async ({ page }) => {
      const content = page.locator('npn-step-panel .content');

      await expect(content).toContainText('Step 2: Add content');
    });

    test('should display Back and Next buttons', async ({ page }) => {
      const actions = page.locator('npn-step-panel .actions');

      await expect(actions).toContainText('Back');
      await expect(actions).toContainText('Next');
    });
  });

  test.describe('TwoStepDialog story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-stepperdialog--two-step-dialog&viewMode=story',
      );
      await page.locator('.p-dialog').waitFor();
    });

    test('should display the dialog title', async ({ page }) => {
      const header = page.locator('.p-dialog-title');

      await expect(header).toContainText('Quick note');
    });

    test('should display two steps', async ({ page }) => {
      const steps = page.locator('p-step');

      await expect(steps).toHaveCount(2);
    });

    test('should display the first step content', async ({ page }) => {
      const content = page.locator('npn-step-panel .content');

      await expect(content).toContainText('Step 1: Choose a date');
    });
  });

  test.describe('Hidden story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-stepperdialog--hidden&viewMode=story',
      );
      // Wait for the component to load
      await page.waitForTimeout(1000);
    });

    test('should not display the dialog when hidden', async ({ page }) => {
      const dialogContent = page.locator('.p-dialog');

      await expect(dialogContent).toHaveCount(0);
    });
  });
});
