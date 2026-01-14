/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @angular-eslint/no-output-native */

import { JsonPipe, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';

import { StepAction } from '../../shared/components/step/step.interfaces';
import { StepPanelDirective } from '../../shared/components/stepper/step-panel.directive';
import {
  StepConfig,
  StepperDialogComponent,
} from '../../shared/components/stepper/stepper-dialog.component';
import { SubheaderComponent } from '../../shared/components/subheader/subheader.component';
import { Note } from '../../shared/interfaces/note.interface';
import { ReminderMode } from '../../shared/interfaces/reminder-mode.enum';
import { NoteDialog } from '../note-dialog.class';

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
export class AddNoteDialogComponent extends NoteDialog implements OnInit {
  @Input() isVisible = false;

  @Output() readonly save = new EventEmitter<Note>();
  @Output() readonly close = new EventEmitter<void>();

  protected readonly reminderMode = ReminderMode;

  protected form!: FormGroup;
  protected activeStep = 1;

  protected stepConfigs: StepConfig[] = [
    { value: 1, label: 'DIALOGS.ADD_NOTE.DATE' },
    { value: 2, label: 'DIALOGS.ADD_NOTE.CONTENT' },
    { value: 3, label: 'DIALOGS.ADD_NOTE.REMINDERS' },
    { value: 4, label: 'DIALOGS.ADD_NOTE.SUMMARY' },
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl(new Date()),
      content: new FormControl('', Validators.required),
      reminderMode: new FormControl(ReminderMode.SameDay, Validators.required),
      reminderDaysBefore: new FormControl(0),
    });
  }

  getStep1Actions(): StepAction[] {
    return [
      this.createNextButtonStepAction(() => {
        this.activeStep = 2;
      }),
    ];
  }

  getStep2Actions(): StepAction[] {
    return [
      this.createBackButtonStepAction(() => {
        this.activeStep = 1;
      }),
      this.createNextButtonStepAction(
        () => {
          this.activeStep = 3;
        },
        () => !this.form.get('content')?.value?.trim(),
      ),
    ];
  }

  getStep3Actions(): StepAction[] {
    return [
      this.createBackButtonStepAction(() => {
        this.activeStep = 2;
      }),
      this.createNextButtonStepAction(() => {
        this.activeStep = 4;
      }),
    ];
  }

  getStep4Actions(): StepAction[] {
    return [
      this.createBackButtonStepAction(() => {
        this.activeStep = 3;
      }),
      {
        label: 'Save',
        icon: 'pi pi-check',
        iconPos: 'right',
        onClick: () => this.saveNote(),
      },
    ];
  }

  saveNote(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }
    const reminderMode =
      this.form.get('reminderMode')?.value ?? ReminderMode.SameDay;
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
    this.resetDialog();
  }

  closeDialog(): void {
    this.close.emit();
  }

  onVisibleChange(visible: boolean): void {
    if (!visible) {
      this.closeDialog();
    }
  }

  resetDialog(): void {
    setTimeout(() => {
      this.form.reset();
      this.activeStep = 1;
    }, 2000);
  }
}
