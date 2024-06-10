import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Button';
// import '../style/main.scss';

const meta: Meta<typeof Button> = {
  title: 'Project/Button',
  component: Button,
  argTypes: {
    type: {
      options: ['primary', 'secondary', 'destructive'],
      control: { type: 'inline-radio' },
    },
    width: {
      options: ['content', 'full'],
      control: { type: 'inline-radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Create Bucket',
    type: 'primary',
    width: 'content',
    plusIcon: true,
    uploadCloud: false,
  },
};

export const Upload: Story = {
  args: {
    label: 'Upload',
    type: 'primary',
    width: 'content',
    plusIcon: false,
    uploadCloud: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Cancel',
    type: 'secondary',
    width: 'content',
    plusIcon: false,
    uploadCloud: false,
  },
};

export const Destructive: Story = {
  args: {
    label: 'Delete Bucket',
    type: 'destructive',
    width: 'content',
    plusIcon: false,
    uploadCloud: false,
  },

};