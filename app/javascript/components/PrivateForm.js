import React from 'react';
import {Editor, Frame, Canvas} from "@craftjs/core";

import { decompress } from './utils';
import Text from './PrivateForm/Text';
import Dropdown from './PrivateForm/Dropdown';
import Columns from './PrivateForm/Columns';

const Form = ({ form, result }) => (
  <div className="columns">
    <div className="column is-three-fifths is-offset-one-fifth">
      <div className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {form.name}
            </h1>
            <div className="content">
              <Frame json={decompress(result.payload)}>
                <Canvas />
              </Frame>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PrivateForm = props => (
  <Editor resolver={{ Text, Dropdown, Columns }} enabled={false}>
    <Form {...props} />
  </Editor>
);

export default PrivateForm;
