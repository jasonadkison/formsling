import React from 'react';
import { useNode } from '@craftjs/core';
import Panel from './Panel';

import {
  Name,
  HelpText,
  InputAttributes,
} from './all';

const DefaultDate = () => {
  const { setProp, initialValue } = useNode(node => node.data.props);

  return (
    <Panel label="Initial Value">
      <input
        className="input is-small"
        type="date"
        defaultValue={initialValue}
        onChange={(e) => {
          setProp(props => props.initialValue = e.target.value);
        }}
      />
    </Panel>
  );
};

const DateProperties = () => {
  return (
    <>
      <Name />
      <InputAttributes />
      <HelpText />
      <DefaultDate />
    </>
  );
};

export default DateProperties;
