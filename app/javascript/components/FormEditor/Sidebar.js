import React from 'react';
import { useEditor } from '@craftjs/core';
import StickyBox from "react-sticky-box";

const Sidebar = ({ children }) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  if (!enabled) return null;

  return (
    <div className="column is-one-third">
      <StickyBox offsetTop={20} offsetBottom={20}>
        <aside className="sidebar">
          {children}
        </aside>
      </StickyBox>
    </div>
  );
};

export default Sidebar;
