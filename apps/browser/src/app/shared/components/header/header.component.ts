import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgTemplateOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly size = input<'xl' | 'lg' | 'md'>('lg');
  readonly element = input<'h1' | 'h2'>('h1');
}
