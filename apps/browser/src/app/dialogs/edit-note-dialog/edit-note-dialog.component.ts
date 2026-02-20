import { NgClass } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';

import { NoteComponent } from '../../shared/components/note/note.component';
import { StepperDialogComponent } from '../../shared/components/stepper-dialog/stepper-dialog.component';
import { SubheaderComponent } from '../../shared/components/subheader/subheader.component';
import { StepPanelDirective } from '../../shared/directives/step-panel/step-panel.directive';
import { Note } from '../../shared/interfaces/note.interface';
import { ReminderMode } from '../../shared/interfaces/reminder-mode.enum';
import { NoteDialog } from '../note-dialog.directive';

@Component({
  selector: 'app-edit-note-dialog',
  imports: [
    InputTextModule,
    TextareaModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DatePickerModule,
    InputNumberModule,
    RadioButtonModule,
    NgClass,
    SubheaderComponent,
    StepperDialogComponent,
    StepPanelDirective,
    NoteComponent,
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

    this.form.patchValue({
      date: note.date,
      content: note.content,
      reminderMode,
      reminderDaysBefore: note.reminderDaysBefore,
    });
  }

  private getReminderModeFromDaysBefore(daysBefore: number): ReminderMode {
    if (daysBefore === 0) {
      return ReminderMode.SameDay;
    } else if (daysBefore === 1) {
      return ReminderMode.DayBefore;
    } else {
      return ReminderMode.MultipleDaysBefore;
    }
  }
}
