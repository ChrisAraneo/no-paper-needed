import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  from,
  map,
  mergeMap,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

import { Note } from '../../../shared/interfaces/note.interface';
import { getDayDiff } from '../../../shared/functions/get-day-diff.function';
import { NoteRecord } from '../../../shared/interfaces/note-record.interface';
import Dexie, { Table } from 'dexie';
import { noteToNoteRecord } from '../../../shared/functions/note-to-note-record.function';
import { noteRecordToNote } from '../../../shared/functions/note-record-to-note.function';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly notes = new BehaviorSubject<Note[]>([]);
  private readonly initialized = new BehaviorSubject<boolean>(false);
  private readonly database = new (class extends Dexie {
    notes!: Table<NoteRecord, string>;

    constructor() {
      super('NoPaperNeededDB');

      this.version(1).stores({
        notes: 'id',
      });
    }
  })();

  constructor() {
    this.restore()
      .pipe(tap(() => this.initialized.next(true)))
      .subscribe();
  }

  getNotes(): Observable<Note[]> {
    return this.restore().pipe(switchMap(() => this.notes.asObservable()));
  }

  getNoteTableForDate(date: Date): Observable<Note[][]> {
    return this.initialized.asObservable().pipe(
      filter((initialized) => initialized),
      switchMap(() => this.notes.asObservable()),
      map((notes) => this.filterNotesForDate(notes, date)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  getOutdatedNoteTableForDate(date: Date): Observable<Note[][]> {
    return this.initialized.asObservable().pipe(
      filter((initialized) => initialized),
      switchMap(() => this.notes.asObservable()),
      map((notes) => this.filterOutdatedNotesForDate(notes, date)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  searchNotes(query: string): Observable<Note[][]> {
    return this.initialized.asObservable().pipe(
      filter((initialized) => initialized),
      switchMap(() => this.notes.asObservable()),
      map((notes) => this.filterNotesByQuery(notes, query)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  addNote(note: Note): Observable<void> {
    return this.initialized.asObservable().pipe(
      filter((initialized) => initialized),
      mergeMap(() => from(this.database.notes.add(noteToNoteRecord(note)))),
      tap(() => {
        const currentNotes = this.notes.value;
        this.notes.next([...currentNotes, note]);
      }),
      map(() => undefined),
    );
  }

  editNote(note: Note): Observable<void> {
    return this.initialized.asObservable().pipe(
      filter((initialized) => initialized),
      mergeMap(() => from(this.database.notes.put(noteToNoteRecord(note)))),
      tap(() => {
        const currentNotes = this.notes.value;
        const index = currentNotes.findIndex((item) => item.id === note.id);

        if (index >= 0) {
          const updatedNotes = [...currentNotes];
          updatedNotes[index] = note;
          this.notes.next(updatedNotes);
        }
      }),
      map(() => undefined),
    );
  }

  removeNote(index: number): Observable<void> {
    return this.initialized.asObservable().pipe(
      filter((initialized) => initialized),
      map(() => {
        const currentNotes = this.notes.value;
        const noteToRemove = currentNotes[index];
        this.notes.next(currentNotes.filter((_, i) => i !== index));

        return noteToRemove;
      }),
      mergeMap((noteToRemove) => {
        if (noteToRemove) {
          return from(this.database.notes.delete(noteToRemove.id));
        } else {
          return from(Promise.resolve(undefined));
        }
      }),
      map(() => undefined),
    );
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

  private restore(): Observable<void> {
    return from(this.database.notes.toArray()).pipe(
      map((records) => records.map((record) => noteRecordToNote(record))),
      tap((notes) => {
        this.notes.next(notes);
      }),
      map(() => undefined),
    );
  }
}
