import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { StepPanelComponent } from './step-panel.component';
import { StepPanelAction } from './step-panel.interfaces';

@Component({
  imports: [StepPanelComponent],
  template: `<app-step-panel [actions]="actions">{{ text }}</app-step-panel>`,
})
class TestHostComponent {
  actions: StepPanelAction[] = [];
  text = 'Step content';
}

describe('StepPanelComponent', () => {
  let component: StepPanelComponent;
  let fixture: ComponentFixture<StepPanelComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StepPanelComponent,
        TestHostComponent,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StepPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a step div', () => {
    const step = fixture.nativeElement.querySelector('.step');

    expect(step).toBeTruthy();
  });

  it('should render content and actions sections', () => {
    const content = fixture.nativeElement.querySelector('.content');
    const actions = fixture.nativeElement.querySelector('.actions');

    expect(content).toBeTruthy();
    expect(actions).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should have empty actions array by default', () => {
      expect(component.actions).toEqual([]);
    });

    it('should not render any buttons when actions is empty', () => {
      const buttons = fixture.nativeElement.querySelectorAll(
        '.actions app-button',
      );

      expect(buttons.length).toBe(0);
    });
  });

  describe('actions input', () => {
    it('should render one button per action', () => {
      const onClick = vi.fn();
      fixture.componentRef.setInput('actions', [
        { label: 'Next', onClick },
        { label: 'Back', onClick },
      ]);
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll(
        '.actions app-button',
      );

      expect(buttons.length).toBe(2);
    });

    it('should render button label', () => {
      fixture.componentRef.setInput('actions', [
        { label: 'Continue', onClick: vi.fn() },
      ]);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector(
        '.actions app-button button',
      );

      expect(button.textContent).toContain('Continue');
    });

    it('should call onClick when button is clicked', () => {
      const onClick = vi.fn();
      fixture.componentRef.setInput('actions', [{ label: 'Submit', onClick }]);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector(
        '.actions app-button button',
      );
      button.click();

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should render disabled button when action is disabled', () => {
      fixture.componentRef.setInput('actions', [
        { label: 'Disabled', disabled: true, onClick: vi.fn() },
      ]);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector(
        '.actions app-button button',
      );

      expect(button.disabled).toBe(true);
    });
  });

  describe('content projection', () => {
    it('should project text content', () => {
      const content = hostFixture.nativeElement.querySelector('.content');

      expect(content.textContent).toContain('Step content');
    });

    it('should update projected content when host changes', () => {
      hostFixture.componentInstance.text = 'Updated content';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const content = hostFixture.nativeElement.querySelector('.content');

      expect(content.textContent).toContain('Updated content');
    });

    it('should pass actions from host', () => {
      hostFixture.componentInstance.actions = [
        { label: 'Go', onClick: vi.fn() },
      ];
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const buttons = hostFixture.nativeElement.querySelectorAll(
        '.actions app-button',
      );

      expect(buttons.length).toBe(1);
    });
  });
});
