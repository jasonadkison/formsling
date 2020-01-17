import React from 'react';
import { Canvas, useEditor } from '@craftjs/core';

import Text from './Text';
import Dropdown from './Dropdown';
import Columns from './Columns';

const Tools = () => {
  const { connectors, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-menu is-active">
        <div className="navbar-start">
          <a
            className="navbar-item"
            ref={ref => connectors.create(ref, <Text />)}
            title="Text"
            data-tooltip="Text"
            disabled={!enabled}
          >
            <span className="icon">
              <i className="fas fa-font" aria-hidden="true" />
            </span>
          </a>
          <a
            className="navbar-item"
            ref={ref => connectors.create(ref, <Dropdown />)}
            title="Dropdown"
            data-tooltip="Dropdown"
            disabled={!enabled}
          >
            <span className="icon">
              <i className="fas fa-list-alt" aria-hidden="true" />
            </span>
          </a>
          <a
            className="navbar-item"
            ref={ref => connectors.create(ref, <Columns />)}
            title="Columns"
            data-tooltip="Columns"
            disabled={!enabled}
          >
            <span className="icon">
              <i className="fas fa-columns" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Tools;
