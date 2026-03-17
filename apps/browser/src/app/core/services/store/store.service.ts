import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  from,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { Note, Recurrence } from '@no-paper-needed/shared/interfaces';
import { getDayDiff } from '../../../shared/functions/get-day-diff.function';
import { NoteRecord } from '../../../shared/interfaces/note-record.interface';
import { addDays, addMonths, addYears } from 'date-fns';
import Dexie, { Table } from 'dexie';
import { noteToNoteRecord } from '../../../shared/functions/note-to-note-record.function';
import { noteRecordToNote } from '../../../shared/functions/note-record-to-note.function';
import { noop } from 'lodash-es';
import { format } from 'date-fns';
import { LocaleService } from '../locale/locale.service';
import { WEEKDAY_DAY_MONTH_DATE_FORMAT } from '../../../shared/consts/consts';
import { LAST_INDEX } from '../../../shared/consts/utils';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly localeService = inject(LocaleService);

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
      filter(Boolean),
      switchMap(() => this.notes.asObservable()),
      map((notes) => this.filterNotesForDate(notes, date)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  getOutdatedNoteTableForDate(date: Date): Observable<Note[][]> {
    return this.initialized.asObservable().pipe(
      filter(Boolean),
      switchMap(() => this.notes.asObservable()),
      map((notes) => this.filterOutdatedNotesForDate(notes, date)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  searchNotes(query: string): Observable<Note[][]> {
    return this.initialized.asObservable().pipe(
      filter(Boolean),
      switchMap(() => this.notes.asObservable()),
      map((notes) => this.filterNotesByQuery(notes, query)),
      map((notes) => this.sortNotesByDate(notes)),
      map((notes) => this.transformNotesToNoteTable(notes, 3)),
    );
  }

  addNote(note: Note): Observable<void> {
    return this.initialized.asObservable().pipe(
      filter(Boolean),
      mergeMap(() => from(this.database.notes.add(noteToNoteRecord(note)))),
      tap(() => {
        const currentNotes = this.notes.value;
        this.notes.next([...currentNotes, note]);
      }),
      map(noop),
    );
  }

  editNote(note: Note): Observable<void> {
    return this.initialized.asObservable().pipe(
      filter(Boolean),
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
      map(noop),
    );
  }

  removeNote(index: number): Observable<void> {
    return this.initialized.asObservable().pipe(
      filter(Boolean),
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
          return of(void 0);
        }
      }),
      map(noop),
    );
  }

  private sortNotesByDate(notes: Note[]): Note[] {
    return notes.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  private transformNotesToNoteTable(
    notes: Note[],
    maxRowLength: number,
  ): Note[][] {
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
    return notes.filter((note) => {
      const closestDate = this.getClosestOccurrence(note, date);
      const dayDiff = getDayDiff(date, closestDate);

      return dayDiff <= 0 && dayDiff >= -note.reminderDaysBefore;
    });
  }

  private filterOutdatedNotesForDate(notes: Note[], date: Date): Note[] {
    return notes.filter((note) => {
      if (note.recurrence) {
        return false;
      }

      const dayDiff = getDayDiff(date, note.date);

      return dayDiff > 0;
    });
  }

  private getClosestOccurrence(note: Note, targetDate: Date): Date {
    if (!note.recurrence) {
      return note.date;
    }

    const recurrence = note.recurrence;
    let current = new Date(note.date);

    if (getDayDiff(targetDate, current) < 0) {
      return current;
    }

    while (getDayDiff(targetDate, current) > 0) {
      current = this.addRecurrenceInterval(current, recurrence);
    }

    return current;
  }

  private addRecurrenceInterval(date: Date, recurrence: Recurrence): Date {
    let result = date;

    if (recurrence.years > 0) {
      result = addYears(result, recurrence.years);
    }
    if (recurrence.months > 0) {
      result = addMonths(result, recurrence.months);
    }
    if (recurrence.days > 0) {
      result = addDays(result, recurrence.days);
    }

    return result;
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
        format(note.date, WEEKDAY_DAY_MONTH_DATE_FORMAT, {
          locale: this.localeService.getDateFnsLocale('en'),
        }),
        format(note.date, WEEKDAY_DAY_MONTH_DATE_FORMAT, {
          locale: this.localeService.getDateFnsLocale('pl'),
        }),
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
      map(noop),
    );
  }
}
