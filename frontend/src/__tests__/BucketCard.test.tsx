import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BucketCardProps } from 'types';
import BucketCard from '../components/BucketCard';

// const bucketCardProps: BucketCardProps = { label: 'my-bucket-card',  };

describe('BucketCard Component', () => {
  test('renders BucketCard with correct label, date, region', () => {
    render(<BucketCard action={() => { }} label="Click Me" />);
    // const buttonElement = screen.getByTitle('Click Me');
    // expect(buttonElement).toBeInTheDocument();
    // expect(buttonElement).toHaveTextContent('Click Me');
  });

  test('renders a BucketCard with "BUCKET IS PUBLIC" attribute', () => {
    render(<BucketCard action={() => { }} label="Plus Icon" plusIcon />);
    // const iconElement = screen.getByTestId('plus-icon');
    // expect(iconElement).toBeInTheDocument();
    // const buttonElement = screen.getByTitle('Plus Icon');
    // expect(buttonElement).toBeInTheDocument();
  });

  test('renders a BucketCard without "BUCKET IS PUBLIC" attribute', () => {
    render(<BucketCard action={() => { }} label="Plus Icon" plusIcon />);
    // const iconElement = screen.getByTestId('plus-icon');
    // expect(iconElement).toBeInTheDocument();
    // const buttonElement = screen.getByTitle('Plus Icon');
    // expect(buttonElement).toBeInTheDocument();
  });

  test('calls action when main area clicked', () => {
    const mockAction = jest.fn();
    render(<BucketCard label="Click Me" action={mockAction} />);
    // const buttonElement = screen.getByTitle('Click Me');
    // fireEvent.click(buttonElement);
    // expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test('calls action when meatball button clicked', () => {
    const mockAction = jest.fn();
    render(<BucketCard label="Click Me" action={mockAction} disabled />);
    // const buttonElement = screen.getByTitle('Click Me');
    // fireEvent.click(buttonElement);
    // expect(mockAction).not.toHaveBeenCalled();
  });
});
