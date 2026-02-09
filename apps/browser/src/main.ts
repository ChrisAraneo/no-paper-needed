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
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { providePrimeNG } from 'primeng/config';

import { AppComponent } from './app/app.component';
import { CoreModule } from './app/core/core.module';
import { DetailComponent } from './app/detail/detail.component';
import { HomeComponent } from './app/home/home.component';
import { SharedModule } from './app/shared/shared.module';
import { APP_CONFIG } from '../environments/environment';
import { THEME } from './app/shared/styles/theme';

if (APP_CONFIG.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
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
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'detail',
        component: DetailComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]),
    importProvidersFrom(CoreModule, SharedModule),
  ],
}).catch((error: unknown) => console.error(error));
