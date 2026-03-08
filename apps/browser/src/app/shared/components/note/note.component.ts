import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonComponent } from '../button/button.component';
import { Note } from '../../interfaces/note.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-note',
  imports: [
    CardModule,
    DatePipe,
    ButtonComponent,
    TooltipModule,
    TranslateModule,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  readonly note = input<Note | undefined>(undefined);
  readonly showEditButton = input(false);

  readonly edit = output<Note>();
}
