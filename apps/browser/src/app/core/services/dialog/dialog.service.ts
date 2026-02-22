import { computed, Injectable, signal } from '@angular/core';

import { Note } from '../../../shared/interfaces/note.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly isAddNoteDialogVisible = signal(false);
  private readonly isEditNoteDialogVisible = signal(false);
  private readonly editedNote = signal<Note | undefined>(undefined);

  readonly isAnyDialogOpen = computed(
    () => this.isAddNoteDialogVisible() || this.isEditNoteDialogVisible(),
  );

  openAddNoteDialog(): void {
    this.isAddNoteDialogVisible.set(true);
  }

  closeAddNoteDialog(): void {
    this.isAddNoteDialogVisible.set(false);
  }

  openEditNoteDialog(note: Note): void {
    this.editedNote.set(note);
    this.isEditNoteDialogVisible.set(true);
  }

  closeEditNoteDialog(): void {
    this.isEditNoteDialogVisible.set(false);
    this.editedNote.set(undefined);
  }
}
