import { FormControl, FormGroup } from '@angular/forms';
import { RecurrenceMode } from '@no-paper-needed/shared/interfaces';
import { ReminderMode } from '@no-paper-needed/shared/interfaces';

export interface NoteDialogFormGroupValue {
  date: FormControl<Date>;
  content: FormControl<string>;
  reminderMode: FormControl<ReminderMode>;
  reminderDaysBefore: FormControl<number>;
  recurrenceMode: FormControl<RecurrenceMode>;
  recurrenceDays: FormControl<number>;
}

export type NoteDialogFormGroup = FormGroup<NoteDialogFormGroupValue>;
