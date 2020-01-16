import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DraggableBox from './DraggableBox';
import TextareaProperties from './TextareaProperties';

const Textarea = (props) => {
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
          <textarea
            className="textarea"
            type="text"
            placeholder={placeholder}
            rows={rows}
          />
        </div>
        {helpText && (
          <p className="help">{helpText}</p>
        )}
      </div>
    </DraggableBox>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
};

Textarea.defaultProps = {
  label: 'Field Label',
  placeholder: '',
  helpText: '',
  rows: 4,
};

Textarea.craft = {
  related: {
    properties: TextareaProperties,
  },
};

export default Textarea;
