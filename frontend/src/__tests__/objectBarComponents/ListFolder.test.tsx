import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListFolder from '../../components/objectBarComponents/ListFolder';

describe('List Item Folder Component', () => {
  test('renders list item with correct label', () => {
    const { container } = render(<ListFolder mainAction={() => { }} secondaryAction={() => { }} label="List Item Object" menuDisabled={false} />);
    const labelElement = container.querySelector('.list_object_folder-label');
    expect(labelElement).toHaveTextContent('List Item Object');
  });

  test('renders element with appropriate icons', () => {
    render(<ListFolder mainAction={() => { }} secondaryAction={() => { }} label="List Item Object" menuDisabled={false} />);
    const folderIconElement = screen.getByTestId('folder-icon');
    const uploadIconElement = screen.getByTestId('upload-cloud-outline');
    expect(folderIconElement).toBeInTheDocument();
    expect(uploadIconElement).toBeInTheDocument();
  });

  test('calls action when main area clicked', () => {
    const mainMockAction = jest.fn();
    const secondaryMockAction = jest.fn();
    const { container } = render(<ListFolder mainAction={mainMockAction} secondaryAction={secondaryMockAction} label="List Item Object" menuDisabled={false} />);
    const mainButton = container.querySelector('.list_object_folder-button');
    const secondaryButton = container.querySelector('.upload_button');
    fireEvent.click(mainButton!);
    expect(mainMockAction).toHaveBeenCalledTimes(1);
    expect(secondaryMockAction).not.toHaveBeenCalledTimes(1);
    fireEvent.click(secondaryButton!);
    expect(secondaryMockAction).toHaveBeenCalledTimes(1);
    expect(mainMockAction).not.toHaveBeenCalledTimes(2);
  });

  test('secondary action should not be called when clicked and menu is disabled', () => {
    const mainMockAction = jest.fn();
    const secondaryMockAction = jest.fn();
    const { container } = render(<ListFolder mainAction={mainMockAction} secondaryAction={secondaryMockAction} label="List Item Object" menuDisabled />);
    const secondaryButton = container.querySelector('.upload_button');
    fireEvent.click(secondaryButton!);
    expect(secondaryMockAction).not.toHaveBeenCalledTimes(1);
  });
});
