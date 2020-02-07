import React from 'react';
import { render } from '@testing-library/react';
import Text from '../Text';
import TextProperties from '../../properties/Text';

jest.mock('../UserComponent', () => ({ children }) => children);
jest.mock('@craftjs/core', () => ({ useNode: () => ({ id: 'test-node-id' }) }));

test('it sets the craft related properties', () => {
  expect(Text.craft.related.properties).toEqual(TextProperties);
});

test('renders a text input by default', () => {
  const { getByLabelText } = render(<Text name="Test Field" />);
  const input = getByLabelText(/test field/i);
  expect(input).toHaveAttribute('type', 'text')
});

describe('the different input types', () => {
  ['text', 'number', 'email', 'url'].forEach((type) => {
    test(`can render an input with type ${type}`, () => {
      const { getByLabelText } = render(<Text type={type} name="Test Field" />);
      expect(getByLabelText(/test field/i)).toHaveAttribute('type', type);
    });
  });
});

test('can render help text', () => {
  const { queryByTestId, rerender } = render(<Text />);
  expect(queryByTestId('help')).toBeNull();
  rerender(<Text helpText="Hello world" />);
  expect(queryByTestId('help')).toHaveTextContent(/hello world/i)
});

test('can render an optional field', () => {
  const { queryByText, getByLabelText } = render(<Text required={false} name="Test Field" />);
  const requiredText = queryByText(/required/);
  const field = getByLabelText(/test field/i);
  expect(requiredText).toBeNull();
  expect(field).not.toHaveAttribute('required');
})

test('can render a required field', () => {
  const { getByText, getByLabelText } = render(<Text required name="Test Field" />);
  const requiredText = getByText(/required/); // will error when it does not exist
  const field = getByLabelText(/test field/i);
  expect(field).toHaveAttribute('required');
});

describe('input field', () => {
  test('renders correctly', () => {
    const props = {
      name: 'Test Field',
      initialValue: 'test-value',
      placeholder: 'test-placeholder',
      required: true,
    };

    const { getByLabelText } = render(<Text {...props} />);
    const field = getByLabelText(/test field/i);

    expect(field.classList).toContain('input');
    expect(field).toHaveAttribute('value', 'test-value');
    expect(field).toHaveAttribute('placeholder', 'test-placeholder');
    expect(field).toHaveAttribute('readOnly');
    expect(field).toHaveAttribute('required');
  });
});

describe('textarea field', () => {
  test('renders correctly', () => {
    const props = {
      name: 'Test Field',
      initialValue: 'test-value',
      placeholder: 'test-placeholder',
      rows: 3,
      required: true,
    }

    const { getByLabelText } = render(<Text {...props} />);
    const field = getByLabelText(/test field/i);

    expect(field.nodeName).toMatch(/textarea/i);
    expect(field.classList).toContain('textarea');
    expect(field).toHaveAttribute('rows', '3');
    expect(field).toHaveTextContent('value', 'test-value');
    expect(field).toHaveAttribute('placeholder', 'test-placeholder');
    expect(field).toHaveAttribute('readOnly');
    expect(field).toHaveAttribute('required');
  });

  test('renders as an input when type is not text', () => {
    const { getByLabelText } = render(<Text name="Test Field" rows={3} type="email" />);
    const field = getByLabelText(/test field/i);
    expect(field.nodeName).toMatch(/input/i);
  });

});
