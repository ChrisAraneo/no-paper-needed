import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header';
import { HeaderElement, HeaderSize } from './header.types';

@Component({
  imports: [HeaderComponent],
  template: `<npn-header [size]="size" [element]="element">{{
    text
  }}</npn-header>`,
})
class TestHostComponent {
  size: HeaderSize = 'lg';
  element: HeaderElement = 'h1';

  text = 'Hello';
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should have size "lg" by default', () => {
      expect(component.size()).toBe('lg');
    });

    it('should apply "lg" class to h1 by default', () => {
      const h1 = fixture.nativeElement.querySelector('h1');

      expect(h1.classList.contains('lg')).toBe(true);
    });
  });

  describe('size input', () => {
    it('should apply "xl" class when size is "xl"', () => {
      fixture.componentRef.setInput('size', 'xl');
      fixture.detectChanges();

      const h1 = fixture.nativeElement.querySelector('h1');

      expect(h1.classList.contains('xl')).toBe(true);
    });

    it('should apply "lg" class when size is "lg"', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const h1 = fixture.nativeElement.querySelector('h1');

      expect(h1.classList.contains('lg')).toBe(true);
    });

    it('should apply "md" class when size is "md"', () => {
      fixture.componentRef.setInput('size', 'md');
      fixture.detectChanges();

      const h1 = fixture.nativeElement.querySelector('h1');

      expect(h1.classList.contains('md')).toBe(true);
    });

    it('should pass "md" size input from host to header', () => {
      hostFixture.componentInstance.size = 'md';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const h1 = hostFixture.nativeElement.querySelector('h1');

      expect(h1.classList.contains('md')).toBe(true);
    });
  });

  describe('content projection', () => {
    it('should project text content into h1', () => {
      const h1 = hostFixture.nativeElement.querySelector('h1');

      expect(h1.textContent).toContain('Hello');
    });

    it('should update projected content when host changes', () => {
      hostFixture.componentInstance.text = 'Updated';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const h1 = hostFixture.nativeElement.querySelector('h1');

      expect(h1.textContent).toContain('Updated');
    });

    it('should pass size input from host to header', () => {
      hostFixture.componentInstance.size = 'xl';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const h1 = hostFixture.nativeElement.querySelector('h1');

      expect(h1.classList.contains('xl')).toBe(true);
    });
  });

  describe('element input', () => {
    it('should default to h1', () => {
      expect(component.element()).toBe('h1');
    });

    it('should render h1 by default', () => {
      const h1 = fixture.nativeElement.querySelector('header > h1');
      const h2 = fixture.nativeElement.querySelector('header > h2');

      expect(h1).toBeTruthy();
      expect(h2).toBeFalsy();
    });

    (['h2', 'h3', 'h4', 'h5', 'h6'] as HeaderElement[]).forEach((el) => {
      it(`should render ${el} when element is "${el}"`, () => {
        fixture.componentRef.setInput('element', el);
        fixture.detectChanges();

        const h1 = fixture.nativeElement.querySelector('header > h1');
        const target = fixture.nativeElement.querySelector(`header > ${el}`);

        expect(h1).toBeFalsy();
        expect(target).toBeTruthy();
      });

      it(`should apply size class to ${el}`, () => {
        fixture.componentRef.setInput('element', el);
        fixture.componentRef.setInput('size', 'md');
        fixture.detectChanges();

        const target = fixture.nativeElement.querySelector(el);

        expect(target.classList.contains('md')).toBe(true);
      });

      it(`should pass element "${el}" from host`, () => {
        const elHostFixture = TestBed.createComponent(TestHostComponent);
        elHostFixture.componentInstance.element = el;
        elHostFixture.detectChanges();

        const target = elHostFixture.nativeElement.querySelector(el);

        expect(target).toBeTruthy();
        expect(target.textContent).toContain('Hello');
      });
    });
  });

  describe('rendered text', () => {
    it('should display no text when no content is projected', () => {
      const h1 = fixture.nativeElement.querySelector('h1');

      expect(h1.textContent.trim()).toBe('');
    });

    it('should display projected text inside h1', () => {
      const h1 = hostFixture.nativeElement.querySelector('h1');

      expect(h1.textContent).toContain('Hello');
    });

    it('should update rendered text when host text changes', () => {
      hostFixture.componentInstance.text = 'New Title';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const h1 = hostFixture.nativeElement.querySelector('h1');

      expect(h1.textContent).toContain('New Title');
      expect(h1.textContent).not.toContain('Hello');
    });

    it('should render empty h1 when host text is cleared', () => {
      hostFixture.componentInstance.text = '';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const h1 = hostFixture.nativeElement.querySelector('h1');

      expect(h1.textContent.trim()).toBe('');
    });
  });
});
