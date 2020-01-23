import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DragBox from './DragBox';
import TextProperties from './TextProperties';

const Text = (props) => {
  const {
    name,
    initialValue,
    placeholder,
    helpText,
    rows,
    readOnly,
    required,
  } = props;

  return (
    <DragBox label="Text">
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
    </DragBox>
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
