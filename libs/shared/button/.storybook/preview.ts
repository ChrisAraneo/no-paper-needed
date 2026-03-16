import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';
import { THEME } from '../../../../apps/browser/src/app/shared/styles/theme';

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
        date: /Date$/i,
      },
    },
  },
};

export default preview;

