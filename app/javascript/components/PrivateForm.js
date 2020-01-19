import React, { useEffect } from 'react';
import {Editor, Frame, Canvas} from "@craftjs/core";

import { decompress } from './utils';
import Text from './PrivateForm/Text';
import Dropdown from './PrivateForm/Dropdown';
import Columns from './PrivateForm/Columns';

const Form = ({ form, result }) => {

  return (
    <div className="columns">
      <div className="column is-three-fifths is-offset-one-fifth">
        <div className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                test
                {form.name}
                YOLOLOLOLOLOOLOL
              </h1>
              <div className="content">
                <h2>Above</h2>
                <Frame json={decompress(result.payload)}>
                  <Canvas />
                </Frame>
                <h2>Below</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivateForm = props => (
  <Editor resolver={{ Text, Dropdown, Columns }} enabled={false}>
    <Form {...props} />
  </Editor>
);

export default PrivateForm;
