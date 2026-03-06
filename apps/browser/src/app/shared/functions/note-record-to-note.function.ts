import { NoteRecord } from '../interfaces/note-record.interface';
import { Note } from '../interfaces/note.interface';

export const noteRecordToNote = (record: NoteRecord): Note => ({
  id: record.id,
  date: new Date(record.date),
  content: record.content,
  reminderDaysBefore: record.reminderDaysBefore,
});
