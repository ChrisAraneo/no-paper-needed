import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

import { HeaderElement, HeaderSize } from './header.types';

@Component({
  selector: 'npn-header',
  imports: [NgTemplateOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly size = input<HeaderSize>('lg');
  readonly element = input<HeaderElement>('h1');
}
