import React from 'react';
import PropTypes from 'prop-types';
import { Canvas } from '@craftjs/core';

const Columns = ({ totalColumns }) => {
  let columns = [];

  for (let i = 0; i < totalColumns; i++) {
    columns.push(<Canvas key={i} id={`column-${i}`} className="column" />);
  }

  return (
    <div className="columns">
      {columns}
    </div>
  );
};

Columns.propTypes = {
  totalColumns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Columns.defaultProps = {
  totalColumns: 2,
};

export default Columns;
