import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';

import { ButtonComponent } from '../button/button.component';
import { Note } from '../../interfaces/note.interface';

@Component({
  selector: 'app-note',
  imports: [CardModule, DatePipe, ButtonComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input() note: Note | undefined;
  @Input() showEditButton = false;

  @Output() readonly edit = new EventEmitter<Note>();
}
