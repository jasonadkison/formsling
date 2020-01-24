import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNode, useEditor } from '@craftjs/core';
import cx from 'classnames';

import Properties from '../Properties';

const DragBox = ({ children, className }) => {
  const { connectors: { connect, drag }, id, properties, name, selected } = useNode((node) => ({
    selected: node.events.selected,
    name: node.data.displayName,
    properties: node.related && node.related.properties,
  }));

  const { actions, enabled } = useEditor((state, query) => ({
    enabled: state.options.enabled,
  }));

  const [expanded, setExpanded] = useState(false);

  const handleDelete = (id) => confirm('Are you sure?') && actions.delete(id);

  return (
    <div
      ref={ref => connect(drag(ref))} className={cx('drag-box', { selected, enabled })}
      data-label={name}
    >
      <div className={cx(className, 'user-component', { selected, enabled })}>
        {children}

        {enabled && selected && (
          <nav className="panel is-primary has-margin-top-20 has-margin-bottom-10">
            <button
              className="button is-fullwidth is-primary is-small"
              onClick={() => setExpanded(!expanded)}
            >
              <span className="icon">
                <i className={cx('fas', { 'fa-caret-up': expanded, 'fa-caret-down': !expanded })} />
              </span>
              <span>{expanded ? 'Hide Properties' : 'Show Properties'}</span>
            </button>
            <div style={{ display: expanded ? 'block' : 'none' }}>
              {properties && React.createElement(properties)}

              <div className="panel-block">
                <button
                  className="button is-danger is-small"
                  onClick={() => handleDelete(id)}
                >
                  Delete {name}
                </button>
              </div>
            </div>
          </nav>
        )}
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
