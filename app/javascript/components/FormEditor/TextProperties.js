import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import Property from './Property';

const TextareaProperties = () => {
  const {
    setProp,
    label,
    initialValue,
    helpText,
    placeholder,
    rows,
    readOnly,
    required,
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
        <Property label="Placeholder Text">
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
        <Property label="Initial Value">
          <input
            className="input"
            type="text"
            defaultValue={initialValue}
            onChange={(e) => {
              setProp(props => props.initialValue = e.target.value);
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
      <div className="panel-block">
        <Property label="Attributes">
          <>
            <div className="field">
              <input
                className="is-checkradio"
                id="is-required"
                type="checkbox"
                defaultChecked={required}
                onChange={(e) => {
                  setProp(props => props.required = e.target.checked)
                }}
              />
              <label htmlFor="is-required">Required Field</label>
            </div>
            <div className="field">
              <input
                className="is-checkradio"
                id="is-readonly"
                type="checkbox"
                defaultChecked={readOnly}
                onChange={(e) => {
                  setProp(props => props.readOnly = e.target.checked)
                }}
              />
              <label htmlFor="is-readonly">Read-Only Field</label>
            </div>
          </>
        </Property>
      </div>
    </>
  );
};

export default TextareaProperties;
