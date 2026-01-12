import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

import { StepComponent } from '../step/step.component';
import { StepPanelDirective } from './step-panel.directive';

export interface StepConfig {
  value: number;
  label: string;
  content?: unknown;
}

@Component({
  selector: 'app-stepper',
  imports: [
    StepperModule,
    ButtonModule,
    NgTemplateOutlet,
    TranslateModule,
    StepComponent,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  @Input() activeStep = 1;
  @Input() linear = true;
  @Input() steps: StepConfig[] = [];
  @Input() stepHeight = '484px'; // TODO Remove?

  @ContentChildren(StepPanelDirective) stepPanels!: QueryList<StepPanelDirective>;
}
