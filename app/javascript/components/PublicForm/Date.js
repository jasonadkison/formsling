import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { parseDate, formatDate } from '../utils';

import { Context } from '../PublicForm';

const Date = ({ name, initialValue, readOnly, required, helpText }) => {
  const [value, setValue] = useState(initialValue);
  const { id } = useNode();
  const { state } = useContext(Context);

  const onDayChange = (day) => {
    if (day) {
      setValue(formatDate(day, 'MM/dd/yyyy'));
    }
  };

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {name}
        {required && (
          <span className="help is-danger is-inline"> * required</span>
        )}
      </label>
      <div className="control">
        <DayPickerInput
          inputProps={{
            id,
            name,
            className: 'input',
            readOnly,
            required,
            disabled: state.loading,
            'data-name': name,
            'data-value': value,
          }}
          style={{ display: 'block' }}
          formatDate={formatDate}
          format="MM/dd/yyyy"
          parseDate={parseDate}
          placeholder="MM/DD/YYYY"
          onDayChange={onDayChange}
          value={initialValue}
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
