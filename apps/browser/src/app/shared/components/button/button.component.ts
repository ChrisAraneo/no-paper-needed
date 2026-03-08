import { Component, input, output } from '@angular/core';
import {
  ButtonIconPosition,
  ButtonModule,
  ButtonSeverity,
} from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  readonly label = input('');
  readonly icon = input('');
  readonly iconPosition = input<ButtonIconPosition>('right');
  readonly isDisabled = input(false);
  readonly severity = input<ButtonSeverity | null>(null);
  readonly isRounded = input(false);
  readonly styleClass = input('');

  readonly clicked = output<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
