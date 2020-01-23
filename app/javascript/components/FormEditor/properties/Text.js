import React from 'react';

import {
  Name,
  TextType,
  Label,
  Placeholder,
  DefaultValue,
  Rows,
  HelpText,
  InputAttributes,
} from './all';

const TextProperties = () => (
  <>
    <Name />
    <TextType />
    <InputAttributes />
    <Rows />
    <Placeholder />
    <HelpText />
    <DefaultValue />
  </>
);

export default TextProperties;
