import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import nanoid from 'nanoid';
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

export const TextAlignment = () => {
  const { setProp, textAlignment } = useNode(node => node.data.props);

  return (
    <Panel label="Text Alignment">
      <div className="select is-small is-fullwidth">
        <select
          onChange={(e) => setProp(props => props.textAlignment = e.target.value)}
          defaultValue={textAlignment}
        >
          <option value="left">Left</option>
          <option value="centered">Centered</option>
          <option value="right">Right</option>
        </select>
      </div>
    </Panel>
  );
};

export const Text = () => {
  const { setProp, text } = useNode(node => node.data.props);

  return (
    <Panel label="Text">
      <input
        className="input is-small"
        type="text"
        defaultValue={text}
        onChange={(e) => {
          setProp(props => props.text = e.target.value);
        }}
      />
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

export const ToggleType = () => {
  const { id, setProp, options, type } = useNode(node => node.data.props);

  return (
    <Panel label="Toggle Type">
      <div className="field">
        <div className="control has-margin-bottom-10">
          <label className="radio is-size-7">
            <input
              type="radio"
              name={`type-${id}`}
              defaultChecked={type === 'checkbox'}
              onChange={(e) => e.target.checked && setProp(props => props.type = 'checkbox')}
            />
            Checkboxes
          </label>
          <label className="radio is-size-7">
            <input
              type="radio"
              name={`type-${id}`}
              defaultChecked={type === 'radio'}
              onChange={(e) => e.target.checked && setProp(props => props.type = 'radio')}
            />
            Radios
          </label>
        </div>
      </div>
    </Panel>
  );
};

export const ToggleOptions = () => {
  const getDefaultOptions = () => [
    { id: nanoid(), name: 'Option 1' },
    { id: nanoid(), name: 'Option 2' },
    { id: nanoid(), name: 'Option 3' },
  ];

  const { setProp, options, type } = useNode(node => node.data.props);
  const [choices, setChoices] = useState(options.length ? options : getDefaultOptions());

  // This updates the user component props each time state changes.
  useEffect(() => setProp(props => props.options = choices), [choices]);

  // Updates options state.
  // When switching type to 'radio', this will uncheck all selected options except the first.
  useEffect(() => {
    if (type === 'radio') {
      const firstSelected = choices.find(choice => choice.selected);
      setChoices(choices.map((c) => {
        return firstSelected && c.id === firstSelected.id ? c : { ...c, selected: false };
      }));
    }
  }, [type]);

  // Updates options state.
  // When type is 'radio' this ensures only one option is selected.
  const updateOptionSelected = (id, nextOption) => {
    const nextChoices = type === 'radio' && nextOption.selected ? (
      choices.map(c => c.id === id ? { ...c, ...nextOption } : { ...c, selected: false })
    ) : (
      choices.map(c => c.id === id ? { ...c, ...nextOption } : c)
    );

    setChoices(nextChoices);
  };

  // Updates option name in state.
  const updateOptionName = (id, name) => {
    setChoices(choices.map(choice => choice.id === id ? { ...choice, name } : choice));
  };

  // Removes option from state.
  // Ensures there is always at least one option.
  const removeOption = id => setChoices(choices.filter(choice => choice.id !== id));

  // Adds a new option to state.
  const onClickAdd = () => {
    const name = 'New Option';
    const id = nanoid();
    setChoices([...choices, { id, name }]);
  };

  return (
    <Panel label="Toggle Options">
      {choices.map((choice, index) => (
        <div className="field is-grouped" key={choice.id}>
          <div className="control">
            <label className={`type is-marginless`}>
              <input
                className="is-marginless"
                type={type}
                checked={choice.selected || false}
                readOnly
                onClick={(e) => updateOptionSelected(choice.id, { selected: !choice.selected })}
              />
            </label>
          </div>
          <div className="control">
            <input
              type="text"
              className="input is-small"
              defaultValue={choice.name}
              onChange={(e) => updateOptionName(choice.id, e.target.value)}
            />
          </div>
          <div className="control">
            {index !== 0 && (
              <button
                className="button is-small is-danger"
                onClick={() => removeOption(choice.id)}
              >
                <span className="icon">
                  <i className="fas fa-trash" />
                </span>
              </button>
            )}
          </div>
          {(index + 1) === choices.length && (
            <div className="control">
              <button
                className="button is-small is-success"
                onClick={onClickAdd}
              >
                <span className="icon">
                  <i className="fas fa-plus" />
                </span>
              </button>
            </div>
          )}
        </div>
      ))}
    </Panel>
  );
};


