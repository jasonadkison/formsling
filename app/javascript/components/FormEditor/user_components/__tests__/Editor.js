import React from 'react';
import { Editor, Frame, Canvas } from '@craftjs/core';
import resolvers from '../../resolvers';

export default ({ children }) => (
  <Editor>
    <Frame resolver={resolvers}>
      <Canvas>
        {children}
      </Canvas>
    </Frame>
  </Editor>
);
