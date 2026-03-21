import { Component, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPanelAction } from '../step-panel/step-panel.interfaces';
import { StepPanelDirective } from './step-panel.directive';

@Component({
  imports: [StepPanelDirective],
  template: `
    <ng-template
      appStepPanel
      [stepValue]="stepValue"
      [stepActions]="stepActions">
      <p class="content">Step content</p>
    </ng-template>
  `,
})
class SinglePanelHostComponent {
  @ViewChildren(StepPanelDirective)
  panels!: QueryList<StepPanelDirective>;

  stepValue = 1;
  stepActions: StepPanelAction[] = [];
}

@Component({
  imports: [StepPanelDirective],
  template: `
    <ng-template appStepPanel [stepValue]="1" [stepActions]="[]">
      <p class="panel-1">Panel 1</p>
    </ng-template>
    <ng-template appStepPanel [stepValue]="2" [stepActions]="actions">
      <p class="panel-2">Panel 2</p>
    </ng-template>
    <ng-template appStepPanel [stepValue]="3" [stepActions]="[]">
      <p class="panel-3">Panel 3</p>
    </ng-template>
  `,
})
class MultiPanelHostComponent {
  @ViewChildren(StepPanelDirective)
  panels!: QueryList<StepPanelDirective>;

  actions: StepPanelAction[] = [
    { label: 'Next', onClick: vi.fn() },
    { label: 'Back', onClick: vi.fn() },
  ];
}

describe('StepPanelDirective', () => {
  describe('single panel', () => {
    let hostFixture: ComponentFixture<SinglePanelHostComponent>;
    let directive: StepPanelDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StepPanelDirective, SinglePanelHostComponent],
      }).compileComponents();

      hostFixture = TestBed.createComponent(SinglePanelHostComponent);
      hostFixture.detectChanges();
      directive = hostFixture.componentInstance.panels.first;
    });

    it('should create the directive', () => {
      expect(directive).toBeTruthy();
    });

    it('should have stepActions defaulting to empty array', () => {
      expect(directive.stepActions).toEqual([]);
    });

    it('should bind stepValue from host', () => {
      expect(directive.stepValue).toBe(1);
    });

    it('should bind stepActions from host', () => {
      const onClick = vi.fn();
      hostFixture.componentInstance.stepActions = [{ label: 'Next', onClick }];
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      expect(directive.stepActions).toHaveLength(1);
      expect(directive.stepActions[0].label).toBe('Next');
    });

    it('should have a TemplateRef', () => {
      expect(directive.template).toBeInstanceOf(TemplateRef);
    });

    it('should update stepValue when host changes', () => {
      hostFixture.componentInstance.stepValue = 42;
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      expect(directive.stepValue).toBe(42);
    });

    it('should update stepActions when host changes', () => {
      const onClick = vi.fn();
      hostFixture.componentInstance.stepActions = [
        { label: 'Submit', onClick },
        { label: 'Cancel', onClick },
      ];
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      expect(directive.stepActions).toHaveLength(2);
    });

    it('should preserve stepActions onClick reference', () => {
      const onClick = vi.fn();
      hostFixture.componentInstance.stepActions = [{ label: 'Go', onClick }];
      hostFixture.changeDetectorRef.markForCheck();
      hostFixture.detectChanges();

      expect(directive.stepActions[0].onClick).toBe(onClick);
    });
  });

  describe('multiple panels', () => {
    let hostFixture: ComponentFixture<MultiPanelHostComponent>;
    let panels: StepPanelDirective[];

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StepPanelDirective, MultiPanelHostComponent],
      }).compileComponents();

      hostFixture = TestBed.createComponent(MultiPanelHostComponent);
      hostFixture.detectChanges();
      panels = hostFixture.componentInstance.panels.toArray();
    });

    it('should create one directive instance per ng-template', () => {
      expect(panels).toHaveLength(3);
    });

    it('should assign correct stepValue to each panel', () => {
      const values = panels.map((p) => p.stepValue);

      expect(values).toEqual([1, 2, 3]);
    });

    it('should assign stepActions only to the configured panel', () => {
      expect(panels[0].stepActions).toHaveLength(0);
      expect(panels[1].stepActions).toHaveLength(2);
      expect(panels[2].stepActions).toHaveLength(0);
    });

    it('should give each panel its own TemplateRef', () => {
      const templates = panels.map((p) => p.template);

      expect(templates[0]).not.toBe(templates[1]);
      expect(templates[1]).not.toBe(templates[2]);
    });

    it('each panel template should be a TemplateRef instance', () => {
      panels.forEach((panel) => {
        expect(panel.template).toBeInstanceOf(TemplateRef);
      });
    });
  });
});
