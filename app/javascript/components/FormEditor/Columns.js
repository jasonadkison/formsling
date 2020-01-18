import React from 'react';
import PropTypes from 'prop-types';
import { useNode, Canvas } from '@craftjs/core';

import ColumnsProperties from './ColumnsProperties';
import DragBox from './DragBox';

const Columns = ({ totalColumns }) => {
  let columns = [];

  for (let i = 0; i < totalColumns; i++) {
    columns.push(<Canvas key={i} id={`column-${i}`} className="column is-crafted" />);
  }

  return (
    <DragBox label="Columns">
      <div className="columns">
        {columns}
      </div>
    </DragBox>
  );
};

Columns.propTypes = {
  totalColumns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Columns.defaultProps = {
  totalColumns: 2,
};

Columns.craft = {
  related: {
    properties: ColumnsProperties,
  },
};

export default Columns;
