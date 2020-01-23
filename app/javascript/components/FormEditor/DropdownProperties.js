import React from 'react';
import { useNode } from '@craftjs/core';

import {
  Name,
  Label,
  Placeholder,
  DropdownAttributes,
  DefaultValue,
  Rows,
  HelpText,
  InputAttributes,
} from './Properties';

const DropdownProperties = () => (
  <>
    <Name />
    <DropdownAttributes />
    <Placeholder />
    <DefaultValue />
    <HelpText />
    <InputAttributes />
  </>
);

export default DropdownProperties;
