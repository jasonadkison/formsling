import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Editor, Frame, Canvas } from "@craftjs/core";

import Header from './Header';
import Sidebar from './Sidebar';

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

const FormEditor = ({ enabled }) => {
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
      <Editor resolver={{ Text }} enabled={enabled}>
        <Header form={form} />
        <div className="is-divider"></div>
        <div className="columns">
          <div className="column is-three-fifths">
            <Frame>
              <Canvas is="div" className="box">
                <Text
                  label="Hello world!"
                  helpText="This is some sample help text."
                />
                <Text
                  label="Sample Textarea"
                  initialValue="This is the initial value"
                  placeholder="Enter some text here..."
                  helpText="This is just a sample!"
                  rows={4}
                />
                <Text
                  label="Curious George"
                  initialValue="I have an initial value!"
                />
                <Text
                  label="The Itsy Bitsy Spider"
                />
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
