import React from 'react';
import PropTypes from 'prop-types';
import { useNode, Canvas } from '@craftjs/core';

import DragBox from './DragBox';

export const Column = ({ children }) => {
  const { connectors: { connect } } = useNode();
  return (
    <div ref={connect} className="column is-crafted">{children}</div>
  );
};

const Columns = ({ children }) => {
  return (
    <DragBox>
      <div className="columns">
        <Canvas is={Column} id="left" />
        <Canvas is={Column} id="right" />
      </div>
    </DragBox>
  );
};

Columns.craft = {
  name: 'Columns',
};

export default Columns;
