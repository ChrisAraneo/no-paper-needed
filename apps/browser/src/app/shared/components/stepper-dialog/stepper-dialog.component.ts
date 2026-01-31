import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { isUndefined } from 'lodash';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';

import { StepPanelDirective } from '../../directives/step-panel/step-panel.directive';
import { StepComponent } from '../step/step.component';

export interface StepConfig {
  value: number;
  label: string;
  content?: unknown;
}

const DEFAULT_ACTIVE_STEP = 1;

@Component({
  selector: 'app-stepper-dialog',
  imports: [
    DialogModule,
    StepperModule,
    NgTemplateOutlet,
    TranslateModule,
    StepComponent,
  ],
  templateUrl: './stepper-dialog.component.html',
  styleUrl: './stepper-dialog.component.scss',
})
export class StepperDialogComponent {
  @Input() title = '';
  @Input() styleClass = '';
  @Input() activeStep = DEFAULT_ACTIVE_STEP;
  @Input() steps: StepConfig[] = [];
  @Input() isVisible = false;

  @Output() readonly isVisibleChange = new EventEmitter<boolean>();
  @Output() readonly activeStepChange = new EventEmitter<number>();
  @Output() readonly close = new EventEmitter<void>();

  @ContentChildren(StepPanelDirective)
  stepPanels!: QueryList<StepPanelDirective>;

  onActiveStepChange(step: number | undefined): void {
    if (isUndefined(step)) {
      return;
    }

    this.activeStep = step;
    this.activeStepChange.emit(step);
  }

  onVisibleChange(visible: boolean): void {
    this.isVisibleChange.emit(visible);

    if (!visible) {
      this.close.emit();
    }
  }
}
