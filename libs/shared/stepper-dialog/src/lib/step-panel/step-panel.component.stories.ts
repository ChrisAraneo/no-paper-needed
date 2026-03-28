import type { Meta, StoryObj } from '@storybook/angular';

import { StepPanelComponent } from './step-panel.component';

const meta: Meta<StepPanelComponent> = {
  title: 'Shared/StepPanel',
  component: StepPanelComponent,
  tags: ['autodocs'],
  argTypes: {
    actions: {
      control: 'object',
      description:
        'Array of action buttons displayed at the bottom of the step panel.',
    },
  },
  render: (args) => ({
    props: { ...args },
    template: `
      <npn-step-panel [actions]="actions">
        <p>This is the step panel content area.</p>
      </npn-step-panel>
    `,
  }),
};

export default meta;
type Story = StoryObj<StepPanelComponent>;

export const Default: Story = {
  args: {
    actions: [],
  },
};

export const WithOneAction: Story = {
  args: {
    actions: [
      {
        label: 'Next',
        icon: 'pi pi-arrow-right',
        iconPos: 'right',
        onClick: () => {},
      },
    ],
  },
};

export const WithTwoActions: Story = {
  args: {
    actions: [
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
    ],
  },
};

export const WithDisabledAction: Story = {
  args: {
    actions: [
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
        disabled: true,
        onClick: () => {},
      },
    ],
  },
};

export const WithSaveAction: Story = {
  args: {
    actions: [
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
    ],
  },
};
