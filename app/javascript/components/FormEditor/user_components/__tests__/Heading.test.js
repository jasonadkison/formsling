import React from 'react';
import { render } from '@testing-library/react';
import { Editor, Frame, Canvas } from '@craftjs/core';
import Heading from '../Heading';

const TestEditor = ({ children }) => (
  <Editor>
    <Frame resolver={Heading}>
      <Canvas>
        {children}
      </Canvas>
    </Frame>
  </Editor>
);

it('has defaults', () => {
  const { getByTestId } = render(<TestEditor><Heading /></TestEditor>);

  const heading = getByTestId('heading');
  expect(heading.nodeName).toEqual('H1');
  expect(heading.textContent).toEqual('Heading');
  expect(heading.classList).toContain('has-text-left');
});

it('uses specified text', () => {
  const expected = 'This is the test heading text';
  const { getByTestId } = render(<TestEditor><Heading text={expected} /></TestEditor>);

  const heading = getByTestId('heading');
  expect(heading.textContent).toEqual(expected);
});

describe('textAlignment', () => {
  ['left', 'centered', 'right'].forEach((textAlignment) => {
    it(`sets the alignment class for ${textAlignment}`, () => {
      const expected = `has-text-${textAlignment}`;
      const { getByTestId } = render(
        <TestEditor><Heading textAlignment={textAlignment} /></TestEditor>
      );
      const heading = getByTestId('heading');
      expect(heading.classList).toContain(expected);
    });
  });
});
