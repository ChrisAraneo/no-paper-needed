import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '@no-paper-needed/components/header';
import { LabelComponent } from '@no-paper-needed/components/label';
import { LocaleService } from '@no-paper-needed/shared/locale';
import { DATE_FORMAT } from '@no-paper-needed/shared/tokens';
import { format } from 'date-fns';
import { interval, mergeMap, Subscription } from 'rxjs';

import { MINUTE_MS } from '../../shared/consts/utils';

@Component({
  selector: 'app-today',
  imports: [HeaderComponent, LabelComponent, TranslateModule],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss',
})
export class TodayComponent implements OnInit, OnDestroy {
  private readonly dateFormat = inject(DATE_FORMAT);
  private readonly localeService = inject(LocaleService);

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
    this.now = format(new Date(), this.dateFormat, {
      locale: this.localeService.getDateFnsLocale(locale),
    }).replace(/^./u, (c) => c.toUpperCase());
  }
}
