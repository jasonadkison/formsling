import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

import { Context } from '../PublicForm';

const Text = ({ label, rows, initialValue, placeholder, readOnly, required }) => {
  const { id: nodeId, setProp } = useNode();
  const { state, dispatch } = useContext(Context);

  const { [nodeId]: node } = state;

  const inputProps = {
    id: nodeId,
    className: "input",
    placeholder,
    readOnly,
    required,
    value: node ? node.value : initialValue,
    onChange: (e) => {
      dispatch({ type: 'UPDATE', payload: { nodeId, label, value: e.target.value }});
      setProp(props => props.value = e.target.value);
    },
  };

  return (
    <div className="field">
      <label className="label" htmlFor={nodeId}>
        {label}
        {required && (
          <>
            &nbsp;
            <span className="help is-danger is-inline">* required</span>
          </>
        )}
      </label>
      <div className="control">
        {rows === '1' || rows === 1 ? (
          <input {...inputProps} type="text" />
        ) : (
          <textarea {...inputProps} rows={rows} />
        )}
      </div>
    </div>
  );
};

export default Text;
