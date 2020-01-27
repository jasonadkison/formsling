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
      <div className="columns">
        <div className="column">
          <h4 className="subtitle is-size-5 is-marginless">
            {enabled ? 'Editing' : 'Previewing'}
          </h4>
          <p className="menu-label">
            {enabled ? (
              <span>Drag and drop elements to build your form</span>
            ) : (
              <span>How the form appears when you share it</span>
            )}
          </p>
          {enabled && (
            <Tools form={form} />
          )}
        </div>
        <div className="column is-4">
          <div className="control is-pulled-right">
            <input
              id="editor-switch"
              type="checkbox"
              className="switch"
              checked={enabled}
              onChange={(e) => toggleEnabled(e.target.checked)}
            />
            <label htmlFor="editor-switch">
              Edit Mode
            </label>
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
