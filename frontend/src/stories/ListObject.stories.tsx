/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import ListObject from '../components/objectBarComponents/ListObject';

const meta: Meta<typeof ListObject> = {
  title: 'Project/Object Bar/List Object',
  component: ListObject,
};

export default meta;
type Story = StoryObj<typeof ListObject>;

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
    label: 'useAnimation.ts',
    isSelected: false,
    menuDisabled: false,
    storageClass: 'Standard',
    isFinal: true,
    mainAction: () => callback('main callback called'),
    secondaryAction: () => callback('secondary callback called'),
  },
};
