import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import bulmaTagsinput from 'bulma-tagsinput';
import CreatableSelect from 'react-select/creatable';

import Property from './Property';

const DropdownProperties = () => {
  const {
    setProp,
    label,
    options,
    initialValue,
    helpText,
    placeholder,
    readOnly,
    required,
  } = useNode(node => node.data.props);

  const [choices, setChoices] = useState(options.map(choice => ({ value: choice, label: choice })));

  useEffect(() => {
    bulmaTagsinput.attach('[type="choices"]');
  }, []);

  useEffect(() => {
    const options = choices.map(choice => choice.value);
    setProp(props => props.options = options);
  }, [choices]);

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
        <Property label="Choices">
          <>
          <CreatableSelect
            placeholder="Enter new option..."
            isClearable
            isMulti
            options={choices}
            value={choices}
            onChange={choices => setChoices(choices || [])}
            onCreateOption={choice => setChoices([...choices, { value: choice, label: choice }])}
            components={{
              ClearIndicator: () => null,
              DropdownIndicator: () => null,
              Menu: () => null,
              IndicatorSeparator: () => null,
            }}
            styles={{
              multiValue: (provided, state) => ({
                ...provided,
                background: '#eee',
              }),
              multiValueLabel: (provided, state) => ({
                ...provided,
                fontSize: '1rem',
              }),
              multiValueRemove: (provided, state) => ({
                ...provided,
                color: '#ff3300',
                cursor: 'pointer',
              }),
            }}
          />
          </>
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

export default DropdownProperties;
