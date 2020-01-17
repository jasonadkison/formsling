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
      <Tools />
      {enabled && (
        <>
          <br />
          <Properties />
        </>
      )}
    </div>
  );
};

export default Sidebar;
