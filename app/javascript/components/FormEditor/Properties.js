import React from 'react';
import { useEditor } from '@craftjs/core';
import Property from './Property';

const Properties = () => {
  const { actions, selected } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected = {};

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        properties: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.properties,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return { selected };
  });

  if (selected.properties) {
    return (
      <div className="properties">
        <div className="content">
          <p>
            <span className="icon">
              <i className="fas fa-arrows-alt-v" />
            </span>
            Drag and drop elements into the desired order.
          </p>
        </div>
        <nav className="panel is-primary">
          <div className="panel-heading">
            <div className="level">
              <div className="level-left">
                Properties
              </div>
              <div className="level-right">
                <span className="tag is-info is-light">
                  {selected.name}
                </span>
              </div>
            </div>
          </div>
          {selected.properties && React.createElement(selected.properties)}
          {selected.isDeletable ? (
            <div className="panel-block">
              <Property label="Danger Zone">
                <div className="content">
                  <button
                    className="button is-danger"
                    onClick={() => actions.delete(selected.id)}
                  >
                    Delete Element
                  </button>
                  <p className="help is-danger">* Also deletes any child elements.</p>
                </div>
              </Property>
            </div>
          ) : null}
        </nav>
      </div>
    );
  }

  return (
    <div className="content">
      <p>
        <span className="icon">
          <i className="fas fa-mouse-pointer" />
        </span>
        Click an active field to view its properties.
      </p>
      <p>
        <span className="icon">
          <i className="fas fa-arrows-alt-v" />
        </span>
        Drag and drop elements into the desired order.
      </p>
    </div>
  );
};

export default Properties;
