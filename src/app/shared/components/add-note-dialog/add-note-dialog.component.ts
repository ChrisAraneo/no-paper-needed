/* eslint-disable @angular-eslint/no-output-native */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
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
  ],
  templateUrl: './add-note-dialog.component.html',
  styleUrl: './add-note-dialog.component.scss',
})
export class AddNoteDialogComponent {
  @Input() isVisible = false;

  @Output() readonly save = new EventEmitter<Note>();
  @Output() readonly close = new EventEmitter<void>();

  protected date = new Date();
  protected content = '';
  protected notificationDaysBefore?: number = 3;

  saveNote(): void {
    this.save.emit({
      content: this.content,
      date: this.date,
      notificationDaysBefore: this.notificationDaysBefore,
    });
    this.isVisible = false;
  }

  closeDialog(): void {
    this.isVisible = false;
  }
}
