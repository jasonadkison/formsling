import React from 'react';
import PropTypes from 'prop-types';
import { useNode, Canvas } from '@craftjs/core';

import UserComponent from './UserComponent';

export const Column = ({ children }) => {
  const { connectors: { connect } } = useNode();
  return (
    <div ref={connect} className="column is-crafted">{children}</div>
  );
};

const Columns = ({ children }) => {
  return (
    <UserComponent>
      <div className="columns">
        <Canvas is={Column} id="left" />
        <Canvas is={Column} id="right" />
      </div>
    </UserComponent>
  );
};

Columns.craft = {
  name: 'Columns',
};

export default Columns;
