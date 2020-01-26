import React from 'react';
import { useNode } from '@craftjs/core';

import {
  Name,
  Label,
  Placeholder,
  ToggleBehavior,
  ToggleOptions,
  DefaultValue,
  Rows,
  HelpText,
  InputAttributes,
} from './all';

const ToggleProperties = () => (
  <>
    <Name />
    <ToggleBehavior />
    <ToggleOptions />
    <HelpText />
    <InputAttributes />
  </>
);

export default ToggleProperties;
