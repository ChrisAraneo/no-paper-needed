import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { Note } from '../../interfaces/note.interface';
import { NoteComponent } from './note.component';

const createNote = (overrides: Partial<Note> = {}): Note => ({
  id: '1',
  date: new Date('2025-06-15'),
  content: 'Test note',
  reminderDaysBefore: 0,
  ...overrides,
});

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteComponent, TranslateModule.forRoot()],
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
  });

  describe('note input', () => {
    it('should render date when note has a date', () => {
      fixture.componentRef.setInput('note', createNote());
      fixture.detectChanges();

      const date = fixture.nativeElement.querySelector('.date');

      expect(date).toBeTruthy();
      expect(date.textContent.trim()).toBeTruthy();
    });

    it('should render content when note has content', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ content: 'My content' }),
      );
      fixture.detectChanges();

      const content = fixture.nativeElement.querySelector('.content p');

      expect(content.textContent).toContain('My content');
    });

    it('should not render content text when note has empty content', () => {
      fixture.componentRef.setInput('note', createNote({ content: '' }));
      fixture.detectChanges();

      const content = fixture.nativeElement.querySelector('.content p');

      expect(content.textContent.trim()).toBe('');
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

    it('should render reminderDaysBefore value next to bell icon', () => {
      fixture.componentRef.setInput(
        'note',
        createNote({ reminderDaysBefore: 3 }),
      );
      fixture.detectChanges();

      const footer = fixture.nativeElement.querySelector('.footer span');

      expect(footer.textContent).toContain('3');
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

    it('should update content when note input changes', () => {
      fixture.componentRef.setInput('note', createNote({ content: 'First' }));
      fixture.detectChanges();

      fixture.componentRef.setInput('note', createNote({ content: 'Second' }));
      fixture.detectChanges();

      const content = fixture.nativeElement.querySelector('.content p');

      expect(content.textContent).toContain('Second');
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

  describe('rendered elements', () => {
    describe('containers', () => {
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

      it('should render a container div', () => {
        const container = fixture.nativeElement.querySelector('.container');

        expect(container).toBeTruthy();
      });

      it('should render a p-card', () => {
        const card = fixture.nativeElement.querySelector('p-card');

        expect(card).toBeTruthy();
      });
    });

    describe('content', () => {
      it('should display no content text when note is undefined', () => {
        const p = fixture.nativeElement.querySelector('.content p');

        expect(p.textContent.trim()).toBe('');
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
    });

    describe('date', () => {
      it('should display no date text when note is undefined', () => {
        const dateEl = fixture.nativeElement.querySelector('.date');

        expect(dateEl).toBeFalsy();
      });

      it('should display a formatted date string', () => {
        fixture.componentRef.setInput(
          'note',
          createNote({ date: new Date('2025-06-15') }),
        );
        fixture.detectChanges();

        const dateEl = fixture.nativeElement.querySelector('.date');

        expect(dateEl.textContent.trim()).toBeTruthy();
      });

      it('should update the displayed date when note changes', () => {
        fixture.componentRef.setInput(
          'note',
          createNote({ date: new Date('2025-01-01') }),
        );
        fixture.detectChanges();

        const firstText = fixture.nativeElement
          .querySelector('.date')
          .textContent.trim();

        fixture.componentRef.setInput(
          'note',
          createNote({ date: new Date('2025-12-31') }),
        );
        fixture.detectChanges();

        const secondText = fixture.nativeElement
          .querySelector('.date')
          .textContent.trim();

        expect(secondText).not.toBe(firstText);
      });
    });

    describe('footer reminder', () => {
      it('should display no reminder text when reminderDaysBefore is 0', () => {
        fixture.componentRef.setInput(
          'note',
          createNote({ reminderDaysBefore: 0 }),
        );
        fixture.detectChanges();

        const span = fixture.nativeElement.querySelector('.footer span');

        expect(span).toBeFalsy();
      });

      it('should display no reminder text when note is undefined', () => {
        const span = fixture.nativeElement.querySelector('.footer span');

        expect(span).toBeFalsy();
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
    });
  });
});
