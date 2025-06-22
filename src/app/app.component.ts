import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToolbarComponent } from './shared/toolbar/toolbar.component';

@Component({
  selector: 'npn-root',
  imports: [RouterOutlet, ToolbarComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'no-paper-needed';
}
