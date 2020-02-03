import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';
import { Context } from '../PublicForm';

const Toggle = ({ name, type, display, helpText, options, required }) => {
  const { id } = useNode();
  const { state } = useContext(Context);
  const [optionsState, setOptionsState] = useState(options);

  const onChange = (e) => {
    const { checked: selected, id } = e.target;
    const nextOptionsState = optionsState.map((o) => {
      if (type === 'radio') {
        return o.id === id ? { ...o, selected } : { ...o, selected: false };
      } else {
        return o.id === id ? { ...o, selected } : { ...o };
      }
    });
    setOptionsState(nextOptionsState);
  };

  const finalValue = optionsState.filter(o => o.selected).map(o => o.name).join(' | ');

  return (
    <div
      className="field"
      data-name={name}
      data-value={finalValue}
    >
      <label className="label">
        {name}
        {required && (
          <span className="help is-danger is-inline"> * required</span>
        )}
      </label>

      <div className="control">
        {optionsState.map((option, index) => {
          let toggle = (
            <>
              <input
                className="is-checkradio"
                type={type}
                id={option.id}
                defaultChecked={option.selected}
                disabled={state.loading}
                name={id}
                onChange={onChange}
                required={index === 0 && required && !finalValue}
              />
              <label htmlFor={option.id}>
                {option.name}
              </label>
            </>
          );
          if (display === 'block') {
            toggle = <div className="field">{toggle}</div>;
          }
          return (
            <React.Fragment key={option.id}>
              {toggle}
            </React.Fragment>
          );
        })}
      </div>
      {helpText && (
        <p className="help">{helpText}</p>
      )}
    </div>
  );
};

export default Toggle;
