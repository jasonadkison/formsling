import React from 'react';
import { useEditor } from '@craftjs/core';

const Header = ({ form }) => {
  const { name } = form;
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <header>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <h2 className="title">{name}</h2>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="field">
              <input
                id="editor-switch"
                type="checkbox"
                className="switch"
                checked={enabled}
                onChange={(e) => actions.setOptions(options => options.enabled = e.target.checked)}
              />
              <label htmlFor="editor-switch">Edit Mode</label>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
