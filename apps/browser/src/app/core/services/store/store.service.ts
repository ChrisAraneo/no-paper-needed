import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { Note } from '../../../shared/interfaces/note.interface';
import { getDayDiff } from '../../../shared/functions/get-day-diff.function';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly notesSubject = new BehaviorSubject<Note[]>([]);

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  getNoteTableForDate(date: Date): Observable<Note[][]> {
    return this.notesSubject.asObservable().pipe(
      map((notes) => this.filterNotesForDate(notes, date)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  getOutdatedNoteTableForDate(date: Date): Observable<Note[][]> {
    return this.notesSubject.asObservable().pipe(
      map((notes) => this.filterOutdatedNotesForDate(notes, date)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  searchNotes(query: string): Observable<Note[][]> {
    return this.notesSubject.asObservable().pipe(
      map((notes) => this.filterNotesByQuery(notes, query)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  addNote(note: Note): void {
    const currentNotes = this.notesSubject.value;
    this.notesSubject.next([...currentNotes, note]);
  }

  editNote(note: Note): void {
    const currentNotes = this.notesSubject.value;
    const index = currentNotes.findIndex((item) => item.id === note.id);

    if (index >= 0) {
      const updatedNotes = [...currentNotes];
      updatedNotes[index] = note;
      this.notesSubject.next(updatedNotes);
    }
  }

  removeNote(index: number): void {
    const currentNotes = this.notesSubject.value;
    this.notesSubject.next(currentNotes.filter((_, i) => i !== index));
  }

  private sortNotesByDate(notes: Note[]): Note[] {
    return notes.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  private transformNotesToNoteTable(
    notes: Note[],
    maxRowLength: number,
  ): Note[][] {
    const LAST_INDEX = -1;

    return notes.reduce<(typeof notes)[]>((rows, note, index) => {
      if (index % maxRowLength) {
        rows.at(LAST_INDEX)?.push(note);
      } else {
        rows.push([note]);
      }
      return rows;
    }, []);
  }

  private filterNotesForDate(notes: Note[], date: Date): Note[] {
    return notes
      .map((note) => ({ note, dayDiff: getDayDiff(date, note.date) }))
      .filter(
        (item) =>
          item.dayDiff <= 0 && item.dayDiff >= -item.note.reminderDaysBefore,
      )
      .map((item) => item.note);
  }

  private filterOutdatedNotesForDate(notes: Note[], date: Date): Note[] {
    return notes
      .map((note) => ({ note, dayDiff: getDayDiff(date, note.date) }))
      .filter((item) => item.dayDiff > 0)
      .map((item) => item.note);
  }

  private filterNotesByQuery(notes: Note[], query: string): Note[] {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
      return [];
    }

    return notes.filter((note) => {
      const value = [
        note.content,
        note.date.toISOString(),
        note.date.toLocaleDateString('en-GB'),
        note.date.toLocaleDateString('pl-PL'),
        note.reminderDaysBefore,
        note.id,
      ]
        .join(' ')
        .toLocaleLowerCase();

      return value.includes(normalizedQuery);
    });
  }
}
