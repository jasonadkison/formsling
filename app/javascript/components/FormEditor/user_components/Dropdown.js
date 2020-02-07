import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

import UserComponent from './UserComponent';
import DropdownProperties from '../properties/Dropdown';

const Dropdown = (props) => {
  const { id } = useNode();
  const {
    name,
    initialValue,
    placeholder,
    helpText,
    required,
    options,
  } = props;

  const [selected,  setSelected] = useState(initialValue);

  useEffect(() => {
    setSelected('');
  }, [placeholder]);

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  return (
    <UserComponent>
      <div className="field">
        <label className="label" htmlFor={id}>
          {name}
          {required && (
            <>
              &nbsp;
              <span className="help is-danger is-inline">* required</span>
            </>
          )}
        </label>
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select
              id={id}
              value={options.indexOf(selected) === -1 ? '' : selected}
              required={required}
              readOnly
              className="input"
            >
              {placeholder && (
                <option disabled>{placeholder}</option>
              )}
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        {helpText && (
          <p className="help" data-testid="help">{helpText}</p>
        )}
      </div>
    </UserComponent>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
};

Dropdown.defaultProps = {
  name: 'Field Label',
  initialValue: '',
  placeholder: '',
  helpText: '',
  required: true,
  options: [],
};

Dropdown.craft = {
  name: 'Dropdown',
  related: {
    properties: DropdownProperties,
  },
};

export default Dropdown;
