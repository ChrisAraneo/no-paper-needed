import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubheaderComponent } from './subheader.component';

@Component({
  imports: [SubheaderComponent],
  template: `<app-subheader>{{ text }}</app-subheader>`,
})
class TestHostComponent {
  text = 'Hello';
}

describe('SubheaderComponent', () => {
  let component: SubheaderComponent;
  let fixture: ComponentFixture<SubheaderComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubheaderComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a .subheader div', () => {
    const subheader = fixture.nativeElement.querySelector('.subheader');

    expect(subheader).toBeTruthy();
    expect(subheader.tagName).toBe('DIV');
  });

  it('should render an h2 inside .subheader', () => {
    const h2 = fixture.nativeElement.querySelector('.subheader > h2');

    expect(h2).toBeTruthy();
  });

  it('should have empty h2 text when no content is projected', () => {
    const h2 = fixture.nativeElement.querySelector('h2');

    expect(h2.textContent.trim()).toBe('');
  });

  it('should not render any other elements inside .subheader besides h2', () => {
    const children = fixture.nativeElement.querySelectorAll('.subheader > *');

    expect(children).toHaveLength(1);
    expect(children[0].tagName).toBe('H2');
  });

  describe('content projection', () => {
    it('should project text content into h2', () => {
      const h2 = hostFixture.nativeElement.querySelector('h2');

      expect(h2.textContent).toContain('Hello');
    });

    it('should update projected content when host changes', () => {
      hostFixture.componentInstance.text = 'Updated';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const h2 = hostFixture.nativeElement.querySelector('h2');

      expect(h2.textContent).toContain('Updated');
    });

    it('should render empty h2 when host text is empty', () => {
      hostFixture.componentInstance.text = '';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const h2 = hostFixture.nativeElement.querySelector('h2');

      expect(h2.textContent.trim()).toBe('');
    });

    it('should preserve the .subheader wrapper when content changes', () => {
      hostFixture.componentInstance.text = 'Changed';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const subheader = hostFixture.nativeElement.querySelector('.subheader');

      expect(subheader).toBeTruthy();
    });
  });
});
