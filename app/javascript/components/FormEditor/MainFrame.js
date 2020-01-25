import React, { useEffect } from 'react';
import { Frame, Canvas, useEditor } from "@craftjs/core";
import { decompress } from '../utils';

import Text from './user_components/Text';

const MainFrame = ({ payload }) => {
  const { actions } = useEditor();

  // Here we listen for changes to the payload and send them to the editor. Craft.js
  // only loads nodes for the initial render. You must manually use the deserialize method
  // to update the editor's node tree.
  useEffect(() => {
    if (payload) {
      const nextPayload = decompress(payload);
      actions.deserialize(nextPayload);
      if (process.env.NODE_ENV === 'development') {
        console.log(JSON.parse(nextPayload));
      }
    }
  }, [payload]);

  return (
    <Frame json={payload ? decompress(payload) : undefined}>
      <Canvas id="root-canvas">
        <Text name="First Name" />
        <Text name="Last Name" />
      </Canvas>
    </Frame>
  );
};

export default MainFrame;
