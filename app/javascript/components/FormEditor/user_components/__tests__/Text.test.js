import React from 'react';
import { render } from '@testing-library/react';
import Editor from './Editor';
import Text from '../Text';

it('uses defaults', () => {
  const { getByLabelText, getByTestId } = render(<Text />, { wrapper: Editor });
  const label = getByTestId('label');
  const input = getByLabelText(/Field Name/);

  expect(input.type).toEqual('text');
  expect(input.required).toBeTruthy();
  expect(label.textContent).toMatch(/required/i)
});

describe('types', () => {
  ['text', 'number', 'email', 'url'].forEach((type) => {
    it(`supports ${type} input`, () => {
      const { getByTestId } = render(<Text type={type} />, { wrapper: Editor });
      const field = getByTestId('field');
      expect(field.type).toEqual(type);
    });
  });
});

it('renders the help text', () => {
  const { getByText } = render(<Text helpText="test-help-text" />, { wrapper: Editor });
  const el = getByText('test-help-text');
  expect(el.classList).toContain('help');
});

describe('input field', () => {
  it('renders correctly', () => {
    const props = {
      type: 'text',
      name: 'Test Field',
      initialValue: 'test-value',
      placeholder: 'test-placeholder',
      rows: 1,
      required: true,
    };

    const { getByTestId } = render(<Text {...props} />, { wrapper: Editor });

    const label = getByTestId('label');
    const field = getByTestId('field');

    expect(field.id).toEqual(label.htmlFor);
    expect(field.type).toEqual('text');
    expect(field.classList).toContain('input');
    expect(field.value).toEqual('test-value');
    expect(field.placeholder).toEqual('test-placeholder');
    expect(field.readOnly).toBeTruthy();
    expect(field.required).toBeTruthy();
  });

  it('can be required', () => {
    const { getByTestId } = render(<Text required />, { wrapper: Editor });
    expect(getByTestId('field').required).toBeTruthy();
  });

  it('can be optional', () => {
    const { getByTestId } = render(<Text required={false} />, { wrapper: Editor });
    expect(getByTestId('field').required).toBeFalsy();
  });
});

describe('textarea field', () => {
  it('renders correctly', () => {
    const props = {
      type: 'text',
      name: 'Test Field',
      initialValue: 'test-value',
      placeholder: 'test-placeholder',
      rows: 3,
      required: true,
    }

    const { getByTestId } = render(<Text {...props} />, { wrapper: Editor });

    const label = getByTestId('label');
    const field = getByTestId('field');

    expect(field.id).toEqual(label.htmlFor);
    expect(field.type).toEqual('textarea');
    expect(field.classList).toContain('textarea');
    expect(field.rows).toEqual(3);
    expect(field.value).toEqual('test-value');
    expect(field.placeholder).toEqual('test-placeholder');
    expect(field.readOnly).toBeTruthy();
    expect(field.required).toBeTruthy();
  });

  it('can be required', () => {
    const { getByTestId } = render(<Text rows={3} required />, { wrapper: Editor });
    expect(getByTestId('field').required).toBeTruthy();
  });

  it('can be optional', () => {
    const { getByTestId } = render(<Text rows={3} required={false} />, { wrapper: Editor });
    expect(getByTestId('field').required).toBeFalsy();
  });
});
