/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-magic-numbers */

/* eslint-disable @angular-eslint/no-output-native */

import { JsonPipe, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
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
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { isString } from 'lodash';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TextareaModule } from 'primeng/textarea';
import { Subscription } from 'rxjs';

import { StepAction } from '../../shared/components/step/step.interfaces';
import { StepPanelDirective } from '../../shared/components/stepper/step-panel.directive';
import {
  StepConfig,
  StepperDialogComponent,
} from '../../shared/components/stepper/stepper-dialog.component';
import { SubheaderComponent } from '../../shared/components/subheader/subheader.component';
import { Note } from '../../shared/interfaces/note.interface';
import { ReminderMode } from '../../shared/interfaces/reminder-mode.enum';

interface AddNoteDialogFormGroup {
  date: FormControl<Date>;
  content: FormControl<string>;
  reminderMode: FormControl<ReminderMode>;
  reminderDaysBefore: FormControl<number>;
}

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
export class AddNoteDialogComponent implements OnInit, OnDestroy {
  @Input() isVisible = false;

  @Output() readonly save = new EventEmitter<Note>();
  @Output() readonly close = new EventEmitter<void>();

  protected readonly reminderMode = ReminderMode;

  protected form: FormGroup<AddNoteDialogFormGroup>;
  protected stepActionsMap: Record<number, StepAction[]> = {};
  protected activeStep = 1;

  protected stepConfigs: StepConfig[] = [
    { value: 1, label: 'DIALOGS.ADD_NOTE.DATE' },
    { value: 2, label: 'DIALOGS.ADD_NOTE.CONTENT' },
    { value: 3, label: 'DIALOGS.ADD_NOTE.REMINDERS' },
    { value: 4, label: 'DIALOGS.ADD_NOTE.SUMMARY' },
  ];

  private readonly subscription = new Subscription();

  constructor(private readonly translatePipe: TranslatePipe) {
    this.form = new FormGroup<AddNoteDialogFormGroup>({
      date: new FormControl<Date>(new Date(), { nonNullable: true }),
      content: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      reminderMode: new FormControl<ReminderMode>(ReminderMode.SameDay, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      reminderDaysBefore: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.min(0)],
      }),
    });
  }

  ngOnInit(): void {
    this.updateStepActionsMap();

    this.subscription.add(
      this.form.get('content')?.valueChanges.subscribe(() => {
        this.updateStepActionsMap();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveNote(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    const content = this.form.get('content')?.value;
    const date = this.form.get('date')?.value;

    if (this.isString(content) && this.isDate(date)) {
      const reminderMode =
        this.form.get('reminderMode')?.value ?? ReminderMode.SameDay;
      const reminderDaysBefore = this.getReminderDaysBeforeValue(reminderMode);

      this.save.emit({
        content,
        date,
        reminderDaysBefore,
      });

      this.closeDialog();
    }
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
    this.form.reset();
    this.activeStep = 1;
  }

  private getReminderDaysBeforeValue(reminderMode: ReminderMode): number {
    switch (reminderMode) {
      case ReminderMode.SameDay: {
        return 0;
      }
      case ReminderMode.DayBefore: {
        return 1;
      }
      case ReminderMode.MultipleDaysBefore: {
        return this.form.get('reminderDaysBefore')?.value ?? 0;
      }
      default: {
        return 0;
      }
    }
  }

  private markContentFormControlAsTouched(): void {
    this.form.get('content')?.markAsTouched();
  }

  private updateStepActionsMap(): void {
    this.stepActionsMap = {
      1: this.getStep1Actions(),
      2: this.getStep2Actions(this.form.get('content')?.value),
      3: this.getStep3Actions(),
      4: this.getStep4Actions(),
    };
  }

  private getStep1Actions(): StepAction[] {
    return [
      {
        label: this.translatePipe.transform('DIALOGS.ACTIONS.NEXT'),
        icon: 'pi pi-arrow-right',
        iconPos: 'right',
        onClick: (): void => {
          this.activeStep = 2;
        },
      },
    ];
  }

  private getStep2Actions(contentValue: string | undefined): StepAction[] {
    return [
      {
        label: this.translatePipe.transform('DIALOGS.ACTIONS.BACK'),
        severity: 'secondary',
        icon: 'pi pi-arrow-left',
        onClick: () => (this.activeStep = 1),
      },
      {
        label: this.translatePipe.transform('DIALOGS.ACTIONS.NEXT'),
        icon: 'pi pi-arrow-right',
        iconPos: 'right',
        disabled: !contentValue || contentValue.trim() === '',
        onClick: (): void => {
          this.markContentFormControlAsTouched();

          if (contentValue && contentValue.trim() !== '') {
            this.activeStep = 3;
          }
        },
      },
    ];
  }

  private getStep3Actions(): StepAction[] {
    return [
      {
        label: this.translatePipe.transform('DIALOGS.ACTIONS.BACK'),
        severity: 'secondary',
        icon: 'pi pi-arrow-left',
        onClick: (): void => {
          this.activeStep = 2;
        },
      },
      {
        label: this.translatePipe.transform('DIALOGS.ACTIONS.NEXT'),
        icon: 'pi pi-arrow-right',
        iconPos: 'right',
        onClick: (): void => {
          this.activeStep = 4;
        },
      },
    ];
  }

  private getStep4Actions(): StepAction[] {
    return [
      {
        label: this.translatePipe.transform('DIALOGS.ACTIONS.BACK'),
        severity: 'secondary',
        icon: 'pi pi-arrow-left',
        onClick: (): void => {
          this.activeStep = 3;
        },
      },
      {
        label: this.translatePipe.transform('DIALOGS.ACTIONS.SAVE'),
        icon: 'pi pi-check',
        iconPos: 'right',
        onClick: (): void => {
          this.saveNote();
        },
      },
    ];
  }

  private isString(value: unknown): value is string {
    return isString(value);
  }

  private isDate(value: unknown): value is Date {
    return value instanceof Date;
  }
}
