import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';
import axios from 'axios';

const compress = json => lz.encodeBase64(lz.compress(json));
const decompress = base64 => lz.decompress(lz.decodeBase64(base64));

const Header = ({ form, dispatch }) => {
  const { id, name, payload } = form;
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const saveEditor = () => {
    const save = async (payload) => {
      const token = document.getElementsByName('csrf-token')[0].content;
      const result = await axios.put(
        `/api/v1/forms/${id}`,
        { form: { payload }},
        { headers: { 'X-CSRF-TOKEN': token }},
      );

      actions.deserialize(decompress(result.data.payload));
    };

    save(compress(query.serialize()));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!payload) return;
      actions.deserialize(decompress(payload));
    }, 0);
    return () => clearTimeout(timer);
  }, [payload]);

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
          <button
              className="button"
              onClick={saveEditor}
            >
              Save
            </button>
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

Header.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    payload: PropTypes.string,
  }).isRequired,
};

export default Header;
