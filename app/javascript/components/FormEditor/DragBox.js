import React from 'react';
import PropTypes from 'prop-types';
import { useNode, useEditor } from '@craftjs/core';
import cx from 'classnames';

const DragBox = ({ children, className, label }) => {
  const { connectors: { connect, drag }, selected, setProp } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      ref={ref => connect(drag(ref))} className={cx('drag-box', { selected, enabled })}
      data-label={label}
    >
      <div className={cx(className, 'user-component', { selected, enabled })}>
        {children}
      </div>
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
