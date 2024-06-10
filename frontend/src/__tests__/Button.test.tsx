import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/Button';

describe('Button Component', () => {
  test('renders button with correct label', () => {
    render(<Button action={() => { }} label="Click Me" />);
    const buttonElement = screen.getByTitle('Click Me');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  test('renders a button with a plus icon', () => {
    render(<Button action={() => { }} label="Plus Icon" plusIcon />);
    const iconElement = screen.getByTestId('plus-icon');
    expect(iconElement).toBeInTheDocument();
    const buttonElement = screen.getByTitle('Plus Icon');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders a button with a upload icon', () => {
    render(<Button action={() => { }} label="Upload Icon" uploadCloud />);
    const iconElement = screen.getByTestId('upload-cloud');
    expect(iconElement).toBeInTheDocument();
    const buttonElement = screen.getByTitle('Upload Icon');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls action when clicked if not disabled', () => {
    const mockAction = jest.fn();
    render(<Button label="Click Me" action={mockAction} />);
    const buttonElement = screen.getByTitle('Click Me');
    fireEvent.click(buttonElement);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test('does not call action when clicked if disabled', () => {
    const mockAction = jest.fn();
    render(<Button label="Click Me" action={mockAction} disabled />);
    const buttonElement = screen.getByTitle('Click Me');
    fireEvent.click(buttonElement);
    expect(mockAction).not.toHaveBeenCalled();
  });
});
