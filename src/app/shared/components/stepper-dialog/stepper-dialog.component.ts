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
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';

import { StepComponent } from '../step/step.component';
import { StepPanelDirective } from '../stepper/step-panel.directive';

export interface StepConfig {
  value: number;
  label: string;
  content?: unknown;
}

@Component({
  selector: 'app-stepper-dialog',
  imports: [
    DialogModule,
    StepperModule,
    ButtonModule,
    NgTemplateOutlet,
    TranslateModule,
    StepComponent,
  ],
  templateUrl: './stepper-dialog.component.html',
  styles: [],
})
export class StepperDialogComponent {
  @Input() visible = false;
  @Input() header = '';
  @Input() modal = true;
  @Input() styleClass = '';
  @Input() activeStep = 1;
  @Input() linear = true;
  @Input() steps: StepConfig[] = [];
  @Input() stepHeight = '484px';

  @Output() readonly visibleChange = new EventEmitter<boolean>();
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
    this.visibleChange.emit(visible);

    if (!visible) {
      this.close.emit();
    }
  }
}
