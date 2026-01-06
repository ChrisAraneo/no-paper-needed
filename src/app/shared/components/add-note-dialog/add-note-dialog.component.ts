/* eslint-disable @angular-eslint/no-output-native */

import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

const DEFAULT_NOTIFY_CUSTOM_DAYS_BEFORE = 3;

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
  ],
  templateUrl: './add-note-dialog.component.html',
  styleUrl: './add-note-dialog.component.scss',
})
export class AddNoteDialogComponent {
  @Input() isVisible = false;

  @Output() readonly save = new EventEmitter<Note>();
  @Output() readonly close = new EventEmitter<void>();

  protected date = new Date();
  protected noteContent = '';
  protected notificationDaysBefore = DEFAULT_NOTIFY_CUSTOM_DAYS_BEFORE;
  protected notificationSettings: 'sameDay' | 'dayBefore' | 'customDaysBefore' =
    'sameDay';

  saveNote(): void {
    this.save.emit({
      content: this.noteContent,
      date: this.date,
      notificationDaysBefore: this.notificationDaysBefore,
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
