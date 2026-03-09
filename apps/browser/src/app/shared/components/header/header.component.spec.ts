import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

@Component({
  imports: [HeaderComponent],
  template: `<app-header [size]="size">{{ text }}</app-header>`,
})
class TestHostComponent {
  size: 'xl' | 'lg' | 'md' = 'lg';

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

  it('should render a header element', () => {
    const header = fixture.nativeElement.querySelector('header');

    expect(header).toBeTruthy();
  });

  it('should render an h1 inside header', () => {
    const h1 = fixture.nativeElement.querySelector('header > h1');

    expect(h1).toBeTruthy();
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
