import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Locale } from 'date-fns';
import { enGB, pl } from 'date-fns/locale';
import { distinctUntilChanged, filter, map, Observable, startWith } from 'rxjs';
import { FALLBACK_LOCALE } from '@no-paper-needed/shared/consts';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly locale = inject<string>(LOCALE_ID);
  private readonly router = inject(Router);

  get(): Observable<string> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.extractLangFromUrl()),
      distinctUntilChanged(),
    );
  }

  getCurrentLang(): string {
    return this.extractLangFromUrl();
  }

  getDateFnsLocale(locale: string): Locale {
    switch (locale) {
      case 'pl': {
        return pl;
      }
      case 'en': {
        return enGB;
      }
      default: {
        return enGB;
      }
    }
  }

  private extractLangFromUrl(): string {
    const url = this.router.url;
    const segments = url.split('/').filter((s) => s.length > 0);
    const lang = segments[0]?.split('?')[0];

    if (lang && lang.length > 0) {
      return lang;
    }

    return this.locale.split('-')[0] || FALLBACK_LOCALE;
  }
}

