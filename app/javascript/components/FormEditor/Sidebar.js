import React from 'react';
import { useEditor } from '@craftjs/core';

import Tools from './Tools';
import Properties from './Properties';

const Sidebar = () => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  if (!enabled) return null;

  return (
    <div className="column is-one-third">
      <Tools />
      <br />
      <Properties />
    </div>
  );
};

export default Sidebar;
