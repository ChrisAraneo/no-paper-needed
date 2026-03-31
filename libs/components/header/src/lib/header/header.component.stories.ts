import type { Meta, StoryObj } from '@storybook/angular';

import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  title: 'Components/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xl', 'lg', 'md'],
      description: 'Size variant of the header text.',
    },
    element: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML heading element to render.',
    },
  },
  render: (args) => ({
    props: { ...args },
    template: `<npn-header [size]="size" [element]="element">Sample Header Text</npn-header>`,
  }),
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    size: 'lg',
    element: 'h1',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    element: 'h1',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    element: 'h1',
  },
};

export const AsH2: Story = {
  args: {
    size: 'lg',
    element: 'h2',
  },
};

export const AsH3: Story = {
  args: {
    size: 'lg',
    element: 'h3',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <npn-header size="xl" element="h1">Extra Large Header</npn-header>
      <br />
      <npn-header size="lg" element="h2">Large Header</npn-header>
      <br />
      <npn-header size="md" element="h3">Medium Header</npn-header>
    `,
  }),
};
