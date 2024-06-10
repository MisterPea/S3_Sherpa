import type { Meta, StoryObj } from '@storybook/react';
import BucketNumDisplay from '../components/BucketNumDisplay';

const meta: Meta<typeof BucketNumDisplay> = {
  title: 'Project/Number of Buckets Display',
  component: BucketNumDisplay,
};

export default meta;
type Story = StoryObj<typeof BucketNumDisplay>;

export const Primary: Story = {
  args: {
    numBuckets: 12,
  },
};
