import { expect, test } from '@playwright/test';

test.describe('NoteComponent', () => {
  test.describe('Default story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/iframe.html?id=components-note--default&viewMode=story');
      await page.locator('app-note .container').waitFor();
    });

    test('should render the note card', async ({ page }) => {
      const card = page.locator('app-note p-card');

      await expect(card).toBeVisible();
    });

    test('should display the note content', async ({ page }) => {
      const content = page.locator('app-note .content');

      await expect(content).toContainText('Buy groceries');
    });

    test('should display the formatted date', async ({ page }) => {
      const date = page.locator('app-note .date');

      await expect(date).toBeVisible();
      await expect(date).not.toHaveText('');
    });

    test('should not show the edit button', async ({ page }) => {
      const editButton = page.locator('app-note .edit-button');

      await expect(editButton).toHaveCount(0);
    });

    test('should not show reminder icon', async ({ page }) => {
      const bell = page.locator('app-note .pi-bell');

      await expect(bell).toHaveCount(0);
    });

    test('should not show recurrence icon', async ({ page }) => {
      const replay = page.locator('app-note .pi-replay');

      await expect(replay).toHaveCount(0);
    });
  });

  test.describe('WithEditButton story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-note--with-edit-button&viewMode=story',
      );
      await page.locator('app-note .container').waitFor();
    });

    test('should display the edit button', async ({ page }) => {
      const editButton = page.locator('app-note .edit-button');

      await expect(editButton).toBeVisible();
    });

    test('should display the pencil icon in the edit button', async ({
      page,
    }) => {
      const icon = page.locator('app-note .edit-button .pi-pencil');

      await expect(icon).toBeVisible();
    });

    test('should display the note content', async ({ page }) => {
      const content = page.locator('app-note .content');

      await expect(content).toContainText('Doctor appointment');
    });
  });

  test.describe('WithReminder story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-note--with-reminder&viewMode=story',
      );
      await page.locator('app-note .container').waitFor();
    });

    test('should display the reminder icon', async ({ page }) => {
      const bell = page.locator('app-note .pi-bell');

      await expect(bell).toBeVisible();
    });

    test('should display the reminder days count', async ({ page }) => {
      const footer = page.locator('app-note .footer');

      await expect(footer).toContainText('3');
    });

    test('should display the note content', async ({ page }) => {
      const content = page.locator('app-note .content');

      await expect(content).toContainText('Pay rent');
    });
  });

  test.describe('WithRecurrence story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-note--with-recurrence&viewMode=story',
      );
      await page.locator('app-note .container').waitFor();
    });

    test('should display the recurrence icon', async ({ page }) => {
      const replay = page.locator('app-note .pi-replay');

      await expect(replay).toBeVisible();
    });

    test('should display the note content', async ({ page }) => {
      const content = page.locator('app-note .content');

      await expect(content).toContainText('Water the plants');
    });

    test('should not show reminder icon', async ({ page }) => {
      const bell = page.locator('app-note .pi-bell');

      await expect(bell).toHaveCount(0);
    });
  });

  test.describe('WithReminderAndRecurrence story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-note--with-reminder-and-recurrence&viewMode=story',
      );
      await page.locator('app-note .container').waitFor();
    });

    test('should display both reminder and recurrence icons', async ({
      page,
    }) => {
      const bell = page.locator('app-note .pi-bell');
      const replay = page.locator('app-note .pi-replay');

      await expect(bell).toBeVisible();
      await expect(replay).toBeVisible();
    });

    test('should display the edit button', async ({ page }) => {
      const editButton = page.locator('app-note .edit-button');

      await expect(editButton).toBeVisible();
    });

    test('should display the note content', async ({ page }) => {
      const content = page.locator('app-note .content');

      await expect(content).toContainText('Christmas dinner preparation');
    });
  });

  test.describe('LongContent story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-note--long-content&viewMode=story',
      );
      await page.locator('app-note .container').waitFor();
    });

    test('should display the long content', async ({ page }) => {
      const content = page.locator('app-note .content');

      await expect(content).toContainText('This is a much longer note content');
    });

    test('should not show the edit button', async ({ page }) => {
      const editButton = page.locator('app-note .edit-button');

      await expect(editButton).toHaveCount(0);
    });
  });

  test.describe('MonthlyRecurrence story', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/iframe.html?id=components-note--monthly-recurrence&viewMode=story',
      );
      await page.locator('app-note .container').waitFor();
    });

    test('should display the recurrence icon', async ({ page }) => {
      const replay = page.locator('app-note .pi-replay');

      await expect(replay).toBeVisible();
    });

    test('should display the reminder icon', async ({ page }) => {
      const bell = page.locator('app-note .pi-bell');

      await expect(bell).toBeVisible();
    });

    test('should display the edit button', async ({ page }) => {
      const editButton = page.locator('app-note .edit-button');

      await expect(editButton).toBeVisible();
    });

    test('should display the note content', async ({ page }) => {
      const content = page.locator('app-note .content');

      await expect(content).toContainText('Monthly report');
    });
  });
});
