import React from 'react';
import { useEditor } from '@craftjs/core';

import resolvers from './resolvers';

const Tools = () => {
  const { connectors, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <nav className="buttons are-medium">
      <a
        className="button"
        ref={ref => connectors.create(ref, <resolvers.Text />)}
        title="Text"
        data-tooltip="Text"
      >
        <span className="icon">
          <i className="fas fa-keyboard" aria-hidden="true" />
        </span>
      </a>
      <a
        className="button"
        ref={ref => connectors.create(ref, <resolvers.Dropdown />)}
        title="Dropdown"
        data-tooltip="Dropdown"
      >
        <span className="icon">
          <i className="fas fa-list-alt" aria-hidden="true" />
        </span>
      </a>
      <a
        className="button"
        ref={ref => connectors.create(ref, <resolvers.Toggle />)}
        title="Toggle"
        data-tooltip="Toggle"
      >
        <span className="icon">
          <i className="fas fa-check-square" aria-hidden="true" />
        </span>
      </a>
      <a
        className="button"
        ref={ref => connectors.create(ref, <resolvers.Columns />)}
        title="Columns"
        data-tooltip="Columns"
      >
        <span className="icon">
          <i className="fas fa-columns" aria-hidden="true" />
        </span>
      </a>
    </nav>
  );
};

export default Tools;
