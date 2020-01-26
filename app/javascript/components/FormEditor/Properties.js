import React from 'react';
import { useEditor } from '@craftjs/core';
import Panel from './properties/Panel';

const Properties = () => {
  const { selected } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected = {};

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        properties: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.properties,
      };
    }

    return { selected };
  });

  return (
    <div className="properties">
      <nav className="panel is-primary">
        <div className="panel-heading is-size-6">Properties</div>
        {selected.properties && React.createElement(selected.properties)}
      </nav>
    </div>
  );
};

export default Properties;
