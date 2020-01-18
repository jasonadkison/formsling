import React from 'react';
import {Editor, Frame, Canvas} from "@craftjs/core";

import { decompress } from './FormEditor/Header';
import Text from './PublicForm/Text';
import Dropdown from './PublicForm/Dropdown';
import Columns from './PublicForm/Columns';

const PublicForm = ({ form }) => {
  const { payload } = form;
  return (
    <form>
      <Editor resolver={{ Text, Dropdown, Columns }} enabled={false}>
        <Frame json={decompress(payload)}>
          <Canvas />
        </Frame>
      </Editor>
    </form>
  );
};

export default PublicForm;
