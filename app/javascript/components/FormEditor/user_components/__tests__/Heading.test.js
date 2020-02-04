import React from 'react';
import { render } from '@testing-library/react';
import Editor from './Editor';
import Heading from '../Heading';

it('has defaults', () => {
  const { getByTestId } = render(<Heading />, { wrapper: Editor });

  const heading = getByTestId('heading');
  expect(heading.nodeName).toEqual('H1');
  expect(heading.textContent).toEqual('Heading');
  expect(heading.classList).toContain('has-text-left');
});

it('uses specified text', () => {
  const expected = 'This is the test heading text';
  const { getByTestId } = render(<Heading text={expected} />, { wrapper: Editor });

  const heading = getByTestId('heading');
  expect(heading.textContent).toEqual(expected);
});

describe('textAlignment', () => {
  ['left', 'centered', 'right'].forEach((textAlignment) => {
    it(`sets the alignment class for ${textAlignment}`, () => {
      const expected = `has-text-${textAlignment}`;
      const { getByTestId } = render(
        <Heading textAlignment={textAlignment} />,
        { wrapper: Editor },
      );
      const heading = getByTestId('heading');
      expect(heading.classList).toContain(expected);
    });
  });
});

describe('type', () => {
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((type) => {
    it(`supports ${type} element`, () => {
      const { getByTestId } = render(<Heading type={type} />, { wrapper: Editor });
      const heading = getByTestId('heading');
      expect(heading.nodeName).toEqual(type.toUpperCase());
    });
  });
});
