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
  const options = [
    { id: 0, name: 'Placeholder', value: '' },
    { id: 1, name: 'One', value: '1' },
    { id: 2, name: 'Two', value: '2' },
    { id: 3, name: 'Three', value: '3' }
  ];
  const { getByText } = render(<Dropdown name="Test Field" options={options} />);
  options.forEach((option) => {
    const el = getByText(option.name);
    expect(el.nodeName).toMatch(/option/i)
    expect(el).toHaveValue(option.value)
  });
})

test('it can have a selected value', () => {
  const options = [
    { id: 1, name: 'One', value: '1' },
    { id: 2, name: 'Two', value: '2', selected: true },
    { id: 3, name: 'Three', value: '3' }
  ];
  const { getByLabelText } = render(<Dropdown name="Test Field" options={options} initialValue="Two" />);
  const field = getByLabelText(/test field/i)
  expect(field).toHaveValue('2')
});

test('it renders the first option as a placeholder', () => {
  const options = [
    { id: 1, name: 'The Placeholder', value: '1' },
    { id: 2, name: 'Two', value: '2', selected: true },
    { id: 3, name: 'Three', value: '3' }
  ];
  const { getByLabelText, getByText } = render(<Dropdown name="Test Field" options={options} />)
  const select = getByLabelText(/test field/i)
  const option = getByText(/the placeholder/i)
  expect(option.nodeName).toMatch(/option/i)
  expect(option).toHaveValue('')
});
