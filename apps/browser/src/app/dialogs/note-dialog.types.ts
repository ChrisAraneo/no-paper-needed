import { FormControl, FormGroup } from '@angular/forms';
import { ReminderMode } from '../shared/interfaces/reminder-mode.enum';

export interface NoteDialogFormGroupValue {
  date: FormControl<Date>;
  content: FormControl<string>;
  reminderMode: FormControl<ReminderMode>;
  reminderDaysBefore: FormControl<number>;
}

export type NoteDialogFormGroup = FormGroup<NoteDialogFormGroupValue>;
