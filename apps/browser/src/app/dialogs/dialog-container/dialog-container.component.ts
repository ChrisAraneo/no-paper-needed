import { Component, inject } from '@angular/core';

import { DialogService } from '../../core/services/dialog/dialog.service';
import { StoreService } from '../../core/services/store/store.service';
import { Note } from '../../shared/interfaces/note.interface';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';

@Component({
  selector: 'app-dialog-container',
  imports: [AddNoteDialogComponent, EditNoteDialogComponent],
  templateUrl: './dialog-container.component.html',
})
export class DialogContainerComponent {
  protected readonly dialogService = inject(DialogService);

  private readonly storeService = inject(StoreService);

  protected onSaveNote(note: Note): void {
    this.storeService.addNote(note);
    this.dialogService.closeAddNoteDialog();
  }

  protected onEditNote(note: Note): void {
    this.storeService.editNote(note);
    this.dialogService.closeEditNoteDialog();
  }
}
