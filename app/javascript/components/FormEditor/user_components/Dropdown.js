import React from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';
import nanoid from 'nanoid';

import UserComponent from './UserComponent';
import DropdownProperties from '../properties/Dropdown';

const Dropdown = (props) => {
  const { id } = useNode();
  const {
    name,
    helpText,
    required,
    options,
  } = props;

  const selectedOption = options.find(option => option.selected);
  const value = selectedOption ? selectedOption.value : '';

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
              value={value}
              required={required}
              readOnly
            >
              {options.map((option, index) => (
                <option key={option.id} value={index === 0 ? '' : option.value}>
                  {option.name}
                </option>
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
  helpText: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  })).isRequired,
};

Dropdown.defaultProps = {
  name: 'Field Name',
  helpText: '',
  required: true,
  options: [{
    id: nanoid(),
    name: 'Choose an option',
    value: '',
  }, {
    id: nanoid(),
    name: 'Option A',
    value: 'a',
  }, {
    id: nanoid(),
    name: 'Option B',
    value: 'b',
  }, {
    id: nanoid(),
    name: 'Option C',
    value: 'c',
  }],
};

Dropdown.craft = {
  name: 'Dropdown',
  related: {
    properties: DropdownProperties,
  },
};

export default Dropdown;
