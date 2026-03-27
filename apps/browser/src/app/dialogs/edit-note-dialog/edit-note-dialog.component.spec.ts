import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FALLBACK_LOCALE } from '@no-paper-needed/shared/locale';
import { DATE_FORMAT } from '@no-paper-needed/shared/note';

import { EditNoteDialogComponent } from './edit-note-dialog.component';

describe('EditNoteDialogComponent', () => {
  let component: EditNoteDialogComponent;
  let fixture: ComponentFixture<EditNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNoteDialogComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), { provide: DATE_FORMAT, useValue: 'EEEE dd.MM' }, { provide: FALLBACK_LOCALE, useValue: 'en' }],
    }).compileComponents();

    fixture = TestBed.createComponent(EditNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
