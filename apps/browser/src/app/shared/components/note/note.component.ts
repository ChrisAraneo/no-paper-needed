import { Component, computed, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonComponent } from '@no-paper-needed/shared/button';
import { Note, Recurrence } from '../../interfaces/note.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
  private readonly translateService = inject(TranslateService);
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

    this.locale();

    return ` ${this.formatRecurrenceParts(recurrence)}`;
  });

  readonly recurrenceTooltip = computed(() => {
    const recurrence = this.note()?.recurrence;

    if (!recurrence) {
      return '';
    }

    this.locale();

    const prefix = this.translateService.instant('NOTE.RECURRENCE_PREFIX');

    return `${prefix} ${this.formatRecurrenceParts(recurrence)}`;
  });

  private formatRecurrenceParts(recurrence: Recurrence): string {
    const parts: string[] = [];

    if (recurrence.years > 0) {
      parts.push(
        `${recurrence.years} ${this.translateService.instant('NOTE.RECURRENCE_YEAR')}`,
      );
    }
    if (recurrence.months > 0) {
      parts.push(
        `${recurrence.months} ${this.translateService.instant('NOTE.RECURRENCE_MONTH')}`,
      );
    }
    if (recurrence.days > 0) {
      parts.push(
        `${recurrence.days} ${this.translateService.instant('NOTE.RECURRENCE_DAYS')}`,
      );
    }

    return parts.join(' ');
  }
}
