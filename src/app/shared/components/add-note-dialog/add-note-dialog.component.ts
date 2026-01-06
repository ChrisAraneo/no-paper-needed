import { ReminderMode } from './../../interfaces/reminder-mode.enum';
/* eslint-disable @angular-eslint/no-output-native */

import { DatePipe, JsonPipe } from '@angular/common';
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

import { Note } from '../../interfaces/note.interface';

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
    DatePipe,
    JsonPipe,
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
    const reminderMode =
      this.form.get('reminderMode')?.value || ReminderMode.SameDay;
    let reminderDaysBefore: number | undefined;

    if (reminderMode === ReminderMode.SameDay) {
      reminderDaysBefore = 0;
    } else if (reminderMode === ReminderMode.DayBefore) {
      reminderDaysBefore = 1;
    } else if (reminderMode === ReminderMode.MultipleDaysBefore) {
      reminderDaysBefore = this.form.get('reminderDaysBefore')?.value ?? 0;
    }

    this.save.emit({
      content: this.form.get('content')?.value,
      date: this.form.get('date')?.value,
      reminderDaysBefore: reminderDaysBefore || 0,
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
