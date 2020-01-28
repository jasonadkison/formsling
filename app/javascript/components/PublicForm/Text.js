import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';
import { Context } from '../PublicForm';

const Text = ({ name, type, rows, initialValue, placeholder, readOnly, required, helpText }) => {
  const [value, setValue] = useState(initialValue);
  const { id } = useNode();
  const { state } = useContext(Context);

  const commonProps = {
    name,
    id,
    placeholder,
    readOnly,
    required,
    disabled: state.loading,
    onChange: e => setValue(e.target.value),
    value,
    'data-name': name,
    'data-value': value,
  };

  if (type === 'number') commonProps.step = '0.01'

  const hasRows = (rows && (['1', 1].indexOf(rows) === -1));
  const useTextarea = (!type || type === 'text') && hasRows;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {name}
        {required && (
          <span className="help is-danger is-inline"> * required</span>
        )}
      </label>
      <div className="control">
        {useTextarea ? (
          <textarea {...commonProps} className="textarea" rows={rows} />
        ) : (
          <input {...commonProps} className="input" type={type} />
        )}
      </div>
      {helpText && (
        <p className="help">{helpText}</p>
      )}
    </div>
  );
};

Text.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

Text.defaultProps = {
  name: 'Field Name',
  type: '',
  initialValue: '',
  placeholder: '',
  helpText: '',
  readOnly: false,
  required: true,
};

export default Text;
