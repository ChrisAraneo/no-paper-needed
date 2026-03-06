import { NoteRecord } from '../interfaces/note-record.interface';
import { Note } from '../interfaces/note.interface';

export const noteToNoteRecord = (note: Note): NoteRecord => ({
  id: note.id,
  date: note.date.toISOString(),
  content: note.content,
  reminderDaysBefore: note.reminderDaysBefore,
});
