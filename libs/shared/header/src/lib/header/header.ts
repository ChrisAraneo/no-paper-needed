import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { HeaderElement, HeaderSize } from './header.types';

@Component({
  selector: 'npn-header',
  imports: [NgTemplateOutlet],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly size = input<HeaderSize>(HeaderSize.Lg);
  readonly element = input<HeaderElement>(HeaderElement.H1);
}
