import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { providePrimeNG } from 'primeng/config';
import { THEME } from '@no-paper-needed/shared/theme';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        providePrimeNG({ theme: THEME }),
        importProvidersFrom(TranslateModule.forRoot()),
      ],
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
