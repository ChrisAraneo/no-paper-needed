import { Recurrence } from '@no-paper-needed/shared/interfaces';

export interface NoteRecord {
  id: string;
  date: string;
  content: string;
  reminderDaysBefore: number;
  recurrence?: Recurrence;
}
