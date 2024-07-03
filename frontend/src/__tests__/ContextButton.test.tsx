import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContextButton from '../components/objectBarComponents/ContextButton';

describe('Context Button Component', () => {
  test('renders Context Button - enabled', () => {
    const { container } = render(<ContextButton action={() => { }} disabled={false} />);
    const buttonElement = container.querySelector('.context_button_ellipsis');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders Context Button - disabled', () => {
    const { container } = render(<ContextButton action={() => { }} disabled />);
    const buttonElement = container.querySelector('.context_button_ellipsis');
    expect(buttonElement).toHaveAttribute('disabled');
  });

  test('Context Button calls action when clicked', () => {
    const mockAction = jest.fn();
    render(<ContextButton action={mockAction} disabled={false} />);
    const buttonElement = screen.getByTestId('context-button-ellipsis');
    fireEvent.click(buttonElement);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test('Context Button does not call action when clicked and disabled', () => {
    const mockAction = jest.fn();
    render(<ContextButton action={mockAction} disabled />);
    const buttonElement = screen.getByTestId('context-button-ellipsis');
    fireEvent.click(buttonElement);
    expect(mockAction).not.toHaveBeenCalled();
  });
});
