import React, { useReducer, createContext, useEffect } from 'react';
import {Editor, Frame, Canvas} from "@craftjs/core";

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

const PublicForm = ({ form }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('submit', state);
  };

  return (
    <Context.Provider value={{ state, dispatch }}>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
      <form onSubmit={onSubmit}>
        <Editor resolver={{ Text, Dropdown, Columns }} enabled={false}>
          <Frame json={decompress(form.payload)}>
            <Canvas />
          </Frame>
        </Editor>
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
    </Context.Provider>
  );
};

export default PublicForm;
