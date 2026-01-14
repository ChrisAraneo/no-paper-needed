/* eslint-disable @typescript-eslint/unbound-method */
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { get } from 'lodash';

import { StepAction } from '../shared/components/step/step.interfaces';
import { ReminderMode } from '../shared/interfaces/reminder-mode.enum';

interface NoteDialogFormGroup {
  date: FormControl<Date>;
  content: FormControl<string>;
  reminderMode: FormControl<ReminderMode>;
  reminderDaysBefore: FormControl<number>;
}

const SAME_DAY_REMINDER_DAYS_BEFORE = 0;
const DAY_BEFORE_REMINDER_DAYS_BEFORE = 1;

export abstract class NoteDialog {
  protected form: FormGroup<NoteDialogFormGroup>;

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

  protected createBackButtonStepAction(onClick: () => void): StepAction {
    return {
      label: 'Back',
      severity: 'secondary',
      icon: 'pi pi-arrow-left',
      onClick,
    };
  }

  protected createNextButtonStepAction(
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

  protected getReminderDaysBefore(): number {
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
