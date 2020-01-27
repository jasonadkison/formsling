import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Editor as CraftEditor } from "@craftjs/core";
import { compress, getToken } from '../utils';

import resolvers from './resolvers';

import Loader from '../Loader';
import EditForm from '../modals/EditForm';
import Header from './Header';
import Toolbar from './Toolbar';
import MainFrame from './MainFrame';
import SaveButton from './SaveButton';
import LastSaved from './LastSaved';
import RenderNode from './RenderNode';

const Editor = ({ enabled, setEnabled, form, afterSaveEditor, afterSaveForm }) => {
  const [loading, setLoading] = useState(false);
  const endpoint = `/api/v1/forms/${form.id}`;

  const saveForm = async (editorPayload) => {
    setLoading(true);

    const token = getToken();
    const payload = compress(editorPayload);

    await axios.put(endpoint, { form: { payload } }, { headers: { 'X-CSRF-TOKEN': token }})
      .then(() => afterSaveEditor())
      .catch((err) => {
        debugger;
      })
      .then(() => setLoading(false));
  };

  const onToggleEditor = useCallback(enabled => setEnabled(enabled), []);
  const editForm = <EditForm form={form} onSuccess={() => afterSaveForm()} />;

  return (
    <>
      <Loader loading={loading} />
      <CraftEditor resolver={resolvers} enabled={enabled} onRender={RenderNode}>
        <Header form={form} editForm={editForm} />
        <Toolbar form={form} onToggleEditor={onToggleEditor} />
        <MainFrame payload={form.payload} />
        {enabled && (
          <div className="has-text-centered">
            <div className="has-margin-top-20">
              <SaveButton handleSave={saveForm} loading={loading} />
            </div>

            {form.updated_at && (
              <div className="has-margin-top-10">
                <LastSaved timestamp={form.updated_at} />
              </div>
            )}
          </div>
        )}
      </CraftEditor>
    </>
  );
};

Editor.propTypes = {
  form: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
  enabled: PropTypes.bool.isRequired,
  setEnabled: PropTypes.func.isRequired,
};

export default Editor;
