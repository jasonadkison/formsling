import React from 'react';
import { useNode } from '@craftjs/core';

import { Text, TextAlignment } from './all';
import Panel from './Panel';

const Type = () => {
  const { setProp, type } = useNode(node => node.data.props);

  return (
    <Panel label="Type">
      <div className="select is-small is-fullwidth">
        <select
          onChange={(e) => setProp(props => props.type = e.target.value)}
          defaultValue={type}
        >
          <option value="h1">h1</option>
          <option value="h2">h2</option>
          <option value="h3">h3</option>
          <option value="h4">h4</option>
          <option value="h5">h5</option>
          <option value="h6">h6</option>
        </select>
      </div>
    </Panel>
  );
};

const HeadingProperties = () => (
  <>
    <Text />
    <Type />
    <TextAlignment />
  </>
);

export default HeadingProperties;

