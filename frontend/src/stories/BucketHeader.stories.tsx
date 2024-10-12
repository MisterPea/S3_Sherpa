import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BucketHeader from '../components/BucketHeader';

const meta: Meta<typeof BucketHeader> = {
  title: 'Project/Bucket Header',
  component: BucketHeader,
};

export default meta;
type Story = StoryObj<typeof BucketHeader>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div style={{}}>
        <Story />
      </div>
    ),
  ],
};
