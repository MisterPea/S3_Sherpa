import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UploadButton from '../components/objectBarComponents/UploadButton';

describe('Upload Button Component', () => {
  test('renders Upload Button - enabled', () => {
    const { container } = render(<UploadButton action={() => { }} disabled={false} />);
    const buttonElement = container.querySelector('.upload_button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders Upload Button - disabled', () => {
    const { container } = render(<UploadButton action={() => { }} disabled />);
    const buttonElement = container.querySelector('.upload_button');
    expect(buttonElement).toHaveAttribute('disabled');
  });

  test('Upload Button calls action when clicked', () => {
    const mockAction = jest.fn();
    render(<UploadButton action={mockAction} disabled={false} />);
    const buttonElement = screen.getByTestId('upload-button');
    fireEvent.click(buttonElement);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test('Upload Button does not call action when clicked and disabled', () => {
    const mockAction = jest.fn();
    render(<UploadButton action={mockAction} disabled />);
    const buttonElement = screen.getByTestId('upload-button');
    fireEvent.click(buttonElement);
    expect(mockAction).not.toHaveBeenCalled();
  });
});
