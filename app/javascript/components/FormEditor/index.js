import React, { useEffect, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Editor, Frame, Canvas } from "@craftjs/core";
import { compress, decompress } from '../utils';

import Breadcrumb from '../Breadcrumb';
import Header from './Header';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';

import Text from './user_components/Text';
import resolvers from './resolvers';

// Bomb if the server returns and unexpected status
const customAxios = axios.create({
  validateStatus: (status) => {
    return status === 200;
  },
});

const initialState = {
  isFetching: true,
  isSaving: false,
  form: undefined,
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

  // Fetch the form when id changes
  useEffect(() => {
    fetchForm();
  }, [id]);

  if (error) {
    return (
      <div className="notification is-danger">
        <p>Oops, something went wrong. Try refreshing the page.</p>
      </div>
    );
  }

  if (state.isFetching || state.isSaving) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div id="editor">
      <Breadcrumb>
        <Breadcrumbs {...form} />
      </Breadcrumb>
      <Editor resolver={resolvers} enabled={enabled}>
        <Header form={form} handleSave={handleSave} />
        <Toolbar form={form} />

        <div className="columns">
          <div className="column">
            <Frame json={form.payload ? decompress(form.payload) : undefined}>
              <Canvas id="root-canvas">
                <Text name="First Name" />
                <Text name="Last Name" />
              </Canvas>
            </Frame>
          </div>
          <Sidebar />
        </div>
      </Editor>
    </div>
  );
};

FormEditor.propTypes = {
  enabled: PropTypes.bool,
};

FormEditor.defaultProps = {
  enabled: true,
};

export default FormEditor;
