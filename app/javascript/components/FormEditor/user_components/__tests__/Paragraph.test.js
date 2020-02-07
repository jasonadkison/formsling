import React from 'react';
import { render } from '@testing-library/react';
import Paragraph from '../Paragraph';
import ParagraphProperties from '../../properties/Paragraph';

jest.mock('../UserComponent', () => ({ children }) => children);

test('it sets the craft related properties', () => {
  expect(Paragraph.craft.related.properties).toEqual(ParagraphProperties);
});

test('renders the specified text', () => {
  const { getByText } = render(<Paragraph text="Hello World!" />);
  getByText(/hello world!/i);
});

describe('text alignments', () => {
  ['left', 'centered', 'right'].forEach((textAlignment) => {
    it(`sets the correct alignment css class for ${textAlignment}`, () => {
      const expected = `has-text-${textAlignment}`;
      const { getByText } = render(<Paragraph text="Yolo" textAlignment={textAlignment} />);
      expect(getByText('Yolo').classList).toContain(expected);
    });
  });
});
