import { Directive, inject, Input, TemplateRef } from '@angular/core';

import { StepPanelAction } from '../step-panel/step-panel.interfaces';

@Directive({
  selector: '[appStepPanel]',
  standalone: true,
})
export class StepPanelDirective {
  @Input() stepValue!: number;
  @Input() stepActions: StepPanelAction[] = [];

  template = inject(TemplateRef<unknown>);
}
