/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @angular-eslint/no-output-native */

import { JsonPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';

import { StepPanelDirective } from '../../shared/components/stepper/step-panel.directive';
import { StepperDialogComponent } from '../../shared/components/stepper/stepper-dialog.component';
import { SubheaderComponent } from '../../shared/components/subheader/subheader.component';
import { NoteDialog } from '../note-dialog.directive';

@Component({
  selector: 'app-add-note-dialog',
  imports: [
    InputTextModule,
    ButtonModule,
    TextareaModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DatePickerModule,
    InputNumberModule,
    RadioButtonModule,
    JsonPipe,
    NgClass,
    SubheaderComponent,
    StepperDialogComponent,
    StepPanelDirective,
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
