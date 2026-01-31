import { Component, Input } from '@angular/core';

import { ButtonComponent } from '../button/button.component';
import { StepPanelAction } from './step-panel.interfaces';

@Component({
  selector: 'app-step-panel',
  imports: [ButtonComponent],
  templateUrl: './step-panel.component.html',
  styleUrl: './step-panel.component.scss',
})
export class StepPanelComponent {
  @Input() actions: StepPanelAction[] = [];
}
