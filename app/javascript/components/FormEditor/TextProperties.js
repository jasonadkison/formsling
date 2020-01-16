import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import Property from './Property';

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
        <Property label="Label Text">
          <input
            className="input"
            type="text"
            defaultValue={label}
            onChange={(e) => {
              setProp(props => props.label = e.target.value);
            }}
          />
        </Property>
      </div>
      <div className="panel-block">
        <Property label="Placeholder">
          <input
            className="input"
            type="text"
            defaultValue={placeholder}
            onChange={(e) => {
              setProp(props => props.placeholder = e.target.value);
            }}
          />
        </Property>
      </div>
      <div className="panel-block">
        <Property label="Input Size">
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
        </Property>
      </div>
      <div className="panel-block">
        <Property label="Help Text">
          <input
            className="input"
            type="text"
            defaultValue={helpText}
            onChange={(e) => {
              setProp(props => props.helpText = e.target.value);
            }}
          />
        </Property>
      </div>
    </>
  );
};

export default TextareaProperties;
