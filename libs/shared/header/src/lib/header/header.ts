import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'npn-header',
  imports: [NgTemplateOutlet],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly size = input<'xl' | 'lg' | 'md'>('lg');
  readonly element = input<'h1' | 'h2'>('h1');
}
