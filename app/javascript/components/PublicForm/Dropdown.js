import React from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';
import Select from 'react-select';

const Dropdown = (props) => {
  const { id: nodeId } = useNode();
  const {
    label,
    initialValue,
    placeholder,
    helpText,
    readOnly,
    required,
    options,
  } = props;

  const defaultValue = initialValue && options.indexOf(initialValue) !== -1 ?
    { value: initialValue, label: initialValue } :
    undefined;

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
          <Select
            inputId={nodeId}
            options={options.map(option => ({ value: option, label: option }))}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
          />
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
