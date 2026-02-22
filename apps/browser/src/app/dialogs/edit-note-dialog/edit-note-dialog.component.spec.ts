import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { EditNoteDialogComponent } from './edit-note-dialog.component';

describe('EditNoteDialogComponent', () => {
  let component: EditNoteDialogComponent;
  let fixture: ComponentFixture<EditNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNoteDialogComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
