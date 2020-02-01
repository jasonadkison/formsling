import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNode, useEditor } from '@craftjs/core';
import cx from 'classnames';

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
    parent,
    currentIndex,
    isLast,
    properties,
    isDeletable,
    isBeingDragged,
  } = useNode((node) => {
    const siblings = query.node(node.data.parent).decendants();
    const currentIndex = siblings.indexOf(node.id);
    const isLast = siblings.length === 1 || currentIndex === siblings.length - 1;
    return {
      parent: node.data.parent,
      currentIndex,
      isLast,
      name: node.data.displayName,
      properties: node.related && node.related.properties,
      isDeletable: query.node(node.id).isDeletable(),
      isBeingDragged: node.events.dragged,
    };
  });

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      data-user-component ref={ref => connect(ref)}
      className={isBeingDragged ? 'is-dragging' : ''}
      data-node-id={id}
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
              <div className="level-item has-margin-right-10">
                <a
                  className={cx('component-action', { 'is-invisible': currentIndex === 0 })}
                  onClick={() => actions.move(id, parent, currentIndex - 1 || 0)}
                  data-tooltip="Move Up"
                >
                  <span className="icon is-small">
                    <i className="fas fa-caret-up" />
                  </span>
                </a>
                <a
                  className={cx('component-action', { 'is-invisible': isLast })}
                  onClick={() => actions.move(id, parent, currentIndex + 2)}
                  data-tooltip="Move Down"
                >
                  <span className="icon is-small">
                    <i className="fas fa-caret-down" />
                  </span>
                </a>
              </div>
              <div className="level-item has-margin-right-10">
                <a
                  className={cx('component-action', { 'is-invisible': !properties })}
                  onClick={() => setExpanded(!expanded)}
                  data-tooltip="Edit Settings"
                >
                  <span className="icon is-small">
                    <i className="fas fa-edit" />
                  </span>
                </a>
              </div>
              <div className="level-item">
                {isDeletable && <Delete handleDelete={() => actions.delete(id)} />}
              </div>
            </div>
          </div>
        </div>
      )}

      {children}

      {enabled && properties && expanded && (
        <div className="card has-margin-10">
          <header className="card-header">
            <p className="card-header-title">
              {name} Settings
            </p>
          </header>
          <div className="card-content">
            {properties && React.createElement(properties)}
          </div>
          <footer className="card-footer">
            <a
              className="card-footer-item"
              onClick={() => setExpanded(false)}
            >
              Close
            </a>
          </footer>
        </div>
      )}
    </div>
  );
};

UserComponent.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserComponent;
