import React from 'react';

import {
  Name,
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
    <InputAttributes />
    <Rows />
    <Placeholder />
    <HelpText />
    <DefaultValue />
  </>
);

export default TextareaProperties;
