import type { Meta, StoryObj } from '@storybook/react';
import UploadButton from '../components/objectBarComponents/UploadButton';

const meta: Meta<typeof UploadButton> = {
  title: 'Project/Object Bar/Upload Button',
  component: UploadButton,
};

export default meta;
type Story = StoryObj<typeof UploadButton>;

export const Primary: Story = {
  args: {
    disabled: false,
    action: () => { },
  },
};
