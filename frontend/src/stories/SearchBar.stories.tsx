import type { Meta, StoryObj } from '@storybook/react';
import SearchBar from '../components/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Project/Search Bar',
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Primary: Story = {};
