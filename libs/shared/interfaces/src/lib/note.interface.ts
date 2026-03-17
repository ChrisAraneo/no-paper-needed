import { Recurrence } from './recurrence.interface';

export interface Note {
  id: string;
  date: Date;
  content: string;
  reminderDaysBefore: number;
  recurrence?: Recurrence;
}
