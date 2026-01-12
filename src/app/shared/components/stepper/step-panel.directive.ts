import { Directive, Input, TemplateRef } from '@angular/core';

import { StepAction } from '../step/step.interfaces';

@Directive({
  selector: '[appStepPanel]',
  standalone: true,
})
export class StepPanelDirective {
  @Input() stepValue!: number;
  @Input() stepActions: StepAction[] = [];

  constructor(public template: TemplateRef<unknown>) {}
}
