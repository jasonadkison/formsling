import React from 'react';
import { Canvas, useEditor } from '@craftjs/core';
import Text from './Text';

const Tools = () => {
  const { connectors, query } = useEditor();

  return (
    <div className="column">
      <div className="tools">
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
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tools;
