import type { Meta, StoryObj } from '@storybook/react';
import BucketModal from '../components/BucketModal';

const meta: Meta<typeof BucketModal> = {
  title: 'Project/Bucket Modal',
  component: BucketModal,
};

export default meta;
type Story = StoryObj<typeof BucketModal>;

export const Primary: Story = {
  args: {
    isDeletable: true,
  },
};
