import { Component } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, RouterOutlet],
  standalone: true,
})
export class AppComponent {
  title = 'no-paper-needed';
}
