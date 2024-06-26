import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckCircle from '../components/radioBarComponents/CheckCircle';

describe('Check Circle Component', () => {
  test('renders a checkmark when checked is true', () => {
    render(<CheckCircle checked />);
    const buttonElement = screen.getAllByTestId('circle-check-icon');
    expect(buttonElement[0]).toBeInTheDocument();
  });
  test('renders a checkmark when and registers a button click', () => {
    const mockAction = jest.fn();
    const { container } = render(<CheckCircle action={mockAction} checked={false} />);
    const buttonElement = container.querySelector('.checked_circle');
    fireEvent.click(buttonElement!);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
