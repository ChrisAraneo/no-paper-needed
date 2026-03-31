import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { providePrimeNG } from 'primeng/config';
import { THEME } from '@no-paper-needed/shared/theme';
import { DATE_FORMAT, FALLBACK_LOCALE } from '@no-paper-needed/shared/tokens';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        providePrimeNG({ theme: THEME }),
        importProvidersFrom(TranslateModule.forRoot()),
        { provide: DATE_FORMAT, useValue: 'EEEE dd.MM' },
        { provide: FALLBACK_LOCALE, useValue: 'en' },
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
