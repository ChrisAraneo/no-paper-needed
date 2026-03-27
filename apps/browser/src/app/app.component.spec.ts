import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DATE_FORMAT, FALLBACK_LOCALE } from '@no-paper-needed/shared/tokens';

import { AppComponent } from './app.component';
import { ElectronService } from './core/services';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), ElectronService, { provide: FALLBACK_LOCALE, useValue: 'en' }, { provide: DATE_FORMAT, useValue: 'EEEE dd.MM' }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
