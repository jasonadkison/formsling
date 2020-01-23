import React from 'react';
import { useEditor } from '@craftjs/core';
import StickyBox from "react-sticky-box";
import Property from './Property';

const Sidebar = () => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  if (!enabled) return null;

  return (
    <div className="column is-one-third">
      <StickyBox>
        <div className="sidebar">
          <Properties />
        </div>
      </StickyBox>
    </div>
  );
};

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

  if (!selected.properties) return (
    <div className="media is-hidden-mobile">
      <div className="media-left">
        <span className="icon">
          <i className="fas fa-mouse-pointer" />
        </span>
      </div>
      <div className="media-content">
        Click on any element to view its properties.
      </div>
    </div>
  );

  return (
    <div className="properties">
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
                  className="button is-danger is-small"
                  onClick={() => actions.delete(selected.id)}
                >
                  Delete Element
                </button>
              </div>
            </Property>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Sidebar;
