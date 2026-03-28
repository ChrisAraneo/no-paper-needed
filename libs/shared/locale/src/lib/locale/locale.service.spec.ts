import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FALLBACK_LOCALE } from '@no-paper-needed/shared/tokens';
import { enGB, pl } from 'date-fns/locale';
import { firstValueFrom, Subject } from 'rxjs';

import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  let service: LocaleService;
  let routerEventsSubject: Subject<unknown>;
  let mockRouter: { events: Subject<unknown>; url: string };

  beforeEach(() => {
    routerEventsSubject = new Subject();
    mockRouter = {
      events: routerEventsSubject,
      url: '/en/home',
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: LOCALE_ID,
          useValue: 'en',
        },
        {
          provide: FALLBACK_LOCALE,
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
    it('should return locale from URL path', async () => {
      mockRouter.url = '/pl/home';

      const locale = await firstValueFrom(service.get());
      expect(locale).toBe('pl');
    });

    it('should return locale from URL path after navigation', async () => {
      mockRouter.url = '/en/home';
      const promise = firstValueFrom(service.get());

      const locale = await promise;
      expect(locale).toBe('en');
    });

    it('should return fallback locale when URL has no lang segment', async () => {
      mockRouter.url = '/';

      const locale = await firstValueFrom(service.get());
      expect(locale).toBe('en');
    });
  });

  describe('getCurrentLang()', () => {
    it('should return current lang from URL', () => {
      mockRouter.url = '/pl/archive';

      expect(service.getCurrentLang()).toBe('pl');
    });

    it('should return fallback when URL is root', () => {
      mockRouter.url = '/';

      expect(service.getCurrentLang()).toBe('en');
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
