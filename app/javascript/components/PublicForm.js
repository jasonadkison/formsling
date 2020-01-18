import React, { useReducer, createContext, useEffect, useContext, useState } from 'react';
import {Editor, Frame, Canvas, useEditor} from "@craftjs/core";
import axios from 'axios';

import { compress, decompress } from './FormEditor/Header';
import Text from './PublicForm/Text';
import Dropdown from './PublicForm/Dropdown';
import Columns from './PublicForm/Columns';

export const Context = createContext();
const initialState = { loading: false, nodes: {}};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_NODE':
      const { nodeId, label, value } = action.payload;
      return { ...state, nodes: { ...state.nodes, [nodeId]: { label, value } } };
    case 'LOADING_ON':
      return { ...state, loading: true };
    case 'LOADING_OFF':
      return { ...state, loading: false };
  }

  return state;
}

const Form = ({ form }) => {
  const { dispatch } = useContext(Context);
  const { query } = useEditor();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    const token = document.getElementsByName('csrf-token')[0].content;
    const result = { payload: compress(query.serialize()) };

    await axios.post(`/f/${form.id}`, { result }, { headers: { 'X-CSRF-TOKEN': token }})
      .then(() => setSuccess(true))
      .catch(() => setError(true))
      .then(() => setLoading(false));
  };

  // this hook keeps the store in sync with component loading state
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
    <>
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
    </>
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
