import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';

import { SearchbarComponent } from './searchbar.component';

const meta: Meta<SearchbarComponent> = {
  title: 'Components/Searchbar',
  component: SearchbarComponent,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current value of the search input.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when the input is empty.',
    },
    search: {
      action: 'search',
      description: 'Emitted when the input value changes.',
    },
  },
  render: (args) => ({
    props: { ...args },
    template: `<npn-searchbar ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<SearchbarComponent>;

export const Default: Story = {
  args: {},
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Search documents...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Annual report',
    placeholder: 'Search documents...',
  },
};
