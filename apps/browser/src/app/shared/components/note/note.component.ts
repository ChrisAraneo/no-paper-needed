import { Component, computed, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonComponent } from '@no-paper-needed/shared/button';
import { Note, Recurrence } from '../../interfaces/note.interface';
import { TranslateModule } from '@ngx-translate/core';
import { format } from 'date-fns';
import { LocaleService } from '../../../core/services/locale/locale.service';
import { WEEKDAY_DAY_MONTH_DATE_FORMAT } from '../../consts/consts';

@Component({
  selector: 'app-note',
  imports: [CardModule, ButtonComponent, TooltipModule, TranslateModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  private readonly localeService = inject(LocaleService);
  private readonly locale = toSignal(this.localeService.get(), {
    initialValue: this.localeService.getCurrentLang(),
  });

  readonly note = input<Note | undefined>(undefined);
  readonly showEditButton = input(false);

  readonly edit = output<Note>();

  readonly formattedDate = computed(() => {
    const date = this.note()?.date;

    if (!date) {
      return '';
    }

    const locale = this.locale();

    return format(date, WEEKDAY_DAY_MONTH_DATE_FORMAT, {
      locale: this.localeService.getDateFnsLocale(locale),
    }).replace(/^./u, (c) => c.toUpperCase());
  });

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
