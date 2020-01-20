import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';
import { Context } from '../PublicForm';

const Dropdown = (props) => {
  const {
    name,
    label,
    initialValue,
    placeholder,
    helpText,
    readOnly,
    required,
    options,
  } = props;

  const [value, setValue] = useState(initialValue);
  const { id } = useNode();
  const { state } = useContext(Context);
  const onChange = (e) => setValue(e.target.value);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}&nbsp;
        {required && (
          <span className="help is-danger is-inline">* required</span>
        )}
      </label>
      <div className="select">
        {/* Use a normal <select /> element because react-select's Select is unable to use
          * the "required" attribute in a practical manner.
          * See: https://github.com/JedWatson/react-select/issues/3140#issuecomment-514754657
        */}
        <select
          className="input"
          id={id}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={state.loading}
          data-name={name}
          data-value={value}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>)
          )}
        </select>
      </div>
      {helpText && (
        <p className="help">{helpText}</p>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
};

Dropdown.defaultProps = {
  label: 'Field Label',
  initialValue: '',
  placeholder: '',
  helpText: '',
  rows: 1,
  readOnly: false,
  required: true,
  options: [],
};

export default Dropdown;
