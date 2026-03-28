import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DATE_FORMAT, FALLBACK_LOCALE } from '@no-paper-needed/shared/tokens';

import { DialogContainerComponent } from './dialog-container.component';

describe('DialogContainerComponent', () => {
  let component: DialogContainerComponent;
  let fixture: ComponentFixture<DialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogContainerComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: DATE_FORMAT, useValue: 'EEEE dd.MM' },
        { provide: FALLBACK_LOCALE, useValue: 'en' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
