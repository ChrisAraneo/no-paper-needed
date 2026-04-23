import { Component, Input } from '@angular/core';
import { ButtonComponent } from '@no-paper-needed/components/button';

import { StepPanelAction } from './step-panel.interfaces';

@Component({
  selector: 'npn-step-panel',
  imports: [ButtonComponent],
  templateUrl: './step-panel.component.html',
  styleUrl: './step-panel.component.scss',
})
export class StepPanelComponent {
  @Input() actions: StepPanelAction[] = [];
}
