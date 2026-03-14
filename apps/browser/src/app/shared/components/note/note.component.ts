import { DatePipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonComponent } from '@no-paper-needed/shared/button';
import { Note, Recurrence } from '../../interfaces/note.interface';
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

  readonly recurrenceLabel = computed(() => {
    const recurrence = this.note()?.recurrence;

    if (!recurrence) {
      return '';
    }

    return this.formatRecurrence(recurrence);
  });

  private formatRecurrence(recurrence: Recurrence): string {
    const parts: string[] = [];

    if (recurrence.years > 0) {
      parts.push(` ${recurrence.years}y`);
    }
    if (recurrence.months > 0) {
      parts.push(` ${recurrence.months}m`);
    }
    if (recurrence.days > 0) {
      parts.push(` ${recurrence.days}d`);
    }

    return parts.join('');
  }
}
