import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';
import { Context } from '../PublicForm';

const Dropdown = (props) => {
  const {
    name,
    helpText,
    required,
    readOnly,
    options,
  } = props;

  const selectedOption = options.find(option => option.selected);
  const initialValue = selectedOption ? selectedOption.value : '';

  const [value, setValue] = useState(initialValue);
  const { id } = useNode();
  const { state } = useContext(Context);

  const onChange = (e) => setValue(readOnly ? initialValue : e.target.value);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {name}
        {required && (
          <span className="help is-danger is-inline"> * required</span>
        )}
      </label>
      <div className="select is-fullwidth">
        <select
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          disabled={state.loading}
          data-name={name}
          data-value={value || (options.length ? options[0] : '')}
        >
          {options.map((option, index) => (
            <option key={option.id} value={index === 0 ? '' : option.value}>
              {option.name}
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
  name: PropTypes.string,
  helpText: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    selected: PropTypes.bool,
  })).isRequired,
};

Dropdown.defaultProps = {
  name: 'Field Name',
  helpText: '',
  readOnly: false,
  required: true,
  options: [],
};

export default Dropdown;
