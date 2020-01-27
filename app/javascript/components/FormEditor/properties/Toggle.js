import React from 'react';
import { useNode } from '@craftjs/core';

import {
  Name,
  Label,
  Placeholder,
  ToggleType,
  ToggleOptions,
  DefaultValue,
  Rows,
  HelpText,
  InputAttributes,
} from './all';

const ToggleProperties = () => (
  <>
    <Name />
    <ToggleType />
    <ToggleOptions />
    <HelpText />
    <InputAttributes />
  </>
);

export default ToggleProperties;
