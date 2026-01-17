import { Directive, inject, Input, TemplateRef } from '@angular/core';

import { StepAction } from '../../components/step/step.interfaces';

@Directive({
  selector: '[appStepPanel]',
  standalone: true,
})
export class StepPanelDirective {
  @Input() stepValue!: number;
  @Input() stepActions: StepAction[] = [];

  template = inject(TemplateRef<unknown>);
}
