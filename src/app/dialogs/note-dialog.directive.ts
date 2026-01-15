/* eslint-disable @angular-eslint/no-output-native */
/* eslint-disable @typescript-eslint/unbound-method */

import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { get } from 'lodash';
import { first, timer } from 'rxjs';

import { StepAction } from '../shared/components/step/step.interfaces';
import { StepConfig } from '../shared/components/stepper/stepper.component';
import { Note } from '../shared/interfaces/note.interface';
import { ReminderMode } from '../shared/interfaces/reminder-mode.enum';

interface NoteDialogFormGroup {
  date: FormControl<Date>;
  content: FormControl<string>;
  reminderMode: FormControl<ReminderMode>;
  reminderDaysBefore: FormControl<number>;
}

const SAME_DAY_REMINDER_DAYS_BEFORE = 0;
const DAY_BEFORE_REMINDER_DAYS_BEFORE = 1;
const FIRST_STEP_INDEX = 1;
const RESET_DIALOG_DELAY_MS = 2000;

@Directive()
export abstract class NoteDialog {
  @Input() isVisible = false;

  @Output() readonly save = new EventEmitter<Note>();
  @Output() readonly close = new EventEmitter<void>();

  protected readonly reminderMode = ReminderMode;

  protected form: FormGroup<NoteDialogFormGroup>;
  protected activeStep = FIRST_STEP_INDEX;
  protected stepConfigs: StepConfig[] = [
    { value: 1, label: 'DIALOGS.LABELS.DATE' },
    { value: 2, label: 'DIALOGS.LABELS.CONTENT' },
    { value: 3, label: 'DIALOGS.LABELS.REMINDERS' },
    { value: 4, label: 'DIALOGS.LABELS.SUMMARY' },
  ];

  constructor() {
    this.form = new FormGroup<NoteDialogFormGroup>({
      date: new FormControl(new Date(), {
        nonNullable: true,
        validators: [Validators.required],
      }),
      content: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      reminderMode: new FormControl(ReminderMode.SameDay, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      reminderDaysBefore: new FormControl(SAME_DAY_REMINDER_DAYS_BEFORE, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  abstract submit(): void;

  protected getStep1Actions(): StepAction[] {
    return [
      this.createNextButtonStepAction(() => {
        this.activeStep = 2;
      }),
    ];
  }

  protected getStep2Actions(): StepAction[] {
    return [
      this.createBackButtonStepAction(() => {
        this.activeStep = 1;
      }),
      this.createNextButtonStepAction(
        () => {
          this.activeStep = 3;
        },
        () => this.isContentInvalid(),
      ),
    ];
  }

  protected getStep3Actions(): StepAction[] {
    return [
      this.createBackButtonStepAction(() => {
        this.activeStep = 2;
      }),
      this.createNextButtonStepAction(() => {
        this.activeStep = 4;
      }),
    ];
  }

  protected getStep4Actions(): StepAction[] {
    return [
      this.createBackButtonStepAction(() => {
        this.activeStep = 3;
      }),
      {
        label: 'Save',
        icon: 'pi pi-check',
        iconPos: 'right',
        onClick: () => this.submit(),
      },
    ];
  }

  protected createNote(): Note {
    if (this.form.invalid) {
      throw new Error('Form is invalid. Cannot create note.');
    }

    const content = get(this.form, 'value.content', '').trim();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/non-nullable-type-assertion-style
    const date = get(this.form, 'value.date') as Date;
    const reminderDaysBefore = this.getReminderDaysBefore();

    return {
      content,
      date,
      reminderDaysBefore,
    };
  }

  protected closeDialog(): void {
    this.close.emit();
  }

  protected onVisibleChange(visible: boolean): void {
    if (!visible) {
      this.closeDialog();
    }
  }

  protected resetDialog(): void {
    timer(RESET_DIALOG_DELAY_MS)
      .pipe(first())
      .subscribe(() => {
        this.form.reset();
        this.activeStep = 1;
      });
  }

  private createBackButtonStepAction(onClick: () => void): StepAction {
    return {
      label: 'Back',
      severity: 'secondary',
      icon: 'pi pi-arrow-left',
      onClick,
    };
  }

  private createNextButtonStepAction(
    onClick: () => void,
    isDisabled?: () => boolean,
  ): StepAction {
    return {
      label: 'Next',
      icon: 'pi pi-arrow-right',
      iconPos: 'right',
      disabled: isDisabled ? isDisabled() : false,
      onClick,
    };
  }

  private isContentInvalid(): boolean {
    return get(this.form, 'controls.content.invalid', true);
  }

  private getReminderDaysBefore(): number {
    switch (get(this.form, 'value.reminderMode', ReminderMode.SameDay)) {
      case ReminderMode.SameDay: {
        return SAME_DAY_REMINDER_DAYS_BEFORE;
      }
      case ReminderMode.DayBefore: {
        return DAY_BEFORE_REMINDER_DAYS_BEFORE;
      }
      case ReminderMode.MultipleDaysBefore: {
        return get(
          this.form,
          'value.reminderDaysBefore',
          SAME_DAY_REMINDER_DAYS_BEFORE,
        );
      }
      default: {
        return SAME_DAY_REMINDER_DAYS_BEFORE;
      }
    }
  }
}
