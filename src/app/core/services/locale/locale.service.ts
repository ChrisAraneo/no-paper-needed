/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Locale } from 'date-fns';
import { enGB, pl } from 'date-fns/locale';
import { isString } from 'lodash';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly locale = inject<string>(LOCALE_ID);
  private readonly activatedRoute = inject(ActivatedRoute);

  get(): Observable<string> {
    return this.activatedRoute.queryParams.pipe(
      map((params) => {
        if (this.isString(params.locale)) {
          return params.locale;
        }

        return this.locale;
      }),
    );
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

  private isString(value: unknown): value is string {
    return isString(value);
  }
}
