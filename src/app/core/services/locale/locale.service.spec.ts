import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { enGB, pl } from 'date-fns/locale';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  let service: LocaleService;
  let queryParamsSubject: BehaviorSubject<Record<string, unknown>>;

  beforeEach(() => {
    queryParamsSubject = new BehaviorSubject<Record<string, unknown>>({});

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: queryParamsSubject.asObservable(),
          },
        },
        {
          provide: LOCALE_ID,
          useValue: 'en',
        },
      ],
    });
    service = TestBed.inject(LocaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {
    it('should return locale from query params when it is a string', async () => {
      queryParamsSubject.next({ locale: 'pl' });

      const locale = await firstValueFrom(service.get());
      expect(locale).toBe('pl');
    });

    it('should return injected LOCALE_ID when query param locale is not a string', async () => {
      queryParamsSubject.next({ locale: ['pl', 'en'] });

      const locale = await firstValueFrom(service.get());
      expect(locale).toBe('en');
    });

    it('should return injected LOCALE_ID when query param locale is undefined', async () => {
      queryParamsSubject.next({});

      const locale = await firstValueFrom(service.get());
      expect(locale).toBe('en');
    });

    it('should return injected LOCALE_ID when query params are empty', async () => {
      const locale = await firstValueFrom(service.get());
      expect(locale).toBe('en');
    });
  });

  describe('getDateFnsLocale()', () => {
    it('should return Polish locale for "pl"', () => {
      const result = service.getDateFnsLocale('pl');
      expect(result).toBe(pl);
    });

    it('should return English GB locale for "en"', () => {
      const result = service.getDateFnsLocale('en');
      expect(result).toBe(enGB);
    });

    it('should return English GB locale as default for unknown locale', () => {
      const result = service.getDateFnsLocale('fr');
      expect(result).toBe(enGB);
    });

    it('should return English GB locale as default for empty string', () => {
      const result = service.getDateFnsLocale('');
      expect(result).toBe(enGB);
    });
  });
});
