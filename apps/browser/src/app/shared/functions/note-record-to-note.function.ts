import { NoteRecord } from '@no-paper-needed/shared/interfaces';
import { Note } from '@no-paper-needed/shared/interfaces';

export const noteRecordToNote = (record: NoteRecord): Note => ({
  id: record.id,
  date: new Date(record.date),
  content: record.content,
  reminderDaysBefore: record.reminderDaysBefore,
  ...(record.recurrence ? { recurrence: record.recurrence } : {}),
});
