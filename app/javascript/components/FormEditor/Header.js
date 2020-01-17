import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useEditor } from '@craftjs/core';
import lz from 'lzutf8';
import axios from 'axios';

import TimeAgo from 'react-timeago'

const compress = json => lz.encodeBase64(lz.compress(json));
const decompress = base64 => lz.decompress(lz.decodeBase64(base64));

const Header = ({ form, handleSave }) => {
  const { id, name, payload, updated_at: updatedAt } = form;
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [currentPayload, setCurrentPayload] = useState(payload);
  const [syncing, setSyncing] = useState(false);
  const [isCurrentlySynced, setIsCurrentlySynced] = useState(true);

  // Load the initial payload on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPayload) {
        actions.deserialize(decompress(currentPayload));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // This hook sets up a poller to check for when things are out of sync.
  useLayoutEffect(() => {
    const timer = setInterval(async () => {
      const editorPayload = compress(query.serialize());
      const isCurrentlySynced = (editorPayload === currentPayload);

      if (!syncing && !isCurrentlySynced) {
        setIsCurrentlySynced(false);
        setCurrentPayload(editorPayload);
        setSyncing(true);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [syncing, currentPayload]);

  // This hook performs the save when syncing is toggled on.
  useEffect(() => {
    const save = async (payload) => {
      const result = await handleSave(payload);

      // only rebuild the nodes if the config changed
      if (payload !== result.data.payload) {
        actions.deserialize(decompress(result.data.payload));
      }

      setCurrentPayload(result.data.payload);
      setIsCurrentlySynced(true);
      setSyncing(false);
    };

    const timer = setTimeout(async () => {
      if (syncing) {
        await save(currentPayload);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [syncing, currentPayload]);

  return (
    <header>
      <p className="has-text-right">Last saved: <TimeAgo date={updatedAt}>{updatedAt}</TimeAgo></p>
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

Header.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    payload: PropTypes.string,
  }).isRequired,
};

export default Header;
