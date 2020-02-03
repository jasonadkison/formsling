import React from 'react';
import PropTypes from 'prop-types';
import { useEditor } from '@craftjs/core';

import resolvers from './resolvers';

const Tool = ({ name, icon }) => {
  const { connectors: { create }, actions: { add, move }, query: { createNode } } = useEditor();

  const UserComponent = resolvers[name];

  return (
    <a
      className="button"
      ref={ref => create(ref, <UserComponent />)}
      data-tooltip={name}
      onClick={() => {
        const node = createNode(<UserComponent />);
        add(node, 'canvas-ROOT');
        move(node.id, 'canvas-ROOT', 0);
      }}
    >
      <span className="icon">
        {icon}
      </span>
    </a>
  );
};

Tool.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.any,
};

export default Tool;
