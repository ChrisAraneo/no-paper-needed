import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';

import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Shared/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text displayed inside the button.',
    },
    icon: {
      control: 'text',
      description:
        'PrimeIcons icon class (e.g. `pi pi-check`). Leave empty for no icon.',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position of the icon relative to the label.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.',
    },
    severity: {
      control: 'select',
      options: [
        null,
        'success',
        'info',
        'warn',
        'danger',
        'help',
        'secondary',
        'contrast',
      ],
      description: 'Visual severity / color variant of the button.',
    },
    isRounded: {
      control: 'boolean',
      description: 'Whether the button has fully rounded corners.',
    },
    styleClass: {
      control: 'text',
      description: 'Additional CSS class(es) to apply to the inner button.',
    },
  },
  render: (args) => ({
    props: { ...args },
    template: `<npn-button ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Click me',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Save',
    icon: 'pi pi-check',
    iconPosition: 'right',
  },
};

export const IconOnly: Story = {
  args: {
    label: '',
    icon: 'pi pi-pencil',
    isRounded: true,
    severity: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Cannot click',
    isDisabled: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Confirm',
    icon: 'pi pi-check',
    severity: 'success',
  },
};

export const Danger: Story = {
  args: {
    label: 'Delete',
    icon: 'pi pi-trash',
    severity: 'danger',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Cancel',
    severity: 'secondary',
  },
};

export const Rounded: Story = {
  args: {
    label: 'Rounded',
    isRounded: true,
    severity: 'info',
  },
};

export const IconLeft: Story = {
  args: {
    label: 'Back',
    icon: 'pi pi-arrow-left',
    iconPosition: 'left',
  },
};

