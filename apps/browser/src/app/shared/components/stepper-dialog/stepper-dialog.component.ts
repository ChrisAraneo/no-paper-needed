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
import { isUndefined } from 'lodash-es';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';

import { StepPanelDirective } from '../../directives/step-panel/step-panel.directive';
import { StepPanelComponent } from '../step-panel/step-panel.component';
import { DEFAULT_ACTIVE_STEP } from './stepper-dialog.consts';
import { StepConfig } from './stepper-dialog.interfaces';

@Component({
  selector: 'app-stepper-dialog',
  imports: [
    DialogModule,
    StepperModule,
    NgTemplateOutlet,
    TranslateModule,
    StepPanelComponent,
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

  onActiveStepChange(step?: number): void {
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
