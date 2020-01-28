import React from 'react';
import { useNode } from '@craftjs/core';

import {
  Name,
  TextType,
  Placeholder,
  DefaultValue,
  Rows,
  HelpText,
  InputAttributes,
} from './all';

const TextProperties = () => {
  const { type } = useNode(node => node.data.props);

  return (
    <>
      <Name />
      <InputAttributes />
      <TextType />
      {!type || type === 'text' && (
        <Rows />
      )}
      <Placeholder />
      <HelpText />
      <DefaultValue />
    </>
  );
};

export default TextProperties;
