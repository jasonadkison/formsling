import React from 'react';
import { Canvas, useEditor } from '@craftjs/core';

import Text from './Text';
import Dropdown from './Dropdown';

const Tools = () => {
  const { connectors, query } = useEditor();

  return (
    <div className="tools">
      <p className="menu-label">Fields (Drag to add)</p>
      <div className="buttons has-addons">
        <p className="control">
          <button
            className="button"
            ref={ref => connectors.create(ref, <Text />)}
            title="Text"
            data-tooltip="Text"
          >
            <span className="icon">
              <i className="fas fa-align-left" aria-hidden="true" />
            </span>
          </button>
          <button
            className="button"
            ref={ref => connectors.create(ref, <Dropdown />)}
            title="Dropdown"
            data-tooltip="Dropdown"
          >
            <span className="icon">
              <i className="fas fa-chevron-circle-down" aria-hidden="true" />
            </span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default Tools;
