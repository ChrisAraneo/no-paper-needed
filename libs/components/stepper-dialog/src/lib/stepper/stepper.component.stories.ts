import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { StepPanelDirective } from '../step-panel/step-panel.directive';
import { StepPanelAction } from '../step-panel/step-panel.interfaces';
import { StepConfig } from '../stepper-dialog/stepper-dialog.interfaces';
import { StepperComponent } from './stepper.component';

@Component({
  selector: 'npn-stepper-story-wrapper',
  imports: [StepPanelDirective, StepperComponent],
  template: `
    <npn-stepper [steps]="steps" [activeStep]="activeStep" [linear]="linear">
      <ng-template npnStepPanel [stepValue]="1" [stepActions]="step1Actions">
        <h3>Step 1: Choose a date</h3>
        <p>Select the date for your note.</p>
      </ng-template>
      <ng-template npnStepPanel [stepValue]="2" [stepActions]="step2Actions">
        <h3>Step 2: Add content</h3>
        <p>Write the content of your note here.</p>
      </ng-template>
      <ng-template npnStepPanel [stepValue]="3" [stepActions]="step3Actions">
        <h3>Step 3: Review</h3>
        <p>Review your note before saving.</p>
      </ng-template>
    </npn-stepper>
  `,
})
class StepperStoryWrapperComponent {
  @Input() steps: StepConfig[] = [];
  @Input() activeStep = 1;
  @Input() linear = true;

  step1Actions: StepPanelAction[] = [
    {
      label: 'Next',
      icon: 'pi pi-arrow-right',
      iconPos: 'right',
      onClick: () => {
},
    },
  ];

  step2Actions: StepPanelAction[] = [
    {
      label: 'Back',
      icon: 'pi pi-arrow-left',
      iconPos: 'left',
      severity: 'secondary',
      onClick: () => {
},
    },
    {
      label: 'Next',
      icon: 'pi pi-arrow-right',
      iconPos: 'right',
      onClick: () => {
},
    },
  ];

  step3Actions: StepPanelAction[] = [
    {
      label: 'Back',
      icon: 'pi pi-arrow-left',
      iconPos: 'left',
      severity: 'secondary',
      onClick: () => {
},
    },
    {
      label: 'Save',
      icon: 'pi pi-check',
      iconPos: 'right',
      severity: 'success',
      onClick: () => {
},
    },
  ];
}

const meta: Meta<StepperStoryWrapperComponent> = {
  title: 'Components/Stepper',
  component: StepperStoryWrapperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [StepperStoryWrapperComponent],
    }),
  ],
  argTypes: {
    steps: {
      control: 'object',
      description: 'Array of step configurations.',
    },
    activeStep: {
      control: 'number',
      description: 'Currently active step value.',
    },
    linear: {
      control: 'boolean',
      description: 'Whether the stepper enforces linear progression.',
    },
  },
  render: (args) => ({
    props: { ...args },
    template: `<npn-stepper-story-wrapper [steps]="steps" [activeStep]="activeStep" [linear]="linear" />`,
  }),
};

export default meta;
type Story = StoryObj<StepperStoryWrapperComponent>;

export const Default: Story = {
  args: {
    steps: [
      { value: 1, label: 'Date' },
      { value: 2, label: 'Content' },
      { value: 3, label: 'Review' },
    ],
    activeStep: 1,
    linear: true,
  },
};

export const SecondStepActive: Story = {
  args: {
    steps: [
      { value: 1, label: 'Date' },
      { value: 2, label: 'Content' },
      { value: 3, label: 'Review' },
    ],
    activeStep: 2,
    linear: false,
  },
};

export const TwoSteps: Story = {
  args: {
    steps: [
      { value: 1, label: 'First' },
      { value: 2, label: 'Second' },
    ],
    activeStep: 1,
    linear: true,
  },
};
