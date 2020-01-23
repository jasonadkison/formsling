import React from 'react';
import { useEditor } from '@craftjs/core';

import Text from './Text';
import Dropdown from './Dropdown';
import Columns from './Columns';

const Tools = () => {
  const { connectors, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <nav className="buttons are-medium">
      <a
        className="button"
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
        className="button"
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
        className="button"
        ref={ref => connectors.create(ref, <Columns />)}
        title="Columns"
        data-tooltip="Columns"
        disabled={!enabled}
      >
        <span className="icon">
          <i className="fas fa-columns" aria-hidden="true" />
        </span>
      </a>
    </nav>
  );
};

export default Tools;
