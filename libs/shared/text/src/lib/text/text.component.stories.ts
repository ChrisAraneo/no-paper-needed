import type { Meta, StoryObj } from '@storybook/angular';

import { TextComponent } from './text.component';

const meta: Meta<TextComponent> = {
  title: 'Shared/Text',
  component: TextComponent,
  tags: ['autodocs'],
  render: (args: any) => ({
    props: { ...args },
    template: `<npn-text>${args['content'] ?? 'Sample text'}</npn-text>`,
  }),
  argTypes: {
    content: {
      control: 'text',
      description: 'Projected text content inside the component.',
    },
  },
};

export default meta;
type Story = StoryObj<TextComponent & { content: string }>;

export const Default: Story = {
  args: {
    content: 'Sample text',
  },
};

export const LongText: Story = {
  args: {
    content:
      'This is a longer paragraph of text to demonstrate how the component handles more content.',
  },
};

export const Empty: Story = {
  args: {
    content: '',
  },
};
