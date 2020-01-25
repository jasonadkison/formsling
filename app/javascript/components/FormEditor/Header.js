import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useEditor } from '@craftjs/core';
import axios from 'axios';
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom';

import PublishForm from '../modals/PublishForm';

const Header = ({ form, handleSave, onToggleEditor }) => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const onClickSave = (e) => {
    e.preventDefault();
    const payload = query.serialize();
    handleSave(payload);
  };

  const toggleEnabled = useCallback((enabled) => {
    console.log('toggleEnabled', enabled);
    actions.setOptions(options => options.enabled = enabled);
    onToggleEditor(enabled);
  }, [enabled]);

  return (
    <header>
      <div className="level">
        <div className="level-left">
          <h2 className="title">
            {form.name}
          </h2>
        </div>
        <div className="level-right">
          <div className="control">
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
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="buttons">
              <Link
                to={`/forms/${form.id}/results`}
                title="Results"
                className="button is-inline is-outlined is-link"
              >
                View Results
              </Link>
              <PublishForm form={form} />
            </div>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <p className="is-small">
              Last saved:&nbsp;
              <TimeAgo date={form.updated_at}>
                {form.updated_at}
              </TimeAgo>
            </p>
          </div>
          <div className="level-item">
            <button
              className="button is-primary"
              onClick={onClickSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    payload: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  handleSave: PropTypes.func.isRequired,
  onToggleEditor: PropTypes.func.isRequired,
};

export default Header;
