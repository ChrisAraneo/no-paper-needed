import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { StepAction } from './step.interfaces';

@Component({
  selector: 'app-step-panel',
  imports: [ButtonModule],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss',
})
export class StepPanelComponent {
  @Input() actions: StepAction[] = [];
}
