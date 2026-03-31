import type { Meta, StoryObj } from '@storybook/angular';

import { ToolbarComponent } from './toolbar.component';

const meta: Meta<ToolbarComponent> = {
  title: 'Components/Toolbar',
  component: ToolbarComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ToolbarComponent>;

export const Default: Story = {};
