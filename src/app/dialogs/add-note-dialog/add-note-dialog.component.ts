/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @angular-eslint/no-output-native */
import { JsonPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';

import { SubheaderComponent } from '../../shared/components/subheader/subheader.component';
import { Note } from '../../shared/interfaces/note.interface';
import { ReminderMode } from '../../shared/interfaces/reminder-mode.enum';

@Component({
  selector: 'app-add-note-dialog',
  imports: [
    DialogModule,
    InputTextModule,
    ButtonModule,
    TextareaModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DatePickerModule,
    InputNumberModule,
    StepperModule,
    RadioButtonModule,
    JsonPipe,
    NgClass,
    SubheaderComponent,
  ],
  templateUrl: './add-note-dialog.component.html',
  styleUrl: './add-note-dialog.component.scss',
})
export class AddNoteDialogComponent implements OnInit {
  @Input() isVisible = false;

  @Output() readonly save = new EventEmitter<Note>();
  @Output() readonly close = new EventEmitter<void>();

  protected form!: FormGroup;
  protected readonly ReminderMode = ReminderMode;
  protected activeStep = 1;

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl(new Date()),
      content: new FormControl('', Validators.required),
      reminderMode: new FormControl(ReminderMode.SameDay, Validators.required),
      reminderDaysBefore: new FormControl(0),
    });
  }

  saveNote(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }
    const reminderMode =  this.form.get('reminderMode')?.value ?? ReminderMode.SameDay;
    let reminderDaysBefore: number | undefined;

    switch (reminderMode) {
      case ReminderMode.SameDay: {
        reminderDaysBefore = 0;

        break;
      }
      case ReminderMode.DayBefore: {
        reminderDaysBefore = 1;

        break;
      }
      case ReminderMode.MultipleDaysBefore: {
        reminderDaysBefore = this.form.get('reminderDaysBefore')?.value ?? 0;

        break;
      }
      // No default
    }

    this.save.emit({
      content: this.form.get('content')?.value,
      date: this.form.get('date')?.value,
      reminderDaysBefore: reminderDaysBefore ?? 0,
    });

    this.closeDialog();
  }

  closeDialog(): void {
    this.close.emit();
  }

  onVisibleChange(visible: boolean): void {
    if (!visible) {
      this.closeDialog();
    }
  }
}
