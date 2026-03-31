import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

const baseURL = process.env['BASE_URL'] || 'http://localhost:6014';

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  retries: 1,
  workers: 1,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx nx run toolbar:storybook --port=6014',
    url: 'http://localhost:6014',
    reuseExistingServer: true,
    timeout: 120000,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
