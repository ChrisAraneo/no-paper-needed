import { Component, Input } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

import { StepPanelDirective } from '../step-panel/step-panel.directive';
import { StepPanelAction } from '../step-panel/step-panel.interfaces';
import { StepperDialogComponent } from './stepper-dialog.component';
import { StepConfig } from './stepper-dialog.interfaces';

@Component({
  selector: 'npn-stepper-dialog-story-wrapper',
  imports: [StepperDialogComponent, StepPanelDirective],
  template: `
    <npn-stepper-dialog
      [title]="title"
      [isVisible]="isVisible"
      [activeStep]="activeStep"
      [steps]="steps"
      [styleClass]="styleClass">
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
    </npn-stepper-dialog>
  `,
})
class StepperDialogStoryWrapperComponent {
  @Input() title = '';
  @Input() isVisible = true;
  @Input() activeStep = 1;
  @Input() styleClass = '';
  @Input() steps: StepConfig[] = [];

  step1Actions: StepPanelAction[] = [
    {
      label: 'Next',
      icon: 'pi pi-arrow-right',
      iconPos: 'right',
      onClick: () => {},
    },
  ];

  step2Actions: StepPanelAction[] = [
    {
      label: 'Back',
      icon: 'pi pi-arrow-left',
      iconPos: 'left',
      severity: 'secondary',
      onClick: () => {},
    },
    {
      label: 'Next',
      icon: 'pi pi-arrow-right',
      iconPos: 'right',
      onClick: () => {},
    },
  ];

  step3Actions: StepPanelAction[] = [
    {
      label: 'Back',
      icon: 'pi pi-arrow-left',
      iconPos: 'left',
      severity: 'secondary',
      onClick: () => {},
    },
    {
      label: 'Save',
      icon: 'pi pi-check',
      iconPos: 'right',
      severity: 'success',
      onClick: () => {},
    },
  ];
}

const meta: Meta<StepperDialogStoryWrapperComponent> = {
  title: 'Components/StepperDialog',
  component: StepperDialogStoryWrapperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [StepperDialogStoryWrapperComponent],
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Dialog title displayed in the header.',
    },
    isVisible: {
      control: 'boolean',
      description: 'Whether the dialog is visible.',
    },
    activeStep: {
      control: 'number',
      description: 'Currently active step value.',
    },
    styleClass: {
      control: 'text',
      description: 'Additional CSS class for the dialog.',
    },
    steps: {
      control: 'object',
      description: 'Array of step configurations.',
    },
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <npn-stepper-dialog-story-wrapper
        [title]="title"
        [isVisible]="isVisible"
        [activeStep]="activeStep"
        [styleClass]="styleClass"
        [steps]="steps" />
    `,
  }),
};

export default meta;
type Story = StoryObj<StepperDialogStoryWrapperComponent>;

export const Default: Story = {
  args: {
    title: 'Add new note',
    isVisible: true,
    activeStep: 1,
    styleClass: '',
    steps: [
      { value: 1, label: 'Date' },
      { value: 2, label: 'Content' },
      { value: 3, label: 'Review' },
    ],
  },
};

export const SecondStep: Story = {
  args: {
    title: 'Add new note',
    isVisible: true,
    activeStep: 2,
    styleClass: '',
    steps: [
      { value: 1, label: 'Date' },
      { value: 2, label: 'Content' },
      { value: 3, label: 'Review' },
    ],
  },
};

export const TwoStepDialog: Story = {
  args: {
    title: 'Quick note',
    isVisible: true,
    activeStep: 1,
    styleClass: '',
    steps: [
      { value: 1, label: 'Content' },
      { value: 2, label: 'Summary' },
    ],
  },
};

export const Hidden: Story = {
  args: {
    title: 'Hidden dialog',
    isVisible: false,
    activeStep: 1,
    styleClass: '',
    steps: [{ value: 1, label: 'Step 1' }],
  },
};
