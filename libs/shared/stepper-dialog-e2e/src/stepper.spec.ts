import { expect, test } from '@playwright/test';

test.describe('StepperComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=shared-stepper--default&viewMode=story');
      await page.locator('npn-stepper p-stepper').waitFor();
    });

    test('should render the stepper', async ({ page }) => {
      const stepper = page.locator('npn-stepper p-stepper');

      await expect(stepper).toBeVisible();
    });

    test('should display three step labels', async ({ page }) => {
      const steps = page.locator('npn-stepper p-step');

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

  test.describe('SecondStepActive story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-stepper--second-step-active&viewMode=story',
      );
      await page.locator('npn-stepper p-stepper').waitFor();
    });

    test('should display three steps', async ({ page }) => {
      const steps = page.locator('npn-stepper p-step');

      await expect(steps).toHaveCount(3);
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

  test.describe('TwoSteps story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=shared-stepper--two-steps&viewMode=story',
      );
      await page.locator('npn-stepper p-stepper').waitFor();
    });

    test('should display two steps', async ({ page }) => {
      const steps = page.locator('npn-stepper p-step');

      await expect(steps).toHaveCount(2);
    });

    test('should display the first step content', async ({ page }) => {
      const content = page.locator('npn-step-panel .content');

      await expect(content).toContainText('Step 1: Choose a date');
    });
  });
});
