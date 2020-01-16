import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

const Text = (props) => {
  const {
    label,
    helpText,
    placeholder,
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
    </div>
  );
};

const TextProperties = () => {
  const { setProp, label, helpText, placeholder } = useNode(node => node.data.props);

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
