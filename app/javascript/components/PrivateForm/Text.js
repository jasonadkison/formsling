import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNode } from '@craftjs/core';

const Text = ({ label, rows, value, required}) => {
  const { id: nodeId } = useNode();
  const inputProps = { id: nodeId, defaultValue: value };

  return (
    <div className="field">
      <label className="label" htmlFor={nodeId}>
        {label}
        {required && (
          <>
            &nbsp;
            <span className="help is-danger is-inline">* required</span>
          </>
        )}
      </label>
      <div className="control">
        {rows === '1' || rows === 1 ? (
          <input {...inputProps} className="input" type="text" />
        ) : (
          <textarea {...inputProps} className="textarea" rows={rows} />
        )}
      </div>
    </div>
  );
};

export default Text;
