import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Note } from '@no-paper-needed/shared/interfaces';
import { DATE_FORMAT, FALLBACK_LOCALE } from '@no-paper-needed/shared/tokens';
import { format, Locale } from 'date-fns';
import { enGB, pl } from 'date-fns/locale';
import { Subject } from 'rxjs';

import { NoteComponent } from './note.component';

const createNote = (overrides: Partial<Note> = {}): Note => ({
  id: '1',
  date: new Date('2025-06-15'),
  content: 'Test note',
  reminderDaysBefore: 0,
  ...overrides,
});

const TEST_DATE_FORMAT = 'EEEE dd.MM';

const formatExpectedDate = (date: Date, locale: Locale = enGB): string => format(date, TEST_DATE_FORMAT, { locale }).replace(/^./u, (c) => c.toUpperCase(),
  );

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: DATE_FORMAT, useValue: 'EEEE dd.MM' },
        { provide: FALLBACK_LOCALE, useValue: 'en' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should have undefined note by default', () => {
      expect(component.note()).toBeUndefined();
    });

    it('should have showEditButton false by default', () => {
      expect(component.showEditButton()).toBe(false);
    });

    it('should render a container div', () => {
      const container = fixture.nativeElement.querySelector('.container');

      expect(container).toBeTruthy();
    });

    it('should render a p-card', () => {
      const card = fixture.nativeElement.querySelector('p-card');

      expect(card).toBeTruthy();
    });

    it('should display empty content when note is undefined', () => {
      const p = fixture.nativeElement.querySelector('.content p');

      expect(p.textContent.trim()).toBe('');
    });

    it('should not render date when note is undefined', () => {
      const date = fixture.nativeElement.querySelector('.date');

      expect(date).toBeFalsy();
    });

    it('should not render edit button when showEditButton is false', () => {
      const editButton = fixture.nativeElement.querySelector('.edit-button');

      expect(editButton).toBeFalsy();
    });

    it('should not render bell icon when note is undefined', () => {
      const bell = fixture.nativeElement.querySelector('.pi-bell');

      expect(bell).toBeFalsy();
    });

    it('should not display reminder when note is undefined', () => {
      const span = fixture.nativeElement.querySelector('.footer span');

      expect(span).toBeFalsy();
    });

    it('should not render replay icon when note is undefined', () => {
      const replay = fixture.nativeElement.querySelector('.pi-replay');

      expect(replay).toBeFalsy();
    });

    it('should return empty string for recurrenceLabel when note is undefined', () => {
      expect(component.recurrenceLabel()).toBe('');
    });

    it('should return empty string for recurrenceTooltip when note is undefined', () => {
      expect(component.recurrenceTooltip()).toBe('');
    });
  });

  describe('note input', () => {
    it('should have header, content, and footer sections', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('.header');
      const content = fixture.nativeElement.querySelector('.content');
      const footer = fixture.nativeElement.querySelector('.footer');

      expect(header).toBeTruthy();
      expect(content).toBeTruthy();
      expect(footer).toBeTruthy();
    });

    it('should render date when note has a date', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.detectChanges();

      const date = fixture.nativeElement.querySelector('.date');

      expect(date).toBeTruthy();
      expect(date.textContent.trim()).toBe(
        formatExpectedDate(new Date('2025-06-15')),
      );
    });

    it('should update the displayed date when note changes', () => {
      const firstDate = new Date('2025-01-01');
      const secondDate = new Date('2025-12-31');

      fixture.componentRef.setInput('note', createNote({ date: firstDate }));
      fixture.detectChanges();

      const firstText = fixture.nativeElement
        .querySelector('.date')
        .textContent.trim();

      fixture.componentRef.setInput('note', createNote({ date: secondDate }));
      fixture.detectChanges();

      const secondText = fixture.nativeElement
        .querySelector('.date')
        .textContent.trim();

      expect(firstText).toBe(formatExpectedDate(firstDate));
      expect(secondText).toBe(formatExpectedDate(secondDate));
      expect(secondText).not.toBe(firstText);
    });

    it('should display the note content text', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ content: 'Hello world' }),
      );
      fixture.detectChanges();

      const p = fixture.nativeElement.querySelector('.content p');

      expect(p.textContent.trim()).toBe('Hello world');
    });

    it('should display empty content when note content is an empty string', () => {
      fixture.componentRef.setInput('note', createNote({ content: '' }));
      fixture.detectChanges();

      const p = fixture.nativeElement.querySelector('.content p');

      expect(p.textContent.trim()).toBe('');
    });

    it('should update displayed content when note input changes', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ content: 'Old text' }),
      );
      fixture.detectChanges();

      fixture.componentRef.setInput(
        'note',
        createNote({ content: 'New text' }),
      );
      fixture.detectChanges();

      const p = fixture.nativeElement.querySelector('.content p');

      expect(p.textContent.trim()).toBe('New text');
      expect(p.textContent).not.toContain('Old text');
    });

    it('should preserve special characters in content', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ content: 'A & B < C > D "quoted"' }),
      );
      fixture.detectChanges();

      const p = fixture.nativeElement.querySelector('.content p');

      expect(p.textContent).toContain('A & B < C > D "quoted"');
    });

    it('should render bell icon when reminderDaysBefore is greater than 0', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ reminderDaysBefore: 5 }),
      );
      fixture.detectChanges();

      const bell = fixture.nativeElement.querySelector('.pi-bell');

      expect(bell).toBeTruthy();
    });

    it('should display the reminderDaysBefore number in the footer', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ reminderDaysBefore: 7 }),
      );
      fixture.detectChanges();

      const span = fixture.nativeElement.querySelector('.footer span');

      expect(span.textContent).toContain('7');
    });

    it('should not render bell icon when reminderDaysBefore is 0', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ reminderDaysBefore: 0 }),
      );
      fixture.detectChanges();

      const bell = fixture.nativeElement.querySelector('.pi-bell');

      expect(bell).toBeFalsy();
    });

    it('should update displayed reminder number when note changes', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ reminderDaysBefore: 3 }),
      );
      fixture.detectChanges();

      fixture.componentRef.setInput(
        'note',
        createNote({ reminderDaysBefore: 10 }),
      );
      fixture.detectChanges();

      const span = fixture.nativeElement.querySelector('.footer span');

      expect(span.textContent).toContain('10');
      expect(span.textContent).not.toContain('3 ');
    });

    it('should hide reminder span when reminderDaysBefore changes from positive to 0', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ reminderDaysBefore: 5 }),
      );
      fixture.detectChanges();

      fixture.componentRef.setInput(
        'note',
        createNote({ reminderDaysBefore: 0 }),
      );
      fixture.detectChanges();

      const span = fixture.nativeElement.querySelector('.footer span');

      expect(span).toBeFalsy();
    });

    it('should render replay icon when note has recurrence', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ recurrence: { days: 7, months: 0, years: 0 } }),
      );
      fixture.detectChanges();

      const replay = fixture.nativeElement.querySelector('.pi-replay');

      expect(replay).toBeTruthy();
    });

    it('should not render replay icon when note has no recurrence', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.detectChanges();

      const replay = fixture.nativeElement.querySelector('.pi-replay');

      expect(replay).toBeFalsy();
    });

    it('should display recurrenceLabel with days in the footer', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ recurrence: { days: 5, months: 0, years: 0 } }),
      );
      fixture.detectChanges();

      const [recurrenceSpan] =
        fixture.nativeElement.querySelectorAll('.footer span');

      expect(recurrenceSpan.textContent).toContain('5');
    });

    it('should display recurrenceLabel with months in the footer', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ recurrence: { days: 0, months: 3, years: 0 } }),
      );
      fixture.detectChanges();

      const recurrenceSpan =
        fixture.nativeElement.querySelector('.pi-replay').parentElement;

      expect(recurrenceSpan.textContent).toContain('3');
    });

    it('should display recurrenceLabel with years in the footer', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ recurrence: { days: 0, months: 0, years: 1 } }),
      );
      fixture.detectChanges();

      const recurrenceSpan =
        fixture.nativeElement.querySelector('.pi-replay').parentElement;

      expect(recurrenceSpan.textContent).toContain('1');
    });

    it('should display combined recurrenceLabel for multiple fields', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ recurrence: { days: 10, months: 2, years: 1 } }),
      );
      fixture.detectChanges();

      const recurrenceSpan =
        fixture.nativeElement.querySelector('.pi-replay').parentElement;
      const text = recurrenceSpan.textContent;

      expect(text).toContain('1');
      expect(text).toContain('2');
      expect(text).toContain('10');
    });

    it('should return recurrenceTooltip with prefix and recurrence parts', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ recurrence: { days: 7, months: 0, years: 0 } }),
      );
      fixture.detectChanges();

      const tooltip = component.recurrenceTooltip();

      expect(tooltip).toContain('NOTE.RECURRENCE_PREFIX');
      expect(tooltip).toContain('7');
    });

    it('should return empty string for recurrenceTooltip when note has no recurrence', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.detectChanges();

      expect(component.recurrenceTooltip()).toBe('');
    });

    it('should return combined recurrenceTooltip for multiple fields', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ recurrence: { days: 5, months: 2, years: 1 } }),
      );
      fixture.detectChanges();

      const tooltip = component.recurrenceTooltip();

      expect(tooltip).toContain('NOTE.RECURRENCE_PREFIX');
      expect(tooltip).toContain('1');
      expect(tooltip).toContain('2');
      expect(tooltip).toContain('5');
    });

    it('should return empty string for recurrenceLabel when note has no recurrence', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.detectChanges();

      expect(component.recurrenceLabel()).toBe('');
    });

    it('should update recurrence display when note recurrence changes', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ recurrence: { days: 3, months: 0, years: 0 } }),
      );
      fixture.detectChanges();

      const firstText =
        fixture.nativeElement.querySelector('.pi-replay').parentElement
          .textContent;

      fixture.componentRef.setInput(
        'note',
        createNote({ recurrence: { days: 14, months: 0, years: 0 } }),
      );
      fixture.detectChanges();

      const secondText =
        fixture.nativeElement.querySelector('.pi-replay').parentElement
          .textContent;

      expect(firstText).toContain('3');
      expect(secondText).toContain('14');
      expect(secondText).not.toContain(' 3 ');
    });

    it('should hide replay icon when recurrence is removed from note', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ recurrence: { days: 7, months: 0, years: 0 } }),
      );
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.pi-replay')).toBeTruthy();

      fixture.componentRef.setInput('note', createNote());
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('.pi-replay')).toBeFalsy();
    });
  });

  describe('showEditButton input', () => {
    it('should render edit button when showEditButton is true', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.componentRef.setInput('showEditButton', true);
      fixture.detectChanges();

      const editButton = fixture.nativeElement.querySelector('.edit-button');

      expect(editButton).toBeTruthy();
    });

    it('should render npn-button inside edit button', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.componentRef.setInput('showEditButton', true);
      fixture.detectChanges();

      const appButton = fixture.nativeElement.querySelector(
        '.edit-button npn-button',
      );

      expect(appButton).toBeTruthy();
    });

    it('should not render edit button when showEditButton is false', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.componentRef.setInput('showEditButton', false);
      fixture.detectChanges();

      const editButton = fixture.nativeElement.querySelector('.edit-button');

      expect(editButton).toBeFalsy();
    });
  });

  describe('edit output', () => {
    it('should emit edit event with note when edit button is clicked', () => {
      const note = createNote({ id: '42', content: 'Editable' });
      fixture.componentRef.setInput('note', note);
      fixture.componentRef.setInput('showEditButton', true);
      fixture.detectChanges();

      const spy = vi.fn();
      outputToObservable(component.edit).subscribe(spy);

      const button = fixture.nativeElement.querySelector(
        '.edit-button npn-button button',
      );
      button.click();

      expect(spy).toHaveBeenCalledWith(note);
    });

    it('should emit edit event only once per click', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.componentRef.setInput('showEditButton', true);
      fixture.detectChanges();

      const spy = vi.fn();
      outputToObservable(component.edit).subscribe(spy);

      const button = fixture.nativeElement.querySelector(
        '.edit-button npn-button button',
      );
      button.click();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not emit edit event without interaction', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.componentRef.setInput('showEditButton', true);
      fixture.detectChanges();

      const spy = vi.fn();
      outputToObservable(component.edit).subscribe(spy);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('internationalization and localization', () => {
    it('should return empty string for formattedDate when note is undefined', () => {
      expect(component.formattedDate()).toBe('');
    });

    it('should format date using WEEKDAY_DAY_MONTH format', () => {
      const date = new Date('2025-03-10');

      fixture.componentRef.setInput('note', createNote({ date }));
      fixture.detectChanges();

      const result = component.formattedDate();

      expect(result).toMatch(/[A-Z][a-z]+ \d{2}\.\d{2}/u);
    });

    it('should format date using English locale by default', () => {
      const date = new Date('2025-06-15');

      fixture.componentRef.setInput('note', createNote({ date }));
      fixture.detectChanges();

      expect(component.formattedDate()).toBe(formatExpectedDate(date, enGB));
    });

    it('should capitalize the first letter of the formatted date', () => {
      const date = new Date('2025-06-15');

      fixture.componentRef.setInput('note', createNote({ date }));
      fixture.detectChanges();

      const result = component.formattedDate();

      expect(result[0]).toBe(result[0].toUpperCase());
    });

    it('should update formattedDate when note date changes', () => {
      const firstDate = new Date('2025-01-01');
      const secondDate = new Date('2025-12-31');

      fixture.componentRef.setInput('note', createNote({ date: firstDate }));
      fixture.detectChanges();
      const first = component.formattedDate();

      fixture.componentRef.setInput('note', createNote({ date: secondDate }));
      fixture.detectChanges();
      const second = component.formattedDate();

      expect(first).toBe(formatExpectedDate(firstDate));
      expect(second).toBe(formatExpectedDate(secondDate));
      expect(first).not.toBe(second);
    });

    describe('with pl locale', () => {
      let plComponent: NoteComponent;
      let plFixture: ComponentFixture<NoteComponent>;

      beforeEach(async () => {
        await TestBed.resetTestingModule()
          .configureTestingModule({
            imports: [NoteComponent, TranslateModule.forRoot()],
            providers: [
              { provide: DATE_FORMAT, useValue: 'EEEE dd.MM' },
              { provide: FALLBACK_LOCALE, useValue: 'en' },
              {
                provide: Router,
                useValue: {
                  events: new Subject(),
                  url: '/pl/home',
                },
              },
            ],
          })
          .compileComponents();

        plFixture = TestBed.createComponent(NoteComponent);
        plComponent = plFixture.componentInstance;
        plFixture.detectChanges();
      });

      it('should format date using Polish locale', () => {
        const date = new Date('2025-06-15');

        plFixture.componentRef.setInput('note', createNote({ date }));
        plFixture.detectChanges();

        expect(plComponent.formattedDate()).toBe(formatExpectedDate(date, pl));
      });

      it('should capitalize the first letter for Polish locale', () => {
        const date = new Date('2025-06-15');

        plFixture.componentRef.setInput('note', createNote({ date }));
        plFixture.detectChanges();

        const result = plComponent.formattedDate();

        expect(result[0]).toBe(result[0].toUpperCase());
      });

      it('should differ from the English formatted date', () => {
        const date = new Date('2025-06-15');

        plFixture.componentRef.setInput('note', createNote({ date }));
        plFixture.detectChanges();
        const plResult = plComponent.formattedDate();

        const enResult = formatExpectedDate(date, enGB);

        expect(plResult).not.toBe(enResult);
      });

      it('should update when the note date changes in pl locale', () => {
        const firstDate = new Date('2025-01-01');
        const secondDate = new Date('2025-12-31');

        plFixture.componentRef.setInput(
          'note',
          createNote({ date: firstDate }),
        );
        plFixture.detectChanges();
        const first = plComponent.formattedDate();

        plFixture.componentRef.setInput(
          'note',
          createNote({ date: secondDate }),
        );
        plFixture.detectChanges();
        const second = plComponent.formattedDate();

        expect(first).toBe(formatExpectedDate(firstDate, pl));
        expect(second).toBe(formatExpectedDate(secondDate, pl));
        expect(first).not.toBe(second);
      });
    });
  });
});
