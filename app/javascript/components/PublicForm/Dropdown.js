import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

import { Context } from '../PublicForm';

const Dropdown = (props) => {
  const { id: nodeId, setProp } = useNode();
  const { state, dispatch } = useContext(Context);
  const { nodes: { [nodeId]: node } } = state;

  const {
    label,
    initialValue,
    placeholder,
    helpText,
    readOnly,
    required,
    options,
  } = props;

  const defaultValue = initialValue && options.indexOf(initialValue) !== -1
    ? initialValue
    : undefined;

  const onChange = (e) => {
    const { value } = e.target;
    dispatch({ type: 'UPDATE_NODE', payload: { nodeId, label, value }});
    setProp(props => props.value = value);
  };

  const value = node ? node.value : defaultValue;

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
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            disabled={state.loading}
          >
            {placeholder && (
              <option value="">{placeholder}</option>
            )}
            {options.map(option => <option key={option} value={option}>{option}</option>)}
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
