import { computed, Injectable, Signal, signal } from '@angular/core';

import { Note } from '@no-paper-needed/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly isAddNoteDialogOpen: Signal<boolean>;
  readonly isEditNoteDialogOpen: Signal<boolean>;
  readonly editedNote: Signal<Note | undefined>;

  private readonly isAddNoteDialogVisible = signal(false);
  private readonly isEditNoteDialogVisible = signal(false);
  private readonly _editedNote = signal<Note | undefined>(undefined);

  constructor() {
    this.isAddNoteDialogOpen = this.isAddNoteDialogVisible.asReadonly();
    this.isEditNoteDialogOpen = this.isEditNoteDialogVisible.asReadonly();
    this.editedNote = this._editedNote.asReadonly();
  }

  openAddNoteDialog(): void {
    this.isAddNoteDialogVisible.set(true);
  }

  closeAddNoteDialog(): void {
    this.isAddNoteDialogVisible.set(false);
  }

  openEditNoteDialog(note: Note): void {
    this._editedNote.set(note);
    this.isEditNoteDialogVisible.set(true);
  }

  closeEditNoteDialog(): void {
    this.isEditNoteDialogVisible.set(false);
    this._editedNote.set(undefined);
  }
}
