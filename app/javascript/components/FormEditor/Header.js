import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useEditor } from '@craftjs/core';
import axios from 'axios';
import TimeAgo from 'react-timeago'
import { compress, decompress } from '../utils';

import PublishForm from '../modals/PublishForm';

const Header = ({ form, handleSave }) => {
  const { id, name, payload, updated_at: updatedAt } = form;
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [currentPayload, setCurrentPayload] = useState(payload);
  const [syncing, setSyncing] = useState(false);
  const [isCurrentlySynced, setIsCurrentlySynced] = useState(true);
  const [showSyncingIndicator, setShowSyncingIndicator] = useState(false);
  const [publishModalOpened, setPublishModalOpened] = useState(false);

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
  // Only allows a sync every 3 seconds
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
      if (payload !== result.payload) {
        actions.deserialize(decompress(result.payload));
      }

      setCurrentPayload(result.payload);
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

  // this hook triggers display of the loading indicator if syncing takes more than a second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSyncingIndicator(syncing);
    }, 1000);

    return () => clearTimeout(timer);
  }, [syncing]);

  return (
    <header>
      <div className="field is-pulled-right">
        <input
          id="editor-switch"
          type="checkbox"
          className="switch"
          checked={enabled}
          onChange={(e) => actions.setOptions(options => options.enabled = e.target.checked)}
        />
        <label htmlFor="editor-switch">Toggle Edit Mode</label>
      </div>
      <h2 className="title">{name}</h2>
      <p className="is-small has-text-right">
        {showSyncingIndicator ? (
          <>Saving...</>
        ) : (
          <>Saved <TimeAgo date={updatedAt}>{updatedAt}</TimeAgo></>
        )}
      </p>
      <PublishForm form={form} />
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
