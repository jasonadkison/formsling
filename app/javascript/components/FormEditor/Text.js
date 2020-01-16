import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DraggableBox from './DraggableBox';
import TextProperties from './TextProperties';

const Text = (props) => {
  const {
    label,
    placeholder,
    helpText,
    rows,
  } = props;

  return (
    <DraggableBox>
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          {rows === '1' || rows === 1 ? (
            <input
              className="input"
              type="text"
              placeholder={placeholder}
              disabled
            />
          ) : (
            <textarea
              className="textarea"
              placeholder={placeholder}
              rows={rows}
              disabled
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
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
};

Text.defaultProps = {
  label: 'Field Label',
  placeholder: '',
  helpText: '',
  rows: 1,
};

Text.craft = {
  related: {
    properties: TextProperties,
  },
};

export default Text;
