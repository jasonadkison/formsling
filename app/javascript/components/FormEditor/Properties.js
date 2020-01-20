import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import CreatableSelect from 'react-select/creatable';

import Property from './Property';

export const Name = () => {
  const { setProp, name } = useNode(node => node.data.props);

  return (
    <div className="panel-block">
      <Property label="Field Name">
        <input
          className="input"
          type="text"
          defaultValue={name}
          onChange={(e) => {
            setProp(props => props.name = e.target.value);
          }}
        />
        <p className="help">Hidden from the end user.</p>
      </Property>
    </div>
  );
};

export const Label = () => {
  const { setProp, label } = useNode(node => node.data.props);

  return (
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
        <p className="help">Visible to the end user.</p>
      </Property>
    </div>
  );
};

export const Placeholder = () => {
  const { setProp, placeholder } = useNode(node => node.data.props);

  return (
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
  );
};

export const DefaultValue = () => {
  const { setProp, initialValue } = useNode(node => node.data.props);

  return (
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
  );
};

export const Rows = () => {
  const { setProp, rows } = useNode(node => node.data.props);

  return (
    <div className="panel-block">
      <Property label="Size">
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
        <p className="help">The total number of rows.</p>
      </Property>
    </div>
  );
};

export const HelpText = () => {
  const { setProp, helpText } = useNode(node => node.data.props);

  return (
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
  );
};

export const InputAttributes = () => {
  const { setProp, required, readOnly } = useNode(node => node.data.props);

  return (
    <div className="panel-block">
      <Property label="Input Attributes">
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
  );
};

export const DropdownAttributes = () => {
  const { setProp, options } = useNode(node => node.data.props);
  const [choices, setChoices] = useState(options.map(choice => ({ value: choice, label: choice })));

  useEffect(() => {
    const options = choices.map(choice => choice.value);
    setProp(props => props.options = options);
  }, [choices]);

  return (
    <div className="panel-block">
      <Property label="Dropdown Options">
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
        <p className="help">Add new options by typing them in and pressing the enter key.</p>
      </Property>
    </div>
  );
};


