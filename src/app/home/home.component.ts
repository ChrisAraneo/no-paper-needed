import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { NoteComponent } from '../shared/components/note/note.component';

@Component({
  selector: 'app-home',
  imports: [TranslateModule, NoteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  date = new Date();
  content = 'This is a sample note content to demonstrate the NoteComponent.';
}
