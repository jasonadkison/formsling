import React from 'react';
import { useEditor } from '@craftjs/core';

import Tools from './Tools';

const Toolbar = ({ form }) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  if (!enabled) return null;

  return (
    <div className="toolbar">
      <p className="menu-label">
        Drag and Drop Elements
      </p>
      <Tools form={form} />
    </div>
  );
};

export default Toolbar;
