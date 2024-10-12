/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import ListFolder from '../components/objectBarComponents/ListFolder';

const meta: Meta<typeof ListFolder> = {
  title: 'Project/Object Bar/List Folder',
  component: ListFolder,
};

export default meta;
type Story = StoryObj<typeof ListFolder>;

const callback = (message: string) => console.log(message);

export const Primary: Story = {
  decorators: [
    (Story) => (
      <div style={{ margin: '1em ', marginRight: '2.5em' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'shell scrips',
    menuDisabled: false,
    isFinal: true,
    mainAction: () => callback('main callback called'),
    secondaryAction: () => callback('secondary callback called'),
  },
};
