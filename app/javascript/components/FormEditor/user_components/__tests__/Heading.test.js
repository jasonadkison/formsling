import React from 'react';
import { render } from '@testing-library/react';
import { Editor, Frame, Canvas } from '@craftjs/core';
import Heading from '../Heading';

it('has defaults', () => {
  const { getByTestId } = render(
    <Editor>
      <Frame resolver={Heading}>
        <Canvas id="test">
          <Heading />
        </Canvas>
      </Frame>
    </Editor>
  );

  const heading = getByTestId('heading');

  expect(heading.nodeName).toEqual('H1');
  expect(heading.textContent).toEqual('Heading');
  expect(heading.classList).toContain('has-text-left');
});
