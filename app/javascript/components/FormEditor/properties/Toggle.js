import React from 'react';
import { useNode } from '@craftjs/core';

import {
  Name,
  ToggleType,
  ToggleOptions,
  Display,
  HelpText,
  InputAttributes,
} from './all';

const ToggleProperties = () => (
  <>
    <Name />
    <ToggleType />
    <ToggleOptions />
    <Display />
    <HelpText />
    <InputAttributes />
  </>
);

export default ToggleProperties;
