import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { StoreService } from '../core/services';
import { NoteComponent } from '../shared/components/note/note.component';
import { TodayComponent } from '../shared/components/today/today.component';
import { LocaleService } from './../core/services/locale/locale.service';

@Component({
  selector: 'app-home',
  imports: [
    TranslateModule,
    NoteComponent,
    CommonModule,
    AsyncPipe,
    TodayComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly localeService = inject(LocaleService);
  readonly storeService = inject(StoreService);

  protected notes = this.storeService.notes$;
}
