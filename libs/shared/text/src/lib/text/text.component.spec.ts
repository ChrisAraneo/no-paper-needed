import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextComponent } from './text.component';

@Component({
  imports: [TextComponent],
  template: `<npn-text>{{ text }}</npn-text>`,
})
class TestHostComponent {
  text = 'Hello';
}

describe('TextComponent', () => {
  let component: TextComponent;
  let fixture: ComponentFixture<TextComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('content projection', () => {
    it('should project text content into span', () => {
      const span = hostFixture.nativeElement.querySelector('span');

      expect(span.textContent).toContain('Hello');
    });

    it('should update projected content when host changes', () => {
      hostFixture.componentInstance.text = 'Updated';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const span = hostFixture.nativeElement.querySelector('span');

      expect(span.textContent).toContain('Updated');
    });

    it('should render an empty span when no content is projected', () => {
      hostFixture.componentInstance.text = '';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const span = hostFixture.nativeElement.querySelector('span');

      expect(span.textContent.trim()).toBe('');
    });
  });
});
