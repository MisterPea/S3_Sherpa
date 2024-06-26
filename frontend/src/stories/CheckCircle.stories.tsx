import type { Meta, StoryObj } from '@storybook/react';
import CheckCircle from '../components/radioBarComponents/CheckCircle';

const meta: Meta<typeof CheckCircle> = {
  title: 'Project/Radio Bar/Check Circle',
  component: CheckCircle,
};

export default meta;
type Story = StoryObj<typeof CheckCircle>;

export const Checked: Story = {
  args: {
    checked: true,
  },
};
export const NotChecked: Story = {
  args: {
    checked: false,
  },
};
