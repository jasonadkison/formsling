import React, { useEffect, useReducer, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Editor } from "@craftjs/core";
import { compress } from '../utils';

import Loader from '../Loader';
import Breadcrumb from '../Breadcrumb';
import Breadcrumbs from './Breadcrumbs';
import EditForm from '../modals/EditForm';
import Header from './Header';
import Toolbar from './Toolbar';
import MainFrame from './MainFrame';
import SaveButton from './SaveButton';
import LastSaved from './LastSaved';
import RenderNode from './RenderNode';

import resolvers from './resolvers';

// Bomb if the server returns and unexpected status
const customAxios = axios.create({
  validateStatus: (status) => {
    return status === 200;
  },
});

const initialState = {
  isFetching: false,
  isSaving: false,
  form: {
    id: '',
    name: '',
    payload: undefined,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_FORM_START':
      return { ...state, isFetching: true };
    case 'FETCH_FORM_END':
      return { ...state, isFetching: false };
    case 'SAVE_FORM_START':
      return { ...state, isSaving: true };
    case 'SAVE_FORM_END':
      return { ...state, isSaving: false };
    case 'RECEIVE_FORM':
      return { ...state, form: {...action.payload } };
    default:
      throw new Error();
  }
};

const FormEditor = ({ enabled }) => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(false);
  const [editorEnabled, setEditorEnabled] = useState(enabled);
  const { isFetching, isSaving, form } = state;

  const fetchForm = async () => {
    dispatch({ type: 'FETCH_FORM_START' });
    await customAxios(`/api/v1/forms/${id}`)
      .then(({ data }) => dispatch({ type: 'RECEIVE_FORM', payload: data }))
      .catch(() => setError(true))
      .then(() => dispatch({ type: 'FETCH_FORM_END' }));
  };

  const saveForm = async (form = {}) => {
    dispatch({ type: 'SAVE_FORM_START' });
    const token = document.getElementsByName('csrf-token')[0].content;

    await customAxios.put(`/api/v1/forms/${id}`, { form }, { headers: { 'X-CSRF-TOKEN': token }})
      .then(({ data }) => dispatch({ type: 'RECEIVE_FORM', payload: data }))
      .catch(() => setError(true))
      .then(() => dispatch({ type: 'SAVE_FORM_END' }));
  }

  const handleSave = (editorPayload) => saveForm({ payload: compress(editorPayload) });

  const onToggleEditor = useCallback((enabled) => {
    setEditorEnabled(enabled);
  }, []);

  // Fetch the form when id changes
  useEffect(() => {
    fetchForm();
  }, [id]);

  const loading = state.isFetching || state.isSaving;

  const onFormEditSuccess = () => fetchForm();

  const editForm = (
    <EditForm form={form} onSuccess={onFormEditSuccess} />
  );

  return (
    <>
      {error && (
        <div className="notification is-danger">
          <p>Oops, something went wrong.</p>
        </div>
      )}
      {<Loader loading={loading} />}
      <div id="editor" className={editorEnabled ? 'is-enabled' : 'is-disabled'}>
        <Breadcrumb>
          <Breadcrumbs {...form} />
        </Breadcrumb>
        <Editor resolver={resolvers} enabled={editorEnabled} onRender={RenderNode}>
          <Header
            form={form}
            handleSave={handleSave}
            onToggleEditor={onToggleEditor}
            editForm={editForm}
          />
          <Toolbar form={form} />
          <MainFrame payload={form.payload} />
          {editorEnabled && (
            <div className="has-text-centered">
              <div className="has-margin-top-20">
                <SaveButton handleSave={handleSave} />
              </div>

              {form.updated_at && (
                <div className="has-margin-top-10">
                  <LastSaved timestamp={form.updated_at} />
                </div>
              )}
            </div>
          )}
        </Editor>
      </div>
    </>
  );
};

FormEditor.propTypes = {
  enabled: PropTypes.bool,
};

FormEditor.defaultProps = {
  enabled: true,
};

export default FormEditor;
