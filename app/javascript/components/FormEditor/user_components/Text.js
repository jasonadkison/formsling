import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

import UserComponent from './UserComponent';
import TextProperties from '../properties/Text';

const Text = (props) => {
  const { id } = useNode();
  const {
    name,
    type,
    initialValue,
    placeholder,
    helpText,
    rows,
    required,
  } = props;

  const hasRows = (rows && (['1', 1].indexOf(rows) === -1));
  const useTextarea = (!type || type === 'text') && hasRows;

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
          {useTextarea ? (
            <textarea
              className="textarea"
              value={initialValue}
              placeholder={placeholder}
              rows={rows}
              readOnly
              required={required}
              id={id}
            />
          ) : (
            <input
              type={type}
              className="input"
              value={initialValue}
              placeholder={placeholder}
              readOnly
              required={required}
              id={id}
            />
          )}
        </div>
        {helpText && (
          <p className="help" data-testid="help">{helpText}</p>
        )}
      </div>
    </UserComponent>
  );
};

Text.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool,
};

Text.defaultProps = {
  name: 'Field Name',
  type: 'text',
  initialValue: '',
  placeholder: '',
  helpText: '',
  rows: 1,
  required: true,
};

Text.craft = {
  name: 'Text',
  related: {
    properties: TextProperties,
  },
};

export default Text;
