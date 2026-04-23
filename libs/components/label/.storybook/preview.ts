import { THEME } from '@no-paper-needed/shared/theme';
import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [providePrimeNG({ theme: THEME })],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
};

export default preview;
