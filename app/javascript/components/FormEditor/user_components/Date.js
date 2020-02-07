import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

import UserComponent from './UserComponent';
import DateProperties from '../properties/Date';

const Date = (props) => {
  const { id } = useNode();
  const {
    name,
    initialValue,
    helpText,
    required,
  } = props;

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
        <div className="control">
          <input
            type="date"
            className="input"
            value={initialValue}
            readOnly
            required={required}
            placeholder="yyyy-mm-dd" // fallback for safari/ie
            id={id}
          />
        </div>
        {helpText && (
          <p className="help" data-testid="help">{helpText}</p>
        )}
      </div>
    </UserComponent>
  );
};

Date.propTypes = {
  name: PropTypes.string,
  initialValue: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
};

Date.defaultProps = {
  name: 'Date',
  initialValue: '',
  helpText: '',
  required: true,
};

Date.craft = {
  name: 'Date',
  related: {
    properties: DateProperties,
  },
};

export default Date;
