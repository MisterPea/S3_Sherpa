import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../components/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Project/Search Bar',
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '350px', backgroundColor: 'tan' }}>
        <Story />
      </div>
    ),
  ],
  // args: {
  //   label: 'client-portfolio-websites',
  //   date: new Date('2024-02-23 23:46:01'),
  //   region: 'ap-northeast-3',
  //   isPublic: true,
  //   activeState: false,
  // },
};
