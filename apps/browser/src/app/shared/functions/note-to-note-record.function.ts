import { NoteRecord } from '@no-paper-needed/interfaces';
import { Note } from '@no-paper-needed/interfaces';

export const noteToNoteRecord = (note: Note): NoteRecord => ({
  id: note.id,
  date: note.date.toISOString(),
  content: note.content,
  reminderDaysBefore: note.reminderDaysBefore,
  ...(note.recurrence ? { recurrence: note.recurrence } : {}),
});
