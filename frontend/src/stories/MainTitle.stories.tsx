import type { Meta, StoryObj } from '@storybook/react';
import MainTitle from '../components/MainTitle';

const meta: Meta<typeof MainTitle> = {
  title: 'Project/Main Title',
  component: MainTitle,
};

export default meta;
type Story = StoryObj<typeof MainTitle>;

export const Primary: Story = {};
