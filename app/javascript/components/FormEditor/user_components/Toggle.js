import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import UserComponent from './UserComponent';
import ToggleProperties from '../properties/Toggle';

const Toggle = (props) => {
  const {
    type,
    name,
    helpText,
    readOnly,
    required,
    options,
  } = props;

  return (
    <UserComponent>
      <div className="field">
        <label className="label">
          {name}
          {required && (
            <>
              &nbsp;
              <span className="help is-danger is-inline">* required</span>
            </>
          )}
        </label>
        <div className="control">
          {options.map((option) => (
            <React.Fragment key={option.id}>
              <input
                className="is-checkradio"
                type={type}
                readOnly
                onClick={(e) => e.preventDefault()}
                checked={option.selected || false}
                id={`checkradio-${option.id}`}
              />
              <label htmlFor={`checkradio-${option.id}`}>
                {option.name}
              </label>
            </React.Fragment>
          ))}
        </div>
        {helpText && (
          <p className="help">{helpText}</p>
        )}
      </div>
    </UserComponent>
  );
};

Toggle.propTypes = {
  type: PropTypes.oneOf(['radio', 'checkbox']),
  name: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  })).isRequired,
};

Toggle.defaultProps = {
  type: 'checkbox',
  name: 'Field Label',
  helpText: '',
  required: true,
  options: [],
};

Toggle.craft = {
  name: 'Toggle',
  related: {
    properties: ToggleProperties,
  },
};

export default Toggle;
