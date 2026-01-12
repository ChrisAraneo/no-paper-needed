import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';

import { StepPanelComponent } from '../step/step.component';

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
    StepPanelComponent,
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  @Input() activeStep = 1;
  @Input() linear = true;
  @Input() steps: StepConfig[] = [];
  @Input() stepHeight = '484px';
}
