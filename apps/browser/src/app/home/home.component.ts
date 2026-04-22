import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NoteComponent } from '@no-paper-needed/components/note';
import { TextComponent } from '@no-paper-needed/components/text';
import { Note } from '@no-paper-needed/interfaces';

import { StoreService } from '../core/services';
import { DialogService } from '../core/services/dialog/dialog.service';
import { TodayComponent } from './today/today.component';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    CommonModule,
    NoteComponent,
    TextComponent,
    TodayComponent,
    TranslateModule,
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
