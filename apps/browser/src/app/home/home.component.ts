import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';

import { StoreService } from '../core/services';
import { NoteComponent } from '../shared/components/note/note.component';
import { TodayComponent } from '../shared/components/today/today.component';
import { LocaleService } from './../core/services/locale/locale.service';

const MAX_ROW_LENGTH = 3;
const LAST_INDEX = -1;

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

  protected notes = this.storeService.notes$.pipe(
    map((notes) =>
      notes.reduce<(typeof notes)[]>((rows, note, index) => {
        if (index % MAX_ROW_LENGTH) {
          rows.at(LAST_INDEX)?.push(note);
        } else {
          rows.push([note]);
        }
        return rows;
      }, []),
    ),
  );

  protected editNote(note: unknown): void {
    // TODO
  }
}
