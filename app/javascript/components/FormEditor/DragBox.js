import React from 'react';
import PropTypes from 'prop-types';
import { useNode, useEditor } from '@craftjs/core';

const DragBox = ({ children, className, label }) => {
  const { connectors: { connect, drag }, isActive, setProp } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      ref={ref => connect(drag(ref))}
      className={`drag-box${isActive ? ' selected' : ''}${enabled ? ' enabled' : ''} ${className}`}
      data-label={label}
    >
      {children}
    </div>
  );
};

DragBox.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
};

DragBox.defaultProps = {
  className: '',
  label: 'Element',
};

export default DragBox;
