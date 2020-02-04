import React from 'react';
import { render } from '@testing-library/react';
import TestEditor from './TestEditor';
import Paragraph from 'components/FormEditor/user_components/Paragraph';

it('has defaults', () => {
  const { getByTestId } = render(<Paragraph />, { wrapper: TestEditor });
  const p = getByTestId('paragraph');
  expect(p.nodeName).toEqual('P');
  expect(p.textContent).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  expect(p.classList).toContain('has-text-left');
});

it('uses specified text', () => {
  const expected = 'This is the test paragraph text';
  const { getByTestId } = render(<Paragraph text={expected} />, { wrapper: TestEditor });

  const paragraph = getByTestId('paragraph');
  expect(paragraph.textContent).toEqual(expected);
});

describe('textAlignment', () => {
  ['left', 'centered', 'right'].forEach((textAlignment) => {
    it(`sets the alignment class for ${textAlignment}`, () => {
      const expected = `has-text-${textAlignment}`;
      const { getByTestId } = render(
        <Paragraph textAlignment={textAlignment} />,
        { wrapper: TestEditor },
      );
      const paragraph = getByTestId('paragraph');
      expect(paragraph.classList).toContain(expected);
    });
  });
});
