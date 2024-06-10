import type { Meta, StoryObj } from '@storybook/react';
import ShortcutButton from '../components/ShortcutButton';
// import '../style/main.scss';

const meta: Meta<typeof ShortcutButton> = {
  title: 'Project/ShortcutButton',
  component: ShortcutButton,
  argTypes: {
    buttonType: {
      options: ['delete', 'newFolder', 'intoFolder', 'storageClass', 'download'],
      control: { type: 'inline-radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShortcutButton>;

export const Delete: Story = {
  args: {
    buttonType: 'delete',
  },
};

export const Download: Story = {
  args: {
    buttonType: 'download',
  },
};

export const IntoFolder: Story = {
  args: {
    buttonType: 'intoFolder',
  },
};

export const NewFolder: Story = {
  args: {
    buttonType: 'newFolder',
  },
};

export const StorageClass: Story = {
  args: {
    buttonType: 'storageClass',
  },
};