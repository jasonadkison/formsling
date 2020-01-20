import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';
import { Context } from '../PublicForm';

const Text = ({ label, rows, initialValue, placeholder, readOnly, required, helpText }) => {
  const [value, setValue] = useState(initialValue);
  const { id } = useNode();
  const { state } = useContext(Context);

  const inputProps = {
    id,
    placeholder,
    readOnly,
    required,
    disabled: state.loading,
    onChange: e => setValue(e.target.value),
    'data-value': value,
    name: `text-${id}`,
  };

  const singleLine = (rows === '1' || rows === 1);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}&nbsp;
        {required && (
          <span className="help is-danger is-inline">* required</span>
        )}
      </label>
      <div className="control">
        {singleLine ? (
          <input {...inputProps} className="input" type="text" />
        ) : (
          <textarea {...inputProps} className="textarea" rows={rows} />
        )}
      </div>
      {helpText && (
        <p className="help">{helpText}</p>
      )}
    </div>
  );
};

export default Text;
