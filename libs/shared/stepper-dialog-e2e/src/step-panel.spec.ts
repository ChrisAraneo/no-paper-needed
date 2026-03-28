import { expect, test } from '@playwright/test';

test.describe('StepPanelComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-steppanel--default&viewMode=story',
      );
      await page.locator('npn-step-panel .step').waitFor();
    });

    test('should render the step panel', async ({ page }) => {
      const step = page.locator('npn-step-panel .step');

      await expect(step).toBeVisible();
    });

    test('should display the content', async ({ page }) => {
      const content = page.locator('npn-step-panel .content');

      await expect(content).toContainText(
        'This is the step panel content area.',
      );
    });

    test('should not display any action buttons', async ({ page }) => {
      const buttons = page.locator('npn-step-panel .actions npn-button');

      await expect(buttons).toHaveCount(0);
    });
  });

  test.describe('WithOneAction story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-steppanel--with-one-action&viewMode=story',
      );
      await page.locator('npn-step-panel .step').waitFor();
    });

    test('should display one action button', async ({ page }) => {
      const buttons = page.locator('npn-step-panel .actions npn-button');

      await expect(buttons).toHaveCount(1);
    });

    test('should display the Next button with arrow icon', async ({ page }) => {
      const button = page.locator('npn-step-panel .actions npn-button');

      await expect(button).toContainText('Next');
    });

    test('should display the arrow-right icon', async ({ page }) => {
      const icon = page.locator('npn-step-panel .actions .pi-arrow-right');

      await expect(icon).toBeVisible();
    });
  });

  test.describe('WithTwoActions story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-steppanel--with-two-actions&viewMode=story',
      );
      await page.locator('npn-step-panel .step').waitFor();
    });

    test('should display two action buttons', async ({ page }) => {
      const buttons = page.locator('npn-step-panel .actions npn-button');

      await expect(buttons).toHaveCount(2);
    });

    test('should display Back and Next buttons', async ({ page }) => {
      const actions = page.locator('npn-step-panel .actions');

      await expect(actions).toContainText('Back');
      await expect(actions).toContainText('Next');
    });
  });

  test.describe('WithDisabledAction story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-steppanel--with-disabled-action&viewMode=story',
      );
      await page.locator('npn-step-panel .step').waitFor();
    });

    test('should display the Save button as disabled', async ({ page }) => {
      const saveButton = page
        .locator('npn-step-panel .actions npn-button')
        .nth(1);
      const button = saveButton.locator('button');

      await expect(button).toBeDisabled();
    });

    test('should display the Back button as enabled', async ({ page }) => {
      const backButton = page
        .locator('npn-step-panel .actions npn-button')
        .first();
      const button = backButton.locator('button');

      await expect(button).toBeEnabled();
    });
  });

  test.describe('WithSaveAction story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-steppanel--with-save-action&viewMode=story',
      );
      await page.locator('npn-step-panel .step').waitFor();
    });

    test('should display Back and Save buttons', async ({ page }) => {
      const actions = page.locator('npn-step-panel .actions');

      await expect(actions).toContainText('Back');
      await expect(actions).toContainText('Save');
    });

    test('should display the check icon on the Save button', async ({
      page,
    }) => {
      const icon = page.locator('npn-step-panel .actions .pi-check');

      await expect(icon).toBeVisible();
    });
  });
});
