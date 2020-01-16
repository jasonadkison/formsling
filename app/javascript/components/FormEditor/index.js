import React, { useEffect, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Editor, Frame, Canvas } from "@craftjs/core";

import Header from './Header';
import Tools from './Tools';
import Properties from './Properties';

import Text from './Text';

const initialState = {
  loading: true,
  form: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_FORM':
      return { ...state, form: { ...action.payload }, loading: false };
    default:
      throw new Error();
  }
};

const FormEditor = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadForm = async () => {
      const result = await axios(`/api/v1/forms/${id}`);

      dispatch({ type: 'RECEIVE_FORM', payload: result.data });
    };

    loadForm();
  }, [id]);

  const { loading, form } = state;

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div id="editor">
      <Editor resolver={{ Text }}>
        <Header form={form} />
        <div className="columns">
          <div className="column">
            <Frame>
              <Canvas is="div">
                <Text
                  label="Hello world!"
                  helpText="This is some sample help text."
                />
                <Text
                  label="Curious George"
                />
                <Text
                  label="The Itsy Bitsy Spider"
                />
              </Canvas>
            </Frame>
          </div>
          <div className="column is-one-third">
            <Tools />
            <br />
            <Properties />
          </div>
        </div>
      </Editor>
    </div>
  );
};

export default FormEditor;
