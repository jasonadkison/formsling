import React from 'react';
import { render } from '@testing-library/react';
import Heading from '../Heading';
import HeadingProperties from '../../properties/Heading';

jest.mock('../UserComponent', () => ({ children }) => children);

test('it sets the craft related properties', () => {
  expect(Heading.craft.related.properties).toEqual(HeadingProperties);
});

it('renders the specified text', () => {
  const { getByText } = render(<Heading text="Hello World" />);
  getByText('Hello World');
});

['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((type) => {
  test(`can be a heading of type ${type}`, () => {
    const { getByText } = render(<Heading text="Hello World" type={type} />);
    expect(getByText(/hello world/i).nodeName).toMatch(new RegExp(type, 'i'));
  });
});

describe('text alignments', () => {
  ['left', 'centered', 'right'].forEach((textAlignment) => {
    it(`sets the correct alignment css class for ${textAlignment}`, () => {
      const expected = `has-text-${textAlignment}`;
      const { getByText } = render(<Heading text="Yolo" textAlignment={textAlignment} />);
      expect(getByText('Yolo').classList).toContain(expected);
    });
  });
});
