import { Component, computed, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '@no-paper-needed/components/button';
import { Note, Recurrence } from '@no-paper-needed/interfaces';
import { LocaleService } from '@no-paper-needed/shared/locale';
import { DATE_FORMAT } from '@no-paper-needed/shared/tokens';
import { format } from 'date-fns';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-note',
  imports: [ButtonComponent, CardModule, TooltipModule, TranslateModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  private readonly dateFormat = inject(DATE_FORMAT);
  private readonly localeService = inject(LocaleService);
  private readonly translateService = inject(TranslateService);
  private readonly locale = toSignal(this.localeService.get(), {
    initialValue: this.localeService.getCurrentLang(),
  });

  readonly note = input<Note | undefined>();
  readonly showEditButton = input(false);

  readonly edit = output<Note>();

  readonly formattedDate = computed(() => {
    const date = this.note()?.date;

    if (!date) {
      return '';
    }

    const locale = this.locale();

    return format(date, this.dateFormat, {
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
