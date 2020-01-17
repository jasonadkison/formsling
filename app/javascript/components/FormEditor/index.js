import React, { useEffect, useReducer, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Editor, Frame, Canvas } from "@craftjs/core";

import Header from './Header';
import Sidebar from './Sidebar';

import Text from './Text';
import Dropdown from './Dropdown';
import Columns from './Columns';

const initialState = {
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

const FormEditor = ({ enabled, sidebarDomNode }) => {
  const { id } = useParams();
  const [form, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadForm = async () => {
      setLoading(true);
      const result = await axios(`/api/v1/forms/${id}`);
      dispatch({ type: 'RECEIVE_FORM', payload: result.data });
      setLoading(false);
    };

    loadForm();
  }, [id]);

  const handleSave = async (payload) => {
    const token = document.getElementsByName('csrf-token')[0].content;
    const result =  await axios.put(
      `/api/v1/forms/${id}`,
      { form: { payload }},
      { headers: { 'X-CSRF-TOKEN': token }},
    );
    dispatch({ type: 'RECEIVE_FORM', payload: result.data });
    return result;
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
        <Frame>
          <Canvas is="div" className="drag-area">
            {/*
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
            <Dropdown
              label="Choose a number"
              placeholder="Choose option"
              options={['One', 'Two', 'Three']}
              initialValue="Three"
            />
            <Text
              label="Curious George"
              initialValue="I have an initial value!"
            />
            <Text
              label="The Itsy Bitsy Spider"
            />
            <Columns totalColumns={2} />
            */}
          </Canvas>
        </Frame>
        {sidebarDomNode && sidebarDomNode.current && createPortal(<Sidebar />, sidebarDomNode.current)}
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
