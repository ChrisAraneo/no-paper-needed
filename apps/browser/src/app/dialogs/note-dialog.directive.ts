import {
  computed,
  Directive,
  inject,
  input,
  output,
  Signal,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { first, map, timer } from 'rxjs';

import { StepPanelAction } from '../shared/components/step-panel/step-panel.interfaces';
import { StepConfig } from '../shared/components/stepper/stepper.component';
import { Note, Recurrence } from '../shared/interfaces/note.interface';
import { RecurrenceMode } from '../shared/interfaces/recurrence-mode.enum';
import { ReminderMode } from '../shared/interfaces/reminder-mode.enum';
import { NoteDialogFormGroupValue } from './note-dialog.types';
import {
  DAY_BEFORE_REMINDER_DAYS_BEFORE,
  FIRST_STEP_INDEX,
  RESET_DIALOG_DELAY_MS,
  SAME_DAY_REMINDER_DAYS_BEFORE,
} from './note-dialog.consts';
import { FormControlStatus } from '../shared/interfaces/form-control-status.enum';

@Directive()
export abstract class NoteDialog {
  readonly isVisible = input(false);

  readonly save = output<Note>();
  readonly close = output<void>();

  protected readonly translateService = inject(TranslateService);

  protected readonly reminderMode = ReminderMode;
  protected readonly recurrenceMode = RecurrenceMode;

  protected readonly form: FormGroup<NoteDialogFormGroupValue>;
  protected readonly activeStep = signal(FIRST_STEP_INDEX);

  private readonly formValues;
  private readonly formStatus: Signal<FormControlStatus>;
  private readonly langChange: Signal<LangChangeEvent | undefined>;

  readonly note = computed<Note | undefined>(() => {
    if (this.formStatus() === FormControlStatus.Invalid) {
      return undefined;
    }

    const values = this.formValues();
    const id = crypto.randomUUID();
    const content = (values.content ?? '').trim();
    const date = values.date ?? new Date();
    const reminderDaysBefore = this.getReminderDaysBefore(values);
    const recurrence = this.getRecurrence(values);

    return {
      id,
      content,
      date,
      reminderDaysBefore,
      ...(recurrence ? { recurrence } : {}),
    };
  });

  protected readonly stepConfigs = computed<StepConfig[]>(() => {
    this.langChange();

    return [
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
        label: this.translateService.instant('DIALOGS.LABELS.RECURRENCE'),
      },
      {
        value: 5,
        label: this.translateService.instant('DIALOGS.LABELS.SUMMARY'),
      },
    ];
  });

  protected readonly step1Actions = computed<StepPanelAction[]>(() => {
    this.langChange();

    return [this.createNextButtonStepAction(this.activateStep(2))];
  });

  protected readonly step2Actions = computed<StepPanelAction[]>(() => {
    this.langChange();
    this.formStatus();
    this.formValues();

    return [
      this.createBackButtonStepAction(this.activateStep(1)),
      this.createNextButtonStepAction(
        this.activateStep(3),
        this.form.controls.content.invalid,
      ),
    ];
  });

  protected readonly step3Actions = computed<StepPanelAction[]>(() => {
    this.langChange();

    return [
      this.createBackButtonStepAction(this.activateStep(2)),
      this.createNextButtonStepAction(this.activateStep(4)),
    ];
  });

  protected readonly step4Actions = computed<StepPanelAction[]>(() => {
    this.langChange();

    return [
      this.createBackButtonStepAction(this.activateStep(3)),
      this.createNextButtonStepAction(this.activateStep(5)),
    ];
  });

  protected readonly step5Actions = computed<StepPanelAction[]>(() => {
    this.langChange();

    return [
      this.createBackButtonStepAction(this.activateStep(4)),
      {
        label: this.translateService.instant('DIALOGS.ACTIONS.SAVE'),
        icon: 'pi pi-check',
        iconPos: 'right',
        onClick: () => this.submit(),
      },
    ];
  });

  protected get contentControl(): FormControl<string> {
    return this.form.controls.content;
  }

  protected get reminderModeControl(): FormControl<ReminderMode> {
    return this.form.controls.reminderMode;
  }

  protected get recurrenceModeControl(): FormControl<RecurrenceMode> {
    return this.form.controls.recurrenceMode;
  }

  constructor() {
    this.form = new FormGroup<NoteDialogFormGroupValue>({
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
      recurrenceMode: new FormControl(RecurrenceMode.None, {
        nonNullable: true,
      }),
      recurrenceDays: new FormControl(0, {
        nonNullable: true,
      }),
      recurrenceMonths: new FormControl(0, {
        nonNullable: true,
      }),
      recurrenceYears: new FormControl(0, {
        nonNullable: true,
      }),
    });

    this.formValues = toSignal(this.form.valueChanges, {
      initialValue: this.form.value,
    });
    this.formStatus = toSignal(
      this.form.statusChanges.pipe(
        map((status) => status as FormControlStatus),
      ),
      {
        initialValue: this.form.status as FormControlStatus,
      },
    );
    this.langChange = toSignal(this.translateService.onLangChange);
  }

  abstract submit(): void;

  protected createNote(): Note {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      throw new Error('Form is invalid. Cannot create note.');
    }

    const currentNote = this.note();

    if (!currentNote) {
      throw new Error('Note is null. Cannot create note.');
    }

    return currentNote;
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
        this.activeStep.set(FIRST_STEP_INDEX);
      });
  }

  private readonly activateStep =
    (step: number): (() => void) =>
    (): void => {
      this.activeStep.set(step);
    };

  private createBackButtonStepAction(onClick: () => void): StepPanelAction {
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
    disabled = false,
  ): StepPanelAction {
    return {
      label: this.translateService.instant('DIALOGS.ACTIONS.NEXT'),
      icon: 'pi pi-arrow-right',
      iconPos: 'right',
      disabled,
      onClick,
    };
  }

  private getReminderDaysBefore(
    values: Partial<{
      date: Date;
      content: string;
      reminderMode: ReminderMode;
      reminderDaysBefore: number;
    }>,
  ): number {
    switch (values.reminderMode ?? ReminderMode.SameDay) {
      case ReminderMode.SameDay: {
        return SAME_DAY_REMINDER_DAYS_BEFORE;
      }
      case ReminderMode.DayBefore: {
        return DAY_BEFORE_REMINDER_DAYS_BEFORE;
      }
      case ReminderMode.MultipleDaysBefore: {
        return values.reminderDaysBefore ?? SAME_DAY_REMINDER_DAYS_BEFORE;
      }
      default: {
        return SAME_DAY_REMINDER_DAYS_BEFORE;
      }
    }
  }

  private getRecurrence(
    values: Partial<{
      recurrenceMode: RecurrenceMode;
      recurrenceDays: number;
      recurrenceMonths: number;
      recurrenceYears: number;
    }>,
  ): Recurrence | undefined {
    const mode = values.recurrenceMode ?? RecurrenceMode.None;

    switch (mode) {
      case RecurrenceMode.None: {
        return undefined;
      }
      case RecurrenceMode.EveryYear: {
        return { days: 0, months: 0, years: 1 };
      }
      case RecurrenceMode.EveryMonth: {
        return { days: 0, months: 1, years: 0 };
      }
      case RecurrenceMode.EveryFewDays: {
        return { days: values.recurrenceDays ?? 1, months: 0, years: 0 };
      }
      case RecurrenceMode.Custom: {
        return {
          days: values.recurrenceDays ?? 0,
          months: values.recurrenceMonths ?? 0,
          years: values.recurrenceYears ?? 0,
        };
      }
      default: {
        return undefined;
      }
    }
  }
}
