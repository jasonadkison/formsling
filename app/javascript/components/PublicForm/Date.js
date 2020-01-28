import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';
import { Context } from '../PublicForm';

const Date = ({ name, initialValue, readOnly, required, helpText }) => {
  const [value, setValue] = useState(initialValue);
  const { id } = useNode();
  const { state } = useContext(Context);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {name}
        {required && (
          <span className="help is-danger is-inline"> * required</span>
        )}
      </label>
      <div className="control">
        <input
          name={name}
          id={id}
          readOnly={readOnly}
          required={required}
          disabled={state.loading}
          onChange={e => setValue(e.target.value)}
          data-name={name}
          data-value={value}
          value={value}
          className="input"
          type="date"
        />
      </div>
      {helpText && (
        <p className="help">{helpText}</p>
      )}
    </div>
  );
};

Date.propTypes = {
  name: PropTypes.string,
  initialValue: PropTypes.string,
  helpText: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

Date.defaultProps = {
  name: 'Field Name',
  initialValue: '',
  helpText: '',
  readOnly: false,
  required: true,
};

export default Date;
