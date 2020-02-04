import React from 'react';
import { Editor, Frame, Canvas } from '@craftjs/core';

export default ({ resolver, children }) => (
  <Editor>
    <Frame resolver={resolver}>
      <Canvas>
        {children}
      </Canvas>
    </Frame>
  </Editor>
);
