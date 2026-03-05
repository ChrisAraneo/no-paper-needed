import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { StepPanelDirective } from '../../directives/step-panel/step-panel.directive';
import { StepConfig, StepperDialogComponent } from './stepper-dialog.component';

@Component({
  imports: [StepperDialogComponent, StepPanelDirective],
  template: `
    <app-stepper-dialog
      [title]="title"
      [isVisible]="isVisible"
      [activeStep]="activeStep"
      [steps]="steps"
      [styleClass]="styleClass"
      (isVisibleChange)="onVisibleChange($event)"
      (activeStepChange)="onActiveStepChange($event)"
      (close)="onClose()">
      <ng-template appStepPanel [stepValue]="1" [stepActions]="[]">
        <p class="panel-1">Panel 1</p>
      </ng-template>
      <ng-template appStepPanel [stepValue]="2" [stepActions]="[]">
        <p class="panel-2">Panel 2</p>
      </ng-template>
    </app-stepper-dialog>
  `,
})
class TestHostComponent {
  title = 'Test Dialog';
  isVisible = true;
  activeStep = 1;
  styleClass = '';
  steps: StepConfig[] = [
    { value: 1, label: 'Step 1' },
    { value: 2, label: 'Step 2' },
  ];

  onVisibleChange = vi.fn();
  onActiveStepChange = vi.fn();
  onClose = vi.fn();
}

describe('StepperDialogComponent', () => {
  let component: StepperDialogComponent;
  let fixture: ComponentFixture<StepperDialogComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StepperDialogComponent,
        TestHostComponent,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StepperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render p-dialog', () => {
    const dialog = fixture.nativeElement.querySelector('p-dialog');

    expect(dialog).toBeTruthy();
  });

  it('should render p-stepper inside dialog', () => {
    fixture.componentRef.setInput('isVisible', true);
    fixture.detectChanges();

    const stepper = fixture.nativeElement.querySelector('p-stepper');

    expect(stepper).toBeTruthy();
  });

  it('should render p-step-list', () => {
    fixture.componentRef.setInput('isVisible', true);
    fixture.detectChanges();

    const stepList = fixture.nativeElement.querySelector('p-step-list');

    expect(stepList).toBeTruthy();
  });

  it('should render p-step-panels', () => {
    fixture.componentRef.setInput('isVisible', true);
    fixture.detectChanges();

    const stepPanels = fixture.nativeElement.querySelector('p-step-panels');

    expect(stepPanels).toBeTruthy();
  });

  describe('default inputs', () => {
    it('should have empty title by default', () => {
      expect(component.title).toBe('');
    });

    it('should have empty styleClass by default', () => {
      expect(component.styleClass).toBe('');
    });

    it('should have activeStep 1 by default', () => {
      expect(component.activeStep).toBe(1);
    });

    it('should have empty steps array by default', () => {
      expect(component.steps).toEqual([]);
    });

    it('should have isVisible false by default', () => {
      expect(component.isVisible).toBe(false);
    });

    it('should not render any p-step elements when steps is empty', () => {
      const steps = fixture.nativeElement.querySelectorAll('p-step');

      expect(steps.length).toBe(0);
    });
  });

  describe('steps input', () => {
    it('should render one p-step per step config', () => {
      fixture.componentRef.setInput('isVisible', true);
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
      fixture.componentRef.setInput('isVisible', true);
      fixture.componentRef.setInput('steps', [{ value: 1, label: 'My Step' }]);
      fixture.detectChanges();

      const step = fixture.nativeElement.querySelector('p-step');

      expect(step.textContent).toContain('My Step');
    });

    it('should update steps when input changes', () => {
      fixture.componentRef.setInput('isVisible', true);
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

  describe('onActiveStepChange', () => {
    it('should update activeStep and emit activeStepChange', () => {
      const spy = vi.spyOn(component.activeStepChange, 'emit');

      component.onActiveStepChange(3);

      expect(component.activeStep).toBe(3);
      expect(spy).toHaveBeenCalledWith(3);
    });

    it('should not update or emit when step is undefined', () => {
      const spy = vi.spyOn(component.activeStepChange, 'emit');
      component.activeStep = 1;

      component.onActiveStepChange(undefined);

      expect(component.activeStep).toBe(1);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onVisibleChange', () => {
    it('should emit isVisibleChange with the value', () => {
      const spy = vi.spyOn(component.isVisibleChange, 'emit');

      component.onVisibleChange(true);

      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should emit close when visible becomes false', () => {
      const closeSpy = vi.spyOn(component.close, 'emit');
      const visibleSpy = vi.spyOn(component.isVisibleChange, 'emit');

      component.onVisibleChange(false);

      expect(visibleSpy).toHaveBeenCalledWith(false);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit close when visible becomes true', () => {
      const closeSpy = vi.spyOn(component.close, 'emit');

      component.onVisibleChange(true);

      expect(closeSpy).not.toHaveBeenCalled();
    });
  });

  describe('dialog component with host', () => {
    it('should render steps from host', () => {
      const steps = hostFixture.nativeElement.querySelectorAll('p-step');

      expect(steps.length).toBe(2);
    });

    it('should collect step panel directives via ContentChildren', () => {
      const dialog = hostFixture.debugElement.children[0]
        .componentInstance as StepperDialogComponent;

      expect(dialog.stepPanels.length).toBe(2);
    });

    it('should pass title from host', () => {
      const dialog = hostFixture.debugElement.children[0]
        .componentInstance as StepperDialogComponent;

      expect(dialog.title).toBe('Test Dialog');
    });

    it('should pass isVisible from host', () => {
      const dialog = hostFixture.debugElement.children[0]
        .componentInstance as StepperDialogComponent;

      expect(dialog.isVisible).toBe(true);
    });

    it('should pass activeStep from host', () => {
      hostFixture.componentInstance.activeStep = 2;
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const dialog = hostFixture.debugElement.children[0]
        .componentInstance as StepperDialogComponent;

      expect(dialog.activeStep).toBe(2);
    });

    it('should pass styleClass from host', () => {
      hostFixture.componentInstance.styleClass = 'custom-class';
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      const dialog = hostFixture.debugElement.children[0]
        .componentInstance as StepperDialogComponent;

      expect(dialog.styleClass).toBe('custom-class');
    });

    it('should call host onClose when dialog closes', () => {
      const dialog = hostFixture.debugElement.children[0]
        .componentInstance as StepperDialogComponent;

      dialog.onVisibleChange(false);

      expect(hostFixture.componentInstance.onClose).toHaveBeenCalledTimes(1);
      expect(
        hostFixture.componentInstance.onVisibleChange,
      ).toHaveBeenCalledWith(false);
    });

    it('should call host onActiveStepChange when step changes', () => {
      const dialog = hostFixture.debugElement.children[0]
        .componentInstance as StepperDialogComponent;

      dialog.onActiveStepChange(2);

      expect(
        hostFixture.componentInstance.onActiveStepChange,
      ).toHaveBeenCalledWith(2);
    });
  });
});
