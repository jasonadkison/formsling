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
} from './Properties';

const TextareaProperties = () => (
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

export default TextareaProperties;
