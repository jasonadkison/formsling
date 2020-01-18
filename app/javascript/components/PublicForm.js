import React, { useReducer, createContext, useEffect, useContext, useState } from 'react';
import {Editor, Frame, Canvas, useEditor} from "@craftjs/core";

import { decompress } from './FormEditor/Header';
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

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      dispatch({ type: 'LOADING_OFF' });
    }, 2500);
    console.log(query.serialize());
  };

  useEffect(() => {
    dispatch({ type: loading ? 'LOADING_ON' : 'LOADING_OFF' });
  }, [loading]);

  return (
    <form onSubmit={onSubmit}>
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
