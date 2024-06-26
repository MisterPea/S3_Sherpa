import type { Meta, StoryObj } from '@storybook/react';
import ContextButton from '../components/ContextButton';

const meta: Meta<typeof ContextButton> = {
  title: 'Project/Object Bar/Context Button',
  component: ContextButton,
};

export default meta;
type Story = StoryObj<typeof ContextButton>;

export const Primary: Story = {
  args: {
    disabled: false,
    action: () => { }
  },
};
