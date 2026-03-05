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

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly notesSubject = new BehaviorSubject<Note[]>([]);
  private readonly initializedSubject = new BehaviorSubject<boolean>(false);
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
      .pipe(tap(() => this.initializedSubject.next(true)))
      .subscribe();
  }

  getNotes(): Observable<Note[]> {
    return this.restore().pipe(
      switchMap(() => this.notesSubject.asObservable()),
    );
  }

  getNoteTableForDate(date: Date): Observable<Note[][]> {
    return this.initializedSubject.asObservable().pipe(
      filter((initialized) => initialized),
      switchMap(() => this.notesSubject.asObservable()),
      map((notes) => this.filterNotesForDate(notes, date)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  getOutdatedNoteTableForDate(date: Date): Observable<Note[][]> {
    return this.initializedSubject.asObservable().pipe(
      filter((initialized) => initialized),
      switchMap(() => this.notesSubject.asObservable()),
      map((notes) => this.filterOutdatedNotesForDate(notes, date)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  searchNotes(query: string): Observable<Note[][]> {
    return this.initializedSubject.asObservable().pipe(
      filter((initialized) => initialized),
      switchMap(() => this.notesSubject.asObservable()),
      map((notes) => this.filterNotesByQuery(notes, query)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  addNote(note: Note): Observable<void> {
    return this.initializedSubject.asObservable().pipe(
      filter((initialized) => initialized),
      mergeMap(() => from(this.database.notes.add(this.toRecord(note)))),
      tap(() => {
        const currentNotes = this.notesSubject.value;
        this.notesSubject.next([...currentNotes, note]);
      }),
      map(() => undefined),
    );
  }

  editNote(note: Note): Observable<void> {
    return this.initializedSubject.asObservable().pipe(
      filter((initialized) => initialized),
      mergeMap(() => from(this.database.notes.put(this.toRecord(note)))),
      tap(() => {
        const currentNotes = this.notesSubject.value;
        const index = currentNotes.findIndex((item) => item.id === note.id);

        if (index >= 0) {
          const updatedNotes = [...currentNotes];
          updatedNotes[index] = note;
          this.notesSubject.next(updatedNotes);
        }
      }),
      map(() => undefined),
    );
  }

  removeNote(index: number): Observable<void> {
    return this.initializedSubject.asObservable().pipe(
      filter((initialized) => initialized),
      map(() => {
        const currentNotes = this.notesSubject.value;
        const noteToRemove = currentNotes[index];
        this.notesSubject.next(currentNotes.filter((_, i) => i !== index));

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
      map((records) => records.map((record) => this.toNote(record))),
      tap((notes) => {
        this.notesSubject.next(notes);
      }),
      map(() => undefined),
    );
  }

  private toRecord(note: Note): NoteRecord {
    return {
      id: note.id,
      date: note.date.toISOString(),
      content: note.content,
      reminderDaysBefore: note.reminderDaysBefore,
    };
  }

  private toNote(record: NoteRecord): Note {
    return {
      id: record.id,
      date: new Date(record.date),
      content: record.content,
      reminderDaysBefore: record.reminderDaysBefore,
    };
  }
}
