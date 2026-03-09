import { Component } from '@angular/core';
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
import { HeaderComponent } from '@no-paper-needed/shared/header';
import { StepPanelDirective } from '../../shared/directives/step-panel/step-panel.directive';
import { NoteDialog } from '../note-dialog.directive';

@Component({
  selector: 'app-add-note-dialog',
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
    HeaderComponent,
    StepperDialogComponent,
    StepPanelDirective,
    NoteComponent,
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
