import React from 'react';
import { render } from '@testing-library/react';
import Date from '../Date';

jest.mock('../UserComponent', () => ({ children }) => children);
jest.mock('@craftjs/core', () => ({ useNode: () => ({ id: 'test-node-id' }) }));

test('it renders a date input', () => {
  const { getByLabelText } = render(<Date name="Date Field" />);
  const input = getByLabelText(/date field/i);
  expect(input).toHaveAttribute('type', 'date')
})

test('it has a placeholder', () => {
  const { getByLabelText } = render(<Date name="Date Field" />);
  const input = getByLabelText(/date field/i);
  expect(input).toHaveAttribute('placeholder', 'yyyy-mm-dd')
})

test('it is required by default', () => {
  const { getByLabelText, getByText } = render(<Date name="Date Field" />);
  const input = getByLabelText(/date field/i);
  expect(input).toHaveAttribute('required')
  getByText(/required/i)
})

test('it can be a required field', () => {
  const { getByLabelText, getByText } = render(<Date required name="Date Field" />);
  const input = getByLabelText(/date field/i);
  expect(input).toHaveAttribute('required')
  getByText(/required/i)
})

test('it can be an optional field', () => {
  const { getByLabelText } = render(<Date required={false} name="Date Field" />);
  const input = getByLabelText(/date field/i);
  expect(input).not.toHaveAttribute('required')
})

test('it is readOnly', () => {
  const { getByLabelText } = render(<Date name="Date Field" />);
  const input = getByLabelText(/date field/i);
  expect(input).toHaveAttribute('readOnly')
})

test('it can accept an initial value', () => {
  const initialValue = '2020-01-15'
  const { getByLabelText } = render(<Date initialValue={initialValue} name="Date Field" />);
  const input = getByLabelText(/date field/i);
  expect(input).toHaveValue(initialValue)
})

test('can render help text', () => {
  const { queryByTestId, rerender } = render(<Date />);
  expect(queryByTestId('help')).toBeNull();
  rerender(<Date helpText="Helpful text" />);
  expect(queryByTestId('help')).toHaveTextContent(/helpful text/i)
});
