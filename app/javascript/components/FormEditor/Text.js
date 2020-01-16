import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

const Text = (props) => {
  const {
    label,
    helpText,
  } = props;

  const { connectors: { connect, drag }, isActive, setProp } = useNode((node) => ({
    isActive: node.events.selected,
  }));

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div
      ref={ref => connect(drag(ref))}
      className={`box ${isActive ? 'is-active' : ''}`}
    >
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" />
        </div>
        {helpText && (
          <p className="help">{helpText}</p>
        )}
      </div>
    </div>
  );
};

const TextProperties = () => {
  const { setProp, label, helpText } = useNode((node) => ({
    label: node.data.props.label,
    helpText: node.data.props.helpText,
  }));

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
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired,
};

Text.defaultProps = {
  label: 'Field Label',
  helpText: '',
};

Text.craft = {
  related: {
    properties: TextProperties,
  },
};

export default Text;
