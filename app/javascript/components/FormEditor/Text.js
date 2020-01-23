import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DragBox from './DragBox';
import TextProperties from './properties/Text';

const Text = (props) => {
  const {
    name,
    type,
    initialValue,
    placeholder,
    helpText,
    rows,
    readOnly,
    required,
  } = props;

  const hasRows = (rows && (['1', 1].indexOf(rows) === -1));
  const useTextarea = (!type || type === 'text') && hasRows;

  return (
    <DragBox>
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
          {useTextarea ? (
            <textarea
              className="textarea"
              value={initialValue}
              placeholder={placeholder}
              rows={rows}
              readOnly
              required={required}
            />
          ) : (
            <input
              type={type}
              className="input"
              value={initialValue}
              placeholder={placeholder}
              readOnly
              required={required}
            />
          )}
        </div>
        {helpText && (
          <p className="help">{helpText}</p>
        )}
      </div>
    </DragBox>
  );
};

Text.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

Text.defaultProps = {
  name: 'Field Name',
  type: '',
  initialValue: '',
  placeholder: '',
  helpText: '',
  rows: 1,
  readOnly: false,
  required: true,
};

Text.craft = {
  related: {
    properties: TextProperties,
  },
};

export default Text;
