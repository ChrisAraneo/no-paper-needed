import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Note } from '../../../shared/interfaces/note.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly notesSubject = new BehaviorSubject<Note[]>([]);

  notes$: Observable<Note[]> = this.notesSubject.asObservable();

  addNote(note: Note): void {
    const currentNotes = this.notesSubject.value;
    this.notesSubject.next([...currentNotes, note]);
  }

  getNotes(): Note[] {
    return this.notesSubject.value;
  }

  removeNote(index: number): void {
    const currentNotes = this.notesSubject.value;
    this.notesSubject.next(currentNotes.filter((_, i) => i !== index));
  }

  updateNote(index: number, note: Note): void {
    const currentNotes = this.notesSubject.value;
    const updatedNotes = [...currentNotes];
    updatedNotes[index] = note;
    this.notesSubject.next(updatedNotes);
  }
}
