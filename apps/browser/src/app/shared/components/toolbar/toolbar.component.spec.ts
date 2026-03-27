import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FALLBACK_LOCALE } from '@no-paper-needed/shared/locale';

import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent, TranslateModule.forRoot()],
      providers: [provideRouter([]), { provide: FALLBACK_LOCALE, useValue: 'en' }],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('basic rendering', () => {
    it('should render three column divs', () => {
      const cols = fixture.nativeElement.querySelectorAll('.col');

      expect(cols).toHaveLength(3);
    });

    it('should render three npn-button elements', () => {
      const buttons = fixture.nativeElement.querySelectorAll('npn-button');

      expect(buttons).toHaveLength(3);
    });

    it('should render one npn-searchbar element', () => {
      const searchbar = fixture.nativeElement.querySelectorAll('npn-searchbar');

      expect(searchbar).toHaveLength(1);
    });

    it('should render searchbar in the center column', () => {
      const centerCol = fixture.nativeElement.querySelector('.col.center');

      expect(centerCol).toBeTruthy();
      expect(centerCol.querySelector('npn-searchbar')).toBeTruthy();
    });

    it('should render add note button in the flex-end column', () => {
      const flexEndCol = fixture.nativeElement.querySelector('.col.flex-end');

      expect(flexEndCol).toBeTruthy();
      expect(flexEndCol.querySelector('npn-button')).toBeTruthy();
    });

    it('should render home and archive buttons in the first column', () => {
      const firstCol = fixture.nativeElement.querySelector(
        '.col:not(.center):not(.flex-end)',
      );

      expect(firstCol).toBeTruthy();

      const buttons = firstCol.querySelectorAll('npn-button');

      expect(buttons).toHaveLength(2);
    });
  });

  describe('addNote output', () => {
    it('should emit addNote when add note button is clicked', () => {
      const spy = vi.fn();
      component.addNote.subscribe(spy);

      const flexEndCol = fixture.nativeElement.querySelector('.col.flex-end');
      const addButton = flexEndCol.querySelector('npn-button');
      const pButton = addButton.querySelector('p-button button');
      pButton.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not emit addNote without interaction', () => {
      const spy = vi.fn();
      component.addNote.subscribe(spy);
      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('navigateToHome()', () => {
    it('should navigate to home route with current lang', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      component.navigateToHome();

      expect(navigateSpy).toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('/home')]),
        expect.objectContaining({ queryParamsHandling: 'merge' }),
      );
    });
  });

  describe('navigateToArchive()', () => {
    it('should navigate to archive route with current lang', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      component.navigateToArchive();

      expect(navigateSpy).toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('/archive')]),
        expect.objectContaining({ queryParamsHandling: 'merge' }),
      );
    });
  });

  describe('navigateToSearch()', () => {
    it('should navigate to search route with query param when query is non-empty', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      component.navigateToSearch('hello');

      const [args] = navigateSpy.mock.calls;
      const [path] = args;

      expect(path).toHaveLength(2);
      expect(path[1]).toBe('search');
      expect(args[1]).toEqual(
        expect.objectContaining({
          queryParams: { q: 'hello' },
          queryParamsHandling: 'merge',
        }),
      );
    });

    it('should navigate to base route without search when query is empty', () => {
      const navigateSpy = vi.spyOn(router, 'navigate');

      component.navigateToSearch('');

      expect(navigateSpy).toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('/')]),
        expect.objectContaining({ queryParamsHandling: 'merge' }),
      );

      const path = navigateSpy.mock.calls[0][0][0] as string;

      expect(path).not.toContain('/search');
    });
  });
});
