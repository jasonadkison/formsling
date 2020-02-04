import React from 'react';
import { render } from '@testing-library/react';
import Editor from './Editor';
import Paragraph from '../Paragraph';

it('has defaults', () => {
  const { getByTestId } = render(<Editor resolver={Paragraph}><Paragraph /></Editor>);
  const p = getByTestId('paragraph');
  expect(p.nodeName).toEqual('P');
  expect(p.textContent).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  expect(p.classList).toContain('has-text-left');
});

it('uses specified text', () => {
  const expected = 'This is the test paragraph text';
  const { getByTestId } = render(
    <Editor resolver={Paragraph}><Paragraph text={expected} /></Editor>
  );

  const paragraph = getByTestId('paragraph');
  expect(paragraph.textContent).toEqual(expected);
});

describe('textAlignment', () => {
  ['left', 'centered', 'right'].forEach((textAlignment) => {
    it(`sets the alignment class for ${textAlignment}`, () => {
      const expected = `has-text-${textAlignment}`;
      const { getByTestId } = render(
        <Editor resolver={Paragraph}><Paragraph textAlignment={textAlignment} /></Editor>
      );
      const paragraph = getByTestId('paragraph');
      expect(paragraph.classList).toContain(expected);
    });
  });
});
