import React from 'react';
import PropTypes from 'prop-types';
import { useNode, Canvas } from '@craftjs/core';

import Text from './Text';
import ColumnsProperties from './ColumnsProperties';
import DragBox from './DragBox';

export const Column = ({ children }) => {
  const { connectors: { connect } } = useNode();
  return (
    <div ref={connect} className="column is-crafted">{children}</div>
  );
};

const Columns = ({ children }) => {
  return (
    <DragBox label="Columns">
      <div className="columns">
        <Canvas is={Column} id="left" />
        <Canvas is={Column} id="right" />
      </div>
    </DragBox>
  );
};

Columns.craft = {
  related: {
    properties: ColumnsProperties,
  },
};

export default Columns;
