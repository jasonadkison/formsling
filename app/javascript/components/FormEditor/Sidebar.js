import React from 'react';
import { useEditor } from '@craftjs/core';

import Tools from './Tools';
import Properties from './Properties';

const Sidebar = () => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div>
      {enabled && (
        <>
          <Tools />
          <br />
          <Properties />
        </>
      )}
      {!enabled && (
        <p className="content">
          <span className="icon">
            <i className="fas fa-info-circle" />
          </span>
          Toggle edit mode to start making changes.
        </p>
      )}
    </div>
  );
};

export default Sidebar;
