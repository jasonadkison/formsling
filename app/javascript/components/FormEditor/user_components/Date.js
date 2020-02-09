import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { parseDate, formatDate } from '../../utils';

import UserComponent from './UserComponent';
import DateProperties from '../properties/Date';

const DateField = (props) => {
  const { id } = useNode();
  const {
    name,
    initialValue,
    helpText,
    required,
  } = props;

  // updates the key when the picker is hidden
  // this causes a re-render and resets the picker state so it mimicks a readonly field
  const onDayPickerHide = () => setKey(new Date().getTime());
  const [key, setKey] = useState(new Date().getTime());

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
          <DayPickerInput
            inputProps={{
              id,
              className: 'input',
              readOnly: true,
              required,
            }}
            style={{ display: 'block' }}
            formatDate={formatDate}
            format="MM/dd/yyyy"
            parseDate={parseDate}
            placeholder="MM/DD/YYYY"
            onDayPickerHide={onDayPickerHide}
            key={key}
            value={initialValue}
          />
        </div>
        {helpText && (
          <p className="help" data-testid="help">{helpText}</p>
        )}
      </div>
    </UserComponent>
  );
};

DateField.propTypes = {
  name: PropTypes.string,
  initialValue: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
};

DateField.defaultProps = {
  name: 'Date',
  initialValue: '',
  helpText: '',
  required: true,
};

DateField.craft = {
  name: 'Date',
  related: {
    properties: DateProperties,
  },
};

export default DateField;
