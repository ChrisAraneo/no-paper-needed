import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { format } from 'date-fns';
import { interval, mergeMap, Subscription } from 'rxjs';
import { LocaleService } from '../../core/services/locale/locale.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {
  WEEKDAY_DAY_MONTH_DATE_FORMAT,
} from '../../shared/consts/consts';
import { MINUTE_MS } from '../../shared/consts/utils';

@Component({
  selector: 'app-today',
  imports: [HeaderComponent, TranslateModule],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss',
})
export class TodayComponent implements OnInit, OnDestroy {
  protected readonly localeService = inject(LocaleService);

  protected now = '';

  private readonly subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.localeService.get().subscribe((locale) => {
        this.updateNow(locale);
      }),
    );

    this.subscription.add(
      interval(MINUTE_MS)
        .pipe(mergeMap(() => this.localeService.get()))
        .subscribe((locale) => {
          this.updateNow(locale);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateNow(locale: string): void {
    this.now = format(new Date(), WEEKDAY_DAY_MONTH_DATE_FORMAT, {
      locale: this.localeService.getDateFnsLocale(locale),
    }).replace(/^./u, (c) => c.toUpperCase());
  }
}
