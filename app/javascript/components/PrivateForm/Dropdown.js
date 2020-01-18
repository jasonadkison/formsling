import React from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

const Dropdown = (props) => {
  const { id: nodeId } = useNode();

  const {
    label,
    placeholder,
    helpText,
    required,
    value,
  } = props;

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
      <div className="select">
        {/* Use a normal <select /> element because react-select's Select is unable to use
          * the "required" attribute in a practical manner.
          * See: https://github.com/JedWatson/react-select/issues/3140#issuecomment-514754657
        */}
        <select
          className="input"
          id={nodeId}
          required={required}
          defaultValue={value}
        >
          <option>{value}</option>
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
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
};

Dropdown.defaultProps = {
  label: 'Field Label',
  placeholder: '',
  helpText: '',
  required: true,
};

export default Dropdown;
