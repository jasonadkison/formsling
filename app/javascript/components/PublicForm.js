import React, { useReducer, createContext, useEffect, useContext } from 'react';
import {Editor, Frame, Canvas, useEditor} from "@craftjs/core";

import { decompress } from './FormEditor/Header';
import Text from './PublicForm/Text';
import Dropdown from './PublicForm/Dropdown';
import Columns from './PublicForm/Columns';

export const Context = createContext();
const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      const { nodeId, label, value } = action.payload;
      return { ...state, [nodeId]: { label, value } };
    default:
      throw new Error();
  }
}

const Form = ({ form }) => {
  const { state, dispatch } = useContext(Context);
  const { query } = useEditor();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(query.serialize());
    console.log('submit', state);
  };

  return (
    <form onSubmit={onSubmit}>
      <Frame json={decompress(form.payload)}>
        <Canvas />
      </Frame>
      <div className="field is-grouped is-grouped-centered" style={{ margin: '3rem auto'}}>
        <div className="control">
          <button
            type="submit"
            className="button is-link"
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
