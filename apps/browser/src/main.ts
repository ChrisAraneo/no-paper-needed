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
import { providePrimeNG } from 'primeng/config';

import { AppComponent } from './app/app.component';
import { ArchiveComponent } from './app/archive/archive.component';
import { CoreModule } from './app/core/core.module';
import { HomeComponent } from './app/home/home.component';
import { SearchComponent } from './app/search/search.component';
import { SharedModule } from './app/shared/shared.module';
import { APP_CONFIG } from '../environments/environment';
import { THEME } from './app/shared/styles/theme';
import { FALLBACK_LOCALE } from './app/shared/consts/consts';

if (APP_CONFIG.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
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
        redirectTo: `${FALLBACK_LOCALE}/home`,
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
        redirectTo: `${FALLBACK_LOCALE}/home`,
      },
    ]),
    importProvidersFrom(CoreModule, SharedModule),
  ],
}).catch((error: unknown) => console.error(error));
