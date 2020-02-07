import React from 'react';
import { render } from '@testing-library/react';
import Dropdown from '../Dropdown';
import DropdownProperties from '../../properties/Dropdown';

jest.mock('../UserComponent', () => ({ children }) => children);
jest.mock('@craftjs/core', () => ({ useNode: () => ({ id: 'test-node-id' }) }));

test('it sets the craft related properties', () => {
  expect(Dropdown.craft.related.properties).toEqual(DropdownProperties);
});

test('it renders a select field', () => {
  const { getByLabelText } = render(<Dropdown name="Test Field" />);
  const field = getByLabelText(/test field/i)
  expect(field.nodeName).toMatch(/select/i)
})

test('it renders a readOnly select', () => {
  const { getByLabelText } = render(<Dropdown name="Test Field" />);
  const field = getByLabelText(/test field/i)
  expect(field).toHaveAttribute('readOnly')
})

test('it can render help text', () => {
  const { queryByTestId, rerender } = render(<Dropdown />);
  expect(queryByTestId('help')).toBeNull();
  rerender(<Dropdown helpText="Hello world" />);
  expect(queryByTestId('help')).toHaveTextContent(/hello world/i)
});

test('it can render an optional field', () => {
  const { queryByText, getByLabelText } = render(<Dropdown required={false} name="Test Field" />);
  const requiredText = queryByText(/required/);
  const field = getByLabelText(/test field/i);
  expect(requiredText).toBeNull();
  expect(field).not.toHaveAttribute('required');
})

test('it can render a required field', () => {
  const { getByText, getByLabelText, debug } = render(<Dropdown required name="Test Field" />);
  getByText(/required/); // will error when it does not exist
  const field = getByLabelText(/test field/i);
  expect(field).toHaveAttribute('required');
});

test('it renders the specified options', () => {
  const options = ['One', 'Two', 'Three'];
  const { getByLabelText, getByText, debug } = render(<Dropdown name="Test Field" options={options} />);
  const field = getByLabelText(/test field/i)
  options.forEach((option) => {
    const el = getByText(option);
    expect(el.nodeName).toMatch(/option/i)
    expect(el).toHaveValue(option)
  });
})

test('it renders the placeholder as a disabled option', () => {
  const { getByLabelText, getByText } = render(<Dropdown name="Test Field" placeholder="The Placeholder" />)
  const select = getByLabelText(/test field/i)
  const option = getByText(/the placeholder/i)
  expect(option.nodeName).toMatch(/option/i)
  expect(option).toHaveAttribute('disabled')
});
