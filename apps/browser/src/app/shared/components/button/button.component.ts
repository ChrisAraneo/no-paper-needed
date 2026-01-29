import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonIconPosition, ButtonModule, ButtonSeverity } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[class.accent]': 'isAccent',
  },
})
export class ButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() iconPosition: ButtonIconPosition = 'right';
  @Input() isDisabled = false;
  @Input() severity: ButtonSeverity = 'primary';
  @Input() isRounded = false;
  @Input() styleClass = '';
  @Input() isAccent = false;

  @Output() readonly clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}

