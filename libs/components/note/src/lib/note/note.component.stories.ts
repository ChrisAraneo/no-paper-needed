import type { Meta, StoryObj } from '@storybook/angular';

import { NoteComponent } from './note.component';

const meta: Meta<NoteComponent> = {
  title: 'Components/Note',
  component: NoteComponent,
  tags: ['autodocs'],
  argTypes: {
    note: {
      control: 'object',
      description: 'The Note object to display.',
    },
    showEditButton: {
      control: 'boolean',
      description: 'Whether to show the edit button.',
    },
  },
};

export default meta;
type Story = StoryObj<NoteComponent>;

export const Default: Story = {
  args: {
    note: {
      id: '1',
      date: new Date('2026-03-28'),
      content: 'Buy groceries',
      reminderDaysBefore: 0,
    },
    showEditButton: false,
  },
};

export const WithEditButton: Story = {
  args: {
    note: {
      id: '2',
      date: new Date('2026-04-01'),
      content: 'Doctor appointment',
      reminderDaysBefore: 1,
    },
    showEditButton: true,
  },
};

export const WithReminder: Story = {
  args: {
    note: {
      id: '3',
      date: new Date('2026-05-10'),
      content: 'Pay rent',
      reminderDaysBefore: 3,
    },
    showEditButton: false,
  },
};

export const WithRecurrence: Story = {
  args: {
    note: {
      id: '4',
      date: new Date('2026-06-15'),
      content: 'Water the plants',
      reminderDaysBefore: 0,
      recurrence: { days: 7, months: 0, years: 0 },
    },
    showEditButton: false,
  },
};

export const WithReminderAndRecurrence: Story = {
  args: {
    note: {
      id: '5',
      date: new Date('2026-12-25'),
      content: 'Christmas dinner preparation',
      reminderDaysBefore: 5,
      recurrence: { days: 0, months: 0, years: 1 },
    },
    showEditButton: true,
  },
};

export const LongContent: Story = {
  args: {
    note: {
      id: '6',
      date: new Date('2026-07-01'),
      content:
        'This is a much longer note content to see how the component handles overflow and text wrapping within the card.',
      reminderDaysBefore: 0,
    },
    showEditButton: false,
  },
};

export const MonthlyRecurrence: Story = {
  args: {
    note: {
      id: '7',
      date: new Date('2026-08-01'),
      content: 'Monthly report',
      reminderDaysBefore: 1,
      recurrence: { days: 0, months: 1, years: 0 },
    },
    showEditButton: true,
  },
};
