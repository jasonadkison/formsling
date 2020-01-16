import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DraggableBox from './DraggableBox';
import TextProperties from './TextProperties';

const Text = (props) => {
  const {
    label,
    initialValue,
    placeholder,
    helpText,
    rows,
    readOnly,
    required,
  } = props;

  return (
    <DraggableBox>
      <div className="field">
        <label className="label">
          {label}
          {required && (
            <>
              &nbsp;
              <span className="help is-danger is-inline">* required</span>
            </>
          )}
        </label>
        <div className="control">
          {rows === '1' || rows === 1 ? (
            <input
              className="input"
              type="text"
              value={initialValue}
              placeholder={placeholder}
              readOnly
              required={required}
            />
          ) : (
            <textarea
              className="textarea"
              value={initialValue}
              placeholder={placeholder}
              rows={rows}
              readOnly
              required={required}
            />
          )}
        </div>
        {helpText && (
          <p className="help">{helpText}</p>
        )}
      </div>
    </DraggableBox>
  );
};

Text.propTypes = {
  label: PropTypes.string,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

Text.defaultProps = {
  label: 'Field Label',
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
