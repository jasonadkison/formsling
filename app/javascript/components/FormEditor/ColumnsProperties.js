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
      <Property>
        <p>Columns don't have any properties to manage.</p>
      </Property>
    </div>
  );
};

export default ColumnsProperties;
