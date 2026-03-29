import type { Meta, StoryObj } from '@storybook/angular';

import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  title: 'Shared/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FooterComponent>;

export const Default: Story = {};
