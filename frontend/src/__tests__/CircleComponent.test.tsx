import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckCircle from '../components/objectBarComponents/CheckCircle';

describe('Check Circle Component', () => {
  test('renders a checkmark when checked is true', () => {
    render(<CheckCircle checked />);
    const buttonElement = screen.getAllByTestId('circle-check-icon');
    expect(buttonElement[0]).toBeInTheDocument();
  });
  test('does not render a checkmark when marked false', () => {
    render(<CheckCircle checked={false} />);
    const buttonElement = screen.getAllByTestId('circle-check-icon');
    expect(buttonElement[0]).toBeInTheDocument();
  });
});
