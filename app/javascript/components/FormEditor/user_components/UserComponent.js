import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNode, useEditor } from '@craftjs/core';
import cx from 'classnames';

const Move = ({ childRef }) => (
  <a
    className="component-action move-action"
    ref={childRef}
    data-tooltip="Move"
  >
    <span className="icon is-small">
      <i className="fas fa-arrows-alt" />
    </span>
  </a>
);

const Delete = ({ handleDelete }) => (
  <a
    className="component-action delete-action"
    onClick={() => confirm('Are you sure?') && handleDelete()}
    data-tooltip="Delete"
  >
    <span className="icon is-small">
      <i className="fas fa-trash-alt" />
    </span>
  </a>
);

const UserComponent = ({ children }) => {
  const { actions, enabled, query } = useEditor((state, query) => ({
    enabled: state.options.enabled,
  }));

  const {
    connectors: { connect, drag },
    id,
    name,
    properties,
    isDraggable,
    isDeletable,
    isSelected,
    isBeingDragged,
    isBeingHovered,
  } = useNode((node) => ({
    name: node.data.displayName,
    properties: node.related && node.related.properties,
    isDraggable: query.node(node.id).isDraggable(),
    isDeletable: query.node(node.id).isDeletable(),
    isSelected: node.events.selected,
    isBeingDragged: node.events.dragged,
    isBeingHovered: node.events.hovered,
  }));

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      data-user-component ref={ref => connect(ref)}
      className={isBeingDragged ? 'is-dragging' : ''}
    >
      {enabled && (
        <div className="user-component-indicator" ref={drag} data-name={name}>
          <div className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <span className="component-name">{name}</span>
              </div>
            </div>
            <div className="level-right">
              {isDeletable && <Delete handleDelete={() => actions.delete(id)} />}
            </div>
          </div>
        </div>
      )}

      {children}

      {enabled && properties && (
        <nav className="panel is-shadowless has-margin-top-20 has-text-centered">
          <button
            className="button is-small is-rounded"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="icon">
              <i className={cx('fas', { 'fa-caret-up': expanded, 'fa-edit': !expanded })} />
            </span>
            <span>
              {expanded ? 'Hide Settings' : 'Show Settings'}
            </span>
          </button>
          <div style={{ display: expanded ? 'block' : 'none' }}>
            {properties && React.createElement(properties)}
          </div>
        </nav>
      )}
    </div>
  );
};

UserComponent.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserComponent;
