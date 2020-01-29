import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useEditor } from '@craftjs/core';

import Tools from './Tools';

const Toolbar = ({ form, onToggleEditor }) => {
  const { actions, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const toggleEnabled = useCallback((enabled) => {
    actions.setOptions(options => options.enabled = enabled);
    onToggleEditor(enabled);
  }, [enabled]);

  return (
    <div className="toolbar">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <Tools form={form} />
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="control is-pulled-right">
              <input
                id="editor-switch"
                type="checkbox"
                className="switch"
                checked={enabled}
                onChange={(e) => toggleEnabled(e.target.checked)}
              />
              <label htmlFor="editor-switch">
                Toggle Preview Mode
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  onToggleEditor: PropTypes.func.isRequired,
};

export default Toolbar;
