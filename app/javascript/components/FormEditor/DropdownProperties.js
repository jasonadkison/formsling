import React from 'react';
import { useNode } from '@craftjs/core';

import {
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
    <Label />
    <Placeholder />
    <DropdownAttributes />
    <DefaultValue />
    <HelpText />
    <InputAttributes />
  </>
);

export default DropdownProperties;
