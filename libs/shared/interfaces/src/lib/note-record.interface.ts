import { Recurrence } from './recurrence.interface';

export interface NoteRecord {
  id: string;
  date: string;
  content: string;
  reminderDaysBefore: number;
  recurrence?: Recurrence;
}
