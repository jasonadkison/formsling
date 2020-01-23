import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import DragBox from './DragBox';
import DropdownProperties from './DropdownProperties';

const Dropdown = (props) => {
  const {
    name,
    initialValue,
    placeholder,
    helpText,
    readOnly,
    required,
    options,
  } = props;

  const [selected,  setSelected] = useState(initialValue);

  useEffect(() => {
    setSelected('');
  }, [placeholder]);

  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  return (
    <DragBox>
      <div className="field">
        <label className="label">
          {name}
          {required && (
            <>
              &nbsp;
              <span className="help is-danger is-inline">* required</span>
            </>
          )}
        </label>
        <div className="control">
          <Select
            options={options.map(option => ({ value: option, label: option }))}
            placeholder={placeholder}
            required={required}
            value={options.indexOf(selected) === -1 ? null : { value: selected, label: selected }}
          />
        </div>
        {helpText && (
          <p className="help">{helpText}</p>
        )}
      </div>
    </DragBox>
  );
};

Dropdown.propTypes = {
  name: PropTypes.string,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.string),
};

Dropdown.defaultProps = {
  name: 'Field Label',
  initialValue: '',
  placeholder: '',
  helpText: '',
  rows: 1,
  readOnly: false,
  required: true,
  options: [],
};

Dropdown.craft = {
  related: {
    properties: DropdownProperties,
  },
};

export default Dropdown;
