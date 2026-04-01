import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { StoreService } from '../core/services';
import { DialogService } from '../core/services/dialog/dialog.service';
import { NoteComponent } from '@no-paper-needed/components/note';
import { Note } from '@no-paper-needed/interfaces';
import { TodayComponent } from './today/today.component';
import { TextComponent } from '@no-paper-needed/components/text';

@Component({
  selector: 'app-home',
  imports: [
    TranslateModule,
    NoteComponent,
    CommonModule,
    AsyncPipe,
    TodayComponent,
    TextComponent,
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
