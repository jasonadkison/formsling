import React from 'react';
import PropTypes from 'prop-types';
import { useNode, useEditor } from '@craftjs/core';

const DraggableBox = ({ children }) => {
  const { connectors: { connect, drag }, isActive, setProp } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      ref={ref => connect(drag(ref))}
      className={`drag-box${isActive ? ' selected' : ''}${enabled ? ' enabled' : ''}`}
    >
      {children}
    </div>
  );
};

DraggableBox.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DraggableBox;
