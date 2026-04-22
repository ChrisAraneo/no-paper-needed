import { NgClass } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '@no-paper-needed/components/header';
import { NoteComponent } from '@no-paper-needed/components/note';
import {
  StepPanelDirective,
  StepperDialogComponent,
} from '@no-paper-needed/components/stepper-dialog';
import { Note } from '@no-paper-needed/interfaces';
import { RecurrenceMode } from '@no-paper-needed/interfaces';
import { ReminderMode } from '@no-paper-needed/interfaces';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';

import { NoteDialog } from '../note-dialog.directive';

@Component({
  selector: 'app-edit-note-dialog',
  imports: [
    DatePickerModule,
    FloatLabelModule,
    FormsModule,
    HeaderComponent,
    InputNumberModule,
    InputTextModule,
    NoteComponent,
    RadioButtonModule,
    ReactiveFormsModule,
    StepPanelDirective,
    StepperDialogComponent,
    TextareaModule,
    TranslateModule,
  ],
  templateUrl: './edit-note-dialog.component.html',
  styleUrl: './edit-note-dialog.component.scss',
})
export class EditNoteDialogComponent extends NoteDialog {
  readonly noteInput = input<Note | undefined>(undefined, { alias: 'note' });

  constructor() {
    super();

    effect(() => {
      const note = this.noteInput();

      if (note) {
        this.patchValueWithNoteData(note);
      }
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    this.save.emit(this.createNote());

    this.closeDialog();
    this.resetDialog();
  }

  private patchValueWithNoteData(note: Note): void {
    const reminderMode = this.getReminderModeFromDaysBefore(
      note.reminderDaysBefore,
    );
    const recurrenceMode = this.getRecurrenceModeFromRecurrence(note);

    this.form.patchValue({
      date: note.date,
      content: note.content,
      reminderMode,
      reminderDaysBefore: note.reminderDaysBefore,
      recurrenceMode,
      recurrenceDays: note.recurrence?.days ?? 0,
    });
  }

  private getReminderModeFromDaysBefore(daysBefore: number): ReminderMode {
    if (daysBefore === 0) {
      return ReminderMode.SameDay;
    } else if (daysBefore === 1) {
      return ReminderMode.DayBefore;
    }
      return ReminderMode.MultipleDaysBefore;

  }

  private getRecurrenceModeFromRecurrence(note: Note): RecurrenceMode {
    if (!note.recurrence) {
      return RecurrenceMode.None;
    }

    const { days, months, years } = note.recurrence;

    if (years === 1 && months === 0 && days === 0) {
      return RecurrenceMode.EveryYear;
    } else if (months === 1 && years === 0 && days === 0) {
      return RecurrenceMode.EveryMonth;
    } else if (days > 0 && months === 0 && years === 0) {
      return RecurrenceMode.EveryFewDays;
    }
      return RecurrenceMode.None;

  }
}
