import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

const Textarea = (props) => {
  const {
    label,
    placeholder,
    helpText,
    rows,
  } = props;

  const { connectors: { connect, drag }, isActive, setProp } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      ref={ref => connect(drag(ref))}
      className={`box ${isActive ? 'selected' : ''}`}
    >
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
    </div>
  );
};

const TextareaProperties = () => {
  const {
    setProp,
    label,
    helpText,
    placeholder,
    rows,
  } = useNode(node => node.data.props);

  return (
    <>
      <div className="panel-block">
        <div className="control">
          <label className="label">
            Label Text
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              defaultValue={label}
              onChange={(e) => {
                setProp(props => props.label = e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <label className="label">
            Placeholder
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              defaultValue={placeholder}
              onChange={(e) => {
                setProp(props => props.placeholder = e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <label className="label">
            Initial Size
          </label>
          <div className="control">
            <input
              className="slider is-fullwidth"
              type="range"
              step="1"
              min="1"
              max="18"
              defaultValue={rows}
              onChange={(e) => {
                setProp(props => props.rows = e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <label className="label">
            Help Text
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              defaultValue={helpText}
              onChange={(e) => {
                setProp(props => props.helpText = e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
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
