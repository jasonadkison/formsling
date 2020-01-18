import React, { useEffect, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Editor, Frame, Canvas } from "@craftjs/core";
import StickyBox from "react-sticky-box";

import Breadcrumb from '../Breadcrumb';
import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';

import Text from './Text';
import Dropdown from './Dropdown';
import Columns from './Columns';

// It's important to blow up when the server doesn't send a valid response.
// This will throw and exception on non 200 status responses.
const customAxios = axios.create({
  validateStatus: (status) => {
    return status === 200;
  },
});

const initialState = {
  payload: null,
  updated_at: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_FORM':
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
};

const FormEditor = ({ enabled }) => {
  const { id } = useParams();
  const [form, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { payload } = form;

  useEffect(() => {
    const loadForm = async () => {
      setLoading(true);
      await customAxios(`/api/v1/forms/${id}`)
        .then(({ data }) => dispatch({ type: 'RECEIVE_FORM', payload: data }))
        .catch(() => {
          setError(true);
          console.error('Could not sync with the server.');
        })
        .then(() => setLoading(false));
    };

    loadForm();
  }, [id]);

  const handleSave = async (payload) => {
    const token = document.getElementsByName('csrf-token')[0].content;
    return await customAxios.put(
      `/api/v1/forms/${id}`,
      { form: { payload }},
      { headers: { 'X-CSRF-TOKEN': token }},
    )
      .then(({ data }) => {
        dispatch({ type: 'RECEIVE_FORM', payload: data });
        return data;
      })
      .catch(() => {
        setError(true);
        console.error('Could not sync with the server.');
      });
  }

  if (error) {
    return (
      <div className="notification is-danger">
        <p>Oops, something went communicating with the server. You can try refreshing the page.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div id="editor">
      <Editor resolver={{ Text, Dropdown, Columns }} enabled={enabled}>
        <Header form={form} handleSave={handleSave} />
        <div className="columns">
          <div className="column is-two-thirds">
            <Frame>
              <Canvas is="div" className="drag-area">
                {!payload && <Text label="Example Text Element" />}
                {!payload && (
                  <Dropdown label="Example Dropdown Element" options={['One', 'Two', 'Three']} />
                )}
                {!payload && <Columns />}
              </Canvas>
            </Frame>
          </div>
          <div className="column">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <Sidebar />
            </StickyBox>
          </div>
        </div>
        <Breadcrumb>
          <Breadcrumbs {...form} />
        </Breadcrumb>
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
