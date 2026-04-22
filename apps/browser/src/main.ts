import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { THEME } from '@no-paper-needed/shared/theme';
import { DATE_FORMAT, FALLBACK_LOCALE } from '@no-paper-needed/shared/tokens';
import { providePrimeNG } from 'primeng/config';

import { APP_CONFIG } from '../environments/environment';
import { AppComponent } from './app/app.component';
import { ArchiveComponent } from './app/archive/archive.component';
import { CoreModule } from './app/core/core.module';
import { HomeComponent } from './app/home/home.component';
import { SearchComponent } from './app/search/search.component';

const FALLBACK_LOCALE_VALUE = 'en';
const DATE_FORMAT_VALUE = 'EEEE dd.MM';

if (APP_CONFIG.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: DATE_FORMAT, useValue: DATE_FORMAT_VALUE },
    { provide: FALLBACK_LOCALE, useValue: FALLBACK_LOCALE_VALUE },
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
    providePrimeNG({
      theme: THEME,
    }),
    provideRouter([
      {
        path: '',
        redirectTo: `${FALLBACK_LOCALE_VALUE}/home`,
        pathMatch: 'full',
      },
      {
        path: ':lang',
        children: [
          {
            path: 'home',
            children: [
              { path: '', component: HomeComponent },
              { path: 'search', component: SearchComponent },
            ],
          },
          {
            path: 'archive',
            children: [
              { path: '', component: ArchiveComponent },
              { path: 'search', component: SearchComponent },
            ],
          },
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '**',
        redirectTo: `${FALLBACK_LOCALE_VALUE}/home`,
      },
    ]),
    importProvidersFrom(CoreModule),
  ],
}).catch((error: unknown) => console.error(error));
