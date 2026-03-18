import type { Meta, StoryObj } from '@storybook/angular';

import { LabelComponent } from './label.component';

const meta: Meta<LabelComponent> = {
  title: 'Shared/Label',
  component: LabelComponent,
  tags: ['autodocs'],
  render: (args: any) => ({
    props: { ...args },
    template: `<npn-label>${args['content'] ?? 'Label'}</npn-label>`,
  }),
  argTypes: {
    content: {
      control: 'text',
      description: 'Projected text content inside the label.',
    },
  },
};

export default meta;
type Story = StoryObj<LabelComponent & { content: string }>;

export const Default: Story = {
  args: {
    content: 'Label',
  },
};

export const LongText: Story = {
  args: {
    content: 'This is a longer label text',
  },
};

export const Empty: Story = {
  args: {
    content: '',
  },
};
