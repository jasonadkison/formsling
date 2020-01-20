// This component is used by end users to complete the shared or embedded form.
//
// On submit it builds a data mapping and snapshots the entire DOM tree and sends it to the server.
import React, {
  useRef, useReducer, createContext, useEffect, useContext, useState } from 'react';
import {Editor, Frame, Canvas, useEditor} from "@craftjs/core";
import axios from 'axios';
import $ from 'jquery'; // used to transform the final snapshot values
import lz from 'lzutf8';

import { decompress } from '../utils';

import Text from './Text';
import Dropdown from './Dropdown';
import Columns, { Column } from './Columns';

// List all resolvers that will be used by the Editor component here
export const allResolvers = { Text, Dropdown, Columns, Column };

// base64 encodes a string
const compress = payload => lz.encodeBase64(lz.encodeUTF8(payload));

// This is the current technique of preserving values within the DOM before exporting the
// DOM tree as the final payload. User components need to have name and value set as data
// attributes. Non-named fields are skipped in the values object.
const snapshotForm = (outerHTML) => {
  const node = $(outerHTML).clone();

  const values = [];
  $('[data-name]', node).each((i, input ) => {
    const name = $(input).attr('data-name');
    const value = $(input).attr('data-value');
    values.push({ name, value });
  });

  // set all the selected dropdown options
  $('select[data-value]', node).each((i, input) => {
    const value = $(input).attr('data-value');
    $(`option[value="${value}"]`, input).attr('selected', true);
  });

  // set all textarea values
  $('textarea[data-value]', node).each((i, input) => {
    const value = $(input).attr('data-value');
    $(input).text(value);
  });

  // set all text input values
  $('input[type="text"][data-value]', node).each((i, input) => {
    const value = $(input).attr('data-value');
    $(input).attr('value', value);
  });

  // return the compressed DOM tree payload as base64 string
  const payload = node.get(0).outerHTML;

  return {
    payload: payload,
    values: values,
  };
};

export const Context = createContext();
const initialState = { loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_ON':
      return { ...state, loading: true };
    case 'LOADING_OFF':
      return { ...state, loading: false };
  }

  return state;
};

const Form = ({ form }) => {
  const { dispatch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // must take a snapshot before manipulating any state causing a re-render
    const { payload, values } = snapshotForm(ref.current.outerHTML);

    // !TODO: make this prettier
    if (values.filter((x) => x.value).length < 1) {
      alert('Oops! This form was not configured properly by the owner.');
      return;
    }

    setLoading(true);
    const token = document.getElementsByName('csrf-token')[0].content;

    await axios.post(
      `/f/${form.id}`,
      { result: { payload: compress(payload), values: compress(JSON.stringify(values)) } },
      { headers: { 'X-CSRF-TOKEN': token }},
    )
      .then(() => setSuccess(true))
      .catch(() => setError(true))
      .then(() => setLoading(false));
  };

  // this hook syncs this component's loading state with the shared context state
  useEffect(() => {
    dispatch({ type: loading ? 'LOADING_ON' : 'LOADING_OFF' });
  }, [loading]);

  if (success) {
    return (
      <>
        <h1 className="title">
          Thank you!
        </h1>
        <div className="notification is-success">
          <p>You've successfully completed the form. You may safely close this page at any time.</p>
        </div>
      </>
    );
  }

  return (
    <div ref={ref}>
      <h1 className="title">
        {form.name}
      </h1>
      <div className="content">
        <form onSubmit={onSubmit}>
          {error && (
            <div className="notification is-danger">
              <p>Oops, something went wrong. Please try again.</p>
            </div>
          )}
          <Frame json={decompress(form.payload)}>
            <Canvas />
          </Frame>
          <div className="field is-grouped is-grouped-right" style={{ margin: '3rem auto'}}>
            <div className="control">
              <button
                type="submit"
                className={`button is-primary ${loading ? 'is-loading' : ''}`}
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

};

const PublicForm = props => (
  <Provider>
    <Form {...props} />
  </Provider>
);

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Editor resolver={allResolvers} enabled={false}>
        {children}
      </Editor>
    </Context.Provider>
  );
};

export default PublicForm;
