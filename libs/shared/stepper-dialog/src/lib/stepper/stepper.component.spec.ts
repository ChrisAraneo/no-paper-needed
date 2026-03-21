import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { StepPanelDirective } from '../step-panel/step-panel.directive';
import { StepConfig } from '../stepper-dialog/stepper-dialog.interfaces';
import { StepperComponent } from './stepper.component';

@Component({
  imports: [StepperComponent, StepPanelDirective],
  template: `
    <app-stepper [steps]="steps" [activeStep]="activeStep" [linear]="linear">
      <ng-template appStepPanel [stepValue]="1" [stepActions]="[]">
        <p class="panel-1">Panel 1 content</p>
      </ng-template>
      <ng-template appStepPanel [stepValue]="2" [stepActions]="[]">
        <p class="panel-2">Panel 2 content</p>
      </ng-template>
    </app-stepper>
  `,
})
class TestHostComponent {
  steps: StepConfig[] = [
    { value: 1, label: 'Step 1' },
    { value: 2, label: 'Step 2' },
  ];
  activeStep = 1;
  linear = true;
}

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render p-stepper', () => {
    const stepper = fixture.nativeElement.querySelector('p-stepper');

    expect(stepper).toBeTruthy();
  });

  it('should render p-step-list', () => {
    const stepList = fixture.nativeElement.querySelector('p-step-list');

    expect(stepList).toBeTruthy();
  });

  it('should render p-step-panels', () => {
    const stepPanels = fixture.nativeElement.querySelector('p-step-panels');

    expect(stepPanels).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should have activeStep 1 by default', () => {
      expect(component.activeStep).toBe(1);
    });

    it('should have linear true by default', () => {
      expect(component.linear).toBe(true);
    });

    it('should have empty steps array by default', () => {
      expect(component.steps).toEqual([]);
    });

    it('should not render any p-step elements when steps is empty', () => {
      const steps = fixture.nativeElement.querySelectorAll('p-step');

      expect(steps.length).toBe(0);
    });
  });

  describe('steps input', () => {
    it('should render one p-step per step config', () => {
      fixture.componentRef.setInput('steps', [
        { value: 1, label: 'First' },
        { value: 2, label: 'Second' },
        { value: 3, label: 'Third' },
      ]);
      fixture.detectChanges();

      const steps = fixture.nativeElement.querySelectorAll('p-step');

      expect(steps.length).toBe(3);
    });

    it('should render step labels', () => {
      fixture.componentRef.setInput('steps', [{ value: 1, label: 'My Step' }]);
      fixture.detectChanges();

      const step = fixture.nativeElement.querySelector('p-step');

      expect(step.textContent).toContain('My Step');
    });

    it('should update steps when input changes', () => {
      fixture.componentRef.setInput('steps', [{ value: 1, label: 'One' }]);
      fixture.detectChanges();

      let steps = fixture.nativeElement.querySelectorAll('p-step');

      expect(steps.length).toBe(1);

      fixture.componentRef.setInput('steps', [
        { value: 1, label: 'One' },
        { value: 2, label: 'Two' },
      ]);
      fixture.detectChanges();

      steps = fixture.nativeElement.querySelectorAll('p-step');

      expect(steps.length).toBe(2);
    });
  });

  describe('activeStep input', () => {
    it('should accept activeStep value', () => {
      fixture.componentRef.setInput('activeStep', 2);
      fixture.detectChanges();

      expect(component.activeStep).toBe(2);
    });
  });

  describe('linear input', () => {
    it('should accept linear false', () => {
      fixture.componentRef.setInput('linear', false);
      fixture.detectChanges();

      expect(component.linear).toBe(false);
    });

    it('should accept linear true', () => {
      fixture.componentRef.setInput('linear', true);
      fixture.detectChanges();

      expect(component.linear).toBe(true);
    });
  });
});

describe('StepperComponent (with host)', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TranslateModule.forRoot()],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should render steps from host', () => {
    const steps = hostFixture.nativeElement.querySelectorAll('p-step');

    expect(steps.length).toBe(2);
  });

  it('should pass linear input from host', () => {
    hostFixture.componentInstance.linear = false;
    hostFixture.changeDetectorRef.markForCheck();
    hostFixture.detectChanges();

    const stepper = hostFixture.debugElement.children[0]
      .componentInstance as StepperComponent;

    expect(stepper.linear).toBe(false);
  });

  it('should pass activeStep input from host', () => {
    hostFixture.componentInstance.activeStep = 2;
    hostFixture.changeDetectorRef.markForCheck();
    hostFixture.detectChanges();

    const stepper = hostFixture.debugElement.children[0]
      .componentInstance as StepperComponent;

    expect(stepper.activeStep).toBe(2);
  });

  it('should collect step panel directives via ContentChildren', () => {
    const stepper = hostFixture.debugElement.children[0]
      .componentInstance as StepperComponent;

    expect(stepper.stepPanels.length).toBe(2);
  });
});
