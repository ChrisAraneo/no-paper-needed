import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StepperModule } from 'primeng/stepper';

import { StepPanelComponent } from '../step-panel/step-panel.component';
import { StepPanelDirective } from '../step-panel/step-panel.directive';
import { StepConfig } from '../stepper-dialog/stepper-dialog.interfaces';

@Component({
  selector: 'npn-stepper',
  imports: [
    NgTemplateOutlet,
    StepPanelComponent,
    StepperModule,
    TranslateModule,
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
