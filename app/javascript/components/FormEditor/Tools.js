import React from 'react';
import { Canvas, useEditor } from '@craftjs/core';
import Text from './Text';

const Tools = () => {
  const { connectors, query } = useEditor();

  return (
    <div className="tools">
      <nav className="panel">
        <p className="panel-heading">
          Fields
          <span className="help">(Drag to add)</span>
        </p>
        <a
          className="panel-block is-active"
          ref={ref => connectors.create(ref, <Text text="Lorem ipsum text goes here." />)}
        >
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true" />
          </span>
          Text
        </a>
      </nav>
    </div>
  );
};

export default Tools;
