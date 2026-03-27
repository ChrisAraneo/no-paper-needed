import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DATE_FORMAT, FALLBACK_LOCALE } from '@no-paper-needed/shared/tokens';

import { ArchiveComponent } from './archive.component';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ArchiveComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), { provide: DATE_FORMAT, useValue: 'EEEE dd.MM' }, { provide: FALLBACK_LOCALE, useValue: 'en' }],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('npn-header')).toBeTruthy();
  });
});
