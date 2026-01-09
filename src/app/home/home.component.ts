import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { pl } from 'date-fns/locale/pl';
import { interval } from 'rxjs';

import { StoreService } from '../core/services';
import { HeaderComponent } from '../shared/components/header/header.component';
import { NoteComponent } from '../shared/components/note/note.component';

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
export class HomeComponent implements OnInit {
  readonly storeService = inject(StoreService);

  protected notes = this.storeService.notes$;
  protected now = '';

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const locale = urlParams.get('locale');

    this.now = format(new Date(), 'EEEE dd.MM', {
      locale: locale === 'en' ? enGB : pl,
    }).replace(/^./u, (c) => c.toUpperCase());

    interval(MINUTE_MS).subscribe(() => {
      this.now = format(new Date(), 'EEEE dd.MM').replace(/^./u, (c) =>
        c.toUpperCase(),
      );
    });
  }
}
