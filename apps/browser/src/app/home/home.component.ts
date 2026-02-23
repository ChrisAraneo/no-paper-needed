import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';

import { StoreService } from '../core/services';
import { DialogService } from '../core/services/dialog/dialog.service';
import { NoteComponent } from '../shared/components/note/note.component';
import { TodayComponent } from '../shared/components/today/today.component';
import { Note } from '../shared/interfaces/note.interface';

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
  private readonly storeService = inject(StoreService);
  private readonly dialogService = inject(DialogService);

  protected todayNotes = this.storeService.getNoteTableForDate(new Date());

  protected editNote(note: Note): void {
    this.dialogService.openEditNoteDialog(note);
  }
}
