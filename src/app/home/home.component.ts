import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { format } from 'date-fns';
import { interval, mergeMap, Subscription } from 'rxjs';

import { StoreService } from '../core/services';
import { HeaderComponent } from '../shared/components/header/header.component';
import { NoteComponent } from '../shared/components/note/note.component';
import { LocaleService } from './../core/services/locale/locale.service';

const MINUTE_MS = 60_000;

@Component({
  selector: 'app-home',
  imports: [
    TranslateModule,
    NoteComponent,
    CommonModule,
    AsyncPipe,
    HeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly localeService = inject(LocaleService);
  readonly storeService = inject(StoreService);

  protected notes = this.storeService.notes$;
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
    this.now = format(new Date(), 'EEEE dd.MM', {
      locale: this.localeService.getDateFnsLocale(locale),
    }).replace(/^./u, (c) => c.toUpperCase());
  }
}
