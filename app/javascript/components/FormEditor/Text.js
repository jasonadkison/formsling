import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DraggableBox from './DraggableBox';
import TextProperties from './TextProperties';

const Text = (props) => {
  const {
    label,
    helpText,
    placeholder,
  } = props;

  return (
    <DraggableBox>
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder={placeholder}
          />
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
};

Text.craft = {
  related: {
    properties: TextProperties,
  },
};

export default Text;
