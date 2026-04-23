import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { THEME } from '@no-paper-needed/shared/theme';
import { FALLBACK_LOCALE } from '@no-paper-needed/shared/tokens';
import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { providePrimeNG } from 'primeng/config';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        providePrimeNG({ theme: THEME }),
        importProvidersFrom(TranslateModule.forRoot()),
        provideRouter([]),
        { provide: FALLBACK_LOCALE, useValue: 'en' },
      ],
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
