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
    <aside className="sidebar">
      <Tools />
      <br />
      <Properties />
    </aside>
  );
};

export default Sidebar;
