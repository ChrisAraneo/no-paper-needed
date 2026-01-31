import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StepperModule } from 'primeng/stepper';

import { StepPanelDirective } from '../../directives/step-panel/step-panel.directive';
import { StepPanelComponent } from '../step-panel/step-panel.component';

export interface StepConfig {
  value: number;
  label: string;
  content?: unknown;
}

@Component({
  selector: 'app-stepper',
  imports: [
    StepperModule,
    NgTemplateOutlet,
    TranslateModule,
    StepPanelComponent,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  @Input() activeStep = 1;
  @Input() linear = true;
  @Input() steps: StepConfig[] = [];

  @ContentChildren(StepPanelDirective)
  stepPanels!: QueryList<StepPanelDirective>;
}
