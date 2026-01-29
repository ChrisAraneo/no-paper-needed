import { Component, Input } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { StepAction } from './step.interfaces';

@Component({
  selector: 'app-step-panel',
  imports: [ButtonComponent],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss',
})
export class StepComponent {
  @Input() actions: StepAction[] = [];
}
