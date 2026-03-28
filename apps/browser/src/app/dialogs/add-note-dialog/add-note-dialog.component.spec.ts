import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DATE_FORMAT, FALLBACK_LOCALE } from '@no-paper-needed/shared/tokens';

import { AddNoteDialogComponent } from './add-note-dialog.component';

describe('AddNoteDialogComponent', () => {
  let component: AddNoteDialogComponent;
  let fixture: ComponentFixture<AddNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNoteDialogComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: DATE_FORMAT, useValue: 'EEEE dd.MM' },
        { provide: FALLBACK_LOCALE, useValue: 'en' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
