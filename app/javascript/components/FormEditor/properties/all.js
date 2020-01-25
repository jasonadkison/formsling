import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import CreatableSelect from 'react-select/creatable';

import Panel from './Panel';

export const Name = ({children}) => {
  const { setProp, name } = useNode(node => node.data.props);

  return (
    <Panel label="Field Name">
      <input
        className="input is-small"
        type="text"
        defaultValue={name}
        onChange={(e) => {
          setProp(props => props.name = e.target.value);
        }}
      />
      {children}
    </Panel>
  );
};

export const TextType = () => {
  const { setProp, type } = useNode(node => node.data.props);

  return (
    <Panel label="Type">
      <div className="select is-small is-fullwidth">
        <select
          onChange={(e) => setProp(props => props.type = e.target.value)}
          defaultValue={type}
        >
          <option value="text">Text</option>
          <option value="number">Numeric</option>
          <option value="email">Email</option>
          <option value="url">URL</option>
        </select>
      </div>
    </Panel>
  );
};

export const Placeholder = () => {
  const { setProp, placeholder } = useNode(node => node.data.props);

  return (
    <Panel label="Placeholder Text">
      <input
        className="input is-small"
        type="text"
        defaultValue={placeholder}
        onChange={(e) => {
          setProp(props => props.placeholder = e.target.value);
        }}
      />
    </Panel>
  );
};

export const DefaultValue = () => {
  const { setProp, initialValue } = useNode(node => node.data.props);

  return (
    <Panel label="Initial Value">
      <input
        className="input is-small"
        type="text"
        defaultValue={initialValue}
        onChange={(e) => {
          setProp(props => props.initialValue = e.target.value);
        }}
      />
    </Panel>
  );
};

export const Rows = () => {
  const { setProp, rows } = useNode(node => node.data.props);

  return (
    <Panel label="Size">
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
    </Panel>
  );
};

export const HelpText = () => {
  const { setProp, helpText } = useNode(node => node.data.props);

  return (
    <Panel label="Help Text">
      <input
        className="input is-small"
        type="text"
        defaultValue={helpText}
        onChange={(e) => {
          setProp(props => props.helpText = e.target.value);
        }}
      />
    </Panel>
  );
};

export const InputAttributes = () => {
  const { id, setProp, required, readOnly } = useNode(node => node.data.props);

  return (
    <Panel>
      <div className="field is-marginless">
        <input
          className="is-checkradio is-small"
          id={`is-required-${id}`}
          type="checkbox"
          defaultChecked={required}
          onChange={(e) => {
            setProp(props => props.required = e.target.checked)
          }}
        />
        <label htmlFor={`is-required-${id}`}>Required</label>

        <input
          className="is-checkradio is-small"
          id={`is-readonly-${id}`}
          type="checkbox"
          defaultChecked={readOnly}
          onChange={(e) => {
            setProp(props => props.readOnly = e.target.checked)
          }}
        />
        <label htmlFor={`is-readonly-${id}`}>Read-Only</label>
      </div>
    </Panel>
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
    <Panel label="Dropdown Options">
      <CreatableSelect
        placeholder="Enter options..."
        isClearable
        isMulti
        options={choices}
        value={choices}
        onChange={choices => setChoices(choices || [])}
        onCreateOption={choice => setChoices([...choices, { value: choice, label: choice }])}
        components={{
          ClearIndicator: () => null,
          DropdownIndicator: () => null,
          //Menu: () => null,
          IndicatorSeparator: () => null,
          Placeholder: () => <span className="is-size-7">Type options and press enter</span>,
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
          control: (provided) => ({
            ...provided,
            borderRadius: 0,
          })
        }}
      />
    </Panel>
  );
};


