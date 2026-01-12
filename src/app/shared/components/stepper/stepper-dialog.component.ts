import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';

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
    TranslateModule,
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

  onActiveStepChange(step: number | undefined): void {
    if (step !== undefined) {
      this.activeStep = step;
      this.activeStepChange.emit(step);
    }
  }

  onVisibleChange(visible: boolean): void {
    this.visibleChange.emit(visible);
    if (!visible) {
      this.close.emit();
    }
  }
}
