import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-note',
  imports: [CardModule, DatePipe],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input({ required: true }) date!: Date;
  @Input({ required: true }) content!: string;
}
