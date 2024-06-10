import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShortcutButton from '../components/ShortcutButton';

describe('Shortcut Button', () => {
  test('renders with the correct icon and label (delete)', () => {
    render(<ShortcutButton buttonType="delete" action={() => { }} />);
    const iconElement = screen.getByTestId('delete-icon');
    expect(iconElement).toBeInTheDocument();
    const buttonElement = screen.getByText('DELETE');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with the correct icon and label (download)', () => {
    render(<ShortcutButton buttonType="download" action={() => { }} />);
    const iconElement = screen.getByTestId('download-icon');
    expect(iconElement).toBeInTheDocument();
    const buttonElement = screen.getByText('DOWNLOAD');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with the correct icon and label (into folder)', () => {
    render(<ShortcutButton buttonType="intoFolder" action={() => { }} />);
    const iconElement = screen.getByTestId('into-folder-icon');
    expect(iconElement).toBeInTheDocument();
    const buttonElement = screen.getByText('INTO FOLDER');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with the correct icon and label (new folder)', () => {
    render(<ShortcutButton buttonType="newFolder" action={() => { }} />);
    const iconElement = screen.getByTestId('new-folder-icon');
    expect(iconElement).toBeInTheDocument();
    const buttonElement = screen.getByText('NEW FOLDER');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders with the correct icon and label (storage class)', () => {
    render(<ShortcutButton buttonType="storageClass" action={() => { }} />);
    const iconElement = screen.getByTestId('storage-class-icon');
    expect(iconElement).toBeInTheDocument();
    const buttonElement = screen.getByText('STORAGE CLASS');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls action when clicked', () => {
    const mockAction = jest.fn();
    const { container } = render(<ShortcutButton buttonType="delete" action={mockAction} />);
    const shortcutButton = container.querySelector('.shortcut_btn');
    expect(shortcutButton).toBeInTheDocument();
    if (shortcutButton) fireEvent.click(shortcutButton);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
