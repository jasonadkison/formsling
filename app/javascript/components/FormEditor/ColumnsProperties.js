import React, { useState } from 'react';
import { useNode } from '@craftjs/core';
import Property from './Property';

const ColumnsProperties = () => {
  const {
    setProp,
    totalColumns,
  } = useNode(node => node.data.props);

  return (
    <div className="panel-block">
      <Property label="Total Columns">
        <input
          className="slider is-fullwidth"
          type="range"
          step="1"
          min="1"
          max="12"
          defaultValue={totalColumns}
          onChange={(e) => {
            setProp(props => props.totalColumns = e.target.value);
          }}
        />
      </Property>
    </div>
  );
};

export default ColumnsProperties;
