export interface Recurrence {
  days: number;
  months: number;
  years: number;
}

export interface Note {
  id: string;
  date: Date;
  content: string;
  reminderDaysBefore: number;
  recurrence?: Recurrence;
}
