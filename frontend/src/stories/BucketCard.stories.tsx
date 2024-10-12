/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import BucketCard from '../components/BucketCard';

const meta: Meta<typeof BucketCard> = {
  title: 'Project/Bucket Card',
  component: BucketCard,
};

export default meta;
type Story = StoryObj<typeof BucketCard>;

// const callback = (message: string) => console.log(message);

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '350px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'client-portfolio-websites',
    date: "2024-07-04T18:58:28.000Z",
    region: 'ap-northeast-3',
    isPublic: true,
    activeState: false,
  },
};
