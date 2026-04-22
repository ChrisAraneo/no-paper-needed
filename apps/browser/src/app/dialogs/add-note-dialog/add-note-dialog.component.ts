import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '@no-paper-needed/components/header';
import { NoteComponent } from '@no-paper-needed/components/note';
import {
  StepPanelDirective,
  StepperDialogComponent,
} from '@no-paper-needed/components/stepper-dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';

import { NoteDialog } from '../note-dialog.directive';

@Component({
  selector: 'app-add-note-dialog',
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
  templateUrl: './add-note-dialog.component.html',
  styleUrl: './add-note-dialog.component.scss',
})
export class AddNoteDialogComponent extends NoteDialog {
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
}
