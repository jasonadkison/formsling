// This component is used by end users to fill out and submit a configured form. An HTML snapshot is
// created as the final payload which will be used later to generate the PDF copy of the form.
//
// All user components must set the final field value using a data-value attribute on the input
// in order for the values to be correctly preserved during PDF generation.
import React, { useRef, useReducer, createContext, useEffect, useLayoutEffect, useContext, useState } from 'react';
import {Editor, Frame, Canvas, useEditor} from "@craftjs/core";
import axios from 'axios';
import $ from 'jquery'; // used to transform the final snapshot values
import lz from 'lzutf8';

import { decompress } from './utils';
import Text from './PublicForm/Text';
import Dropdown from './PublicForm/Dropdown';
import Columns from './PublicForm/Columns';

const compress = payload => lz.encodeBase64(lz.encodeUTF8(payload));

// Snapshot won't be usable outside of the editor unless we make the values backend friendly.
// Better to handle this here rather than every time we want to view the snapshot.
const prepareResultPayload = (outerHTML) => {
  const node = $(outerHTML).clone();

  $('select[data-value]', node).each((i, input) => {
    const value = $(input).attr('data-value');
    $(`option[value="${value}"]`, input).attr('selected', true);
  });

  $('textarea[data-value]', node).each((i, input) => {
    const value = $(input).attr('data-value');
    $(input).text(value);
  });

  $('input[type="text"][data-value]', node).each((i, input) => {
    const value = $(input).attr('data-value');
    $(input).attr('value', value);
  });

  return compress(node.get(0).outerHTML);
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

    // must take a snapshot before manipulating any state
    const payload = prepareResultPayload(ref.current.outerHTML);

    setLoading(true);
    const token = document.getElementsByName('csrf-token')[0].content;

    await axios.post(
      `/f/${form.id}`,
      { result: { payload } },
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

  const content = success ? (
    <>
      <h1 className="title">
        Thank you!
      </h1>
      <div className="notification is-success">
        <p>You've successfully completed the form. You may safely close this page at any time.</p>
      </div>
    </>
  ) : (
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
          <div className="field is-grouped is-grouped-centered" style={{ margin: '3rem auto'}}>
            <div className="control">
              <button
                type="submit"
                className={`button is-link ${loading ? 'is-loading' : ''}`}
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

  return (
    <div className="columns">
      <div className="column is-three-fifths is-offset-one-fifth">
        <div className="hero">
          <div className="hero-body">
            <div className="container">
              {content}
            </div>
          </div>
        </div>
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
      <Editor resolver={{ Text, Dropdown, Columns }} enabled={false}>
        {children}
      </Editor>
    </Context.Provider>
  );
};

export default PublicForm;
