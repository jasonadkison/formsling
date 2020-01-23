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
    <Placeholder />
    <DropdownAttributes />
    <DefaultValue />
    <HelpText />
    <InputAttributes />
  </>
);

export default DropdownProperties;
