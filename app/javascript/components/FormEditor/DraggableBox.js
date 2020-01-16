import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

const DraggableBox = ({ children }) => {
  const { connectors: { connect, drag }, isActive, setProp } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      ref={ref => connect(drag(ref))}
      className={`box ${isActive ? 'selected' : ''}`}
    >
      {children}
    </div>
  );
};

DraggableBox.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DraggableBox;
