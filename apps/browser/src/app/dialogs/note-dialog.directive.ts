/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @angular-eslint/no-output-native */
/* eslint-disable @typescript-eslint/unbound-method */

import {
  Directive,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash';
import { first, Subscription, timer } from 'rxjs';

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
export abstract class NoteDialog implements OnInit, OnDestroy {
  @Input() isVisible = false;

  @Output() readonly save = new EventEmitter<Note>();
  @Output() readonly close = new EventEmitter<void>();

  protected readonly translateService = inject(TranslateService);

  protected readonly reminderMode = ReminderMode;

  protected form: FormGroup<NoteDialogFormGroup>;
  protected activeStep = FIRST_STEP_INDEX;
  protected stepConfigs: StepConfig[] = [];

  private readonly subscription = new Subscription();

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

  ngOnInit(): void {
    this.setStepConfigs();

    this.subscription.add(
      this.translateService.onLangChange.subscribe(() => this.setStepConfigs()),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected getStep1Actions(): StepAction[] {
    return [this.createNextButtonStepAction(this.activateStep(2))];
  }

  protected getStep2Actions(): StepAction[] {
    return [
      this.createBackButtonStepAction(this.activateStep(1)),
      this.createNextButtonStepAction(this.activateStep(3), () =>
        this.isContentInvalid(),
      ),
    ];
  }

  protected getStep3Actions(): StepAction[] {
    return [
      this.createBackButtonStepAction(this.activateStep(2)),
      this.createNextButtonStepAction(this.activateStep(4)),
    ];
  }

  protected getStep4Actions(): StepAction[] {
    return [
      this.createBackButtonStepAction(this.activateStep(3)),
      {
        label: this.translateService.instant('DIALOGS.ACTIONS.SAVE'),
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

  private readonly activateStep =
    (step: number): (() => void) =>
    (): void => {
      this.activeStep = step;
    };

  private setStepConfigs(): void {
    this.stepConfigs = [
      { value: 1, label: this.translateService.instant('DIALOGS.LABELS.DATE') },
      {
        value: 2,
        label: this.translateService.instant('DIALOGS.LABELS.CONTENT'),
      },
      {
        value: 3,
        label: this.translateService.instant('DIALOGS.LABELS.REMINDERS'),
      },
      {
        value: 4,
        label: this.translateService.instant('DIALOGS.LABELS.SUMMARY'),
      },
    ];
  }

  private createBackButtonStepAction(onClick: () => void): StepAction {
    return {
      label: this.translateService.instant('DIALOGS.ACTIONS.BACK'),
      severity: 'secondary',
      iconPos: 'left',
      icon: 'pi pi-arrow-left',
      onClick,
    };
  }

  private createNextButtonStepAction(
    onClick: () => void,
    isDisabled?: () => boolean,
  ): StepAction {
    return {
      label: this.translateService.instant('DIALOGS.ACTIONS.NEXT'),
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
