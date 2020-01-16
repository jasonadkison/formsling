import React from 'react';
import { useEditor } from '@craftjs/core';

const Properties = () => {
  const { actions, selected } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;

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

  return selected ? (
    <div className="properties">
      <nav className="panel">
        <p className="panel-heading">
          Properties
        </p>
        {selected.properties && React.createElement(selected.properties)}
        {selected.isDeletable ? (
          <div className="panel-block">
            <p>
              <button
                className="button is-danger"
                onClick={() => actions.delete(selected.id)}
              >
                Delete Field
              </button>
            </p>
          </div>
        ) : null}
      </nav>
    </div>
  ) : <p>Click on a field to edit its properties.</p>;
};

export default Properties;
