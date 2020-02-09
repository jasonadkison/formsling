import React from 'react';
import { useNode } from '@craftjs/core';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { parseDate, formatDate } from '../../utils';
import Panel from './Panel';

import {
  Name,
  HelpText,
  InputAttributes,
} from './all';

const DefaultDate = () => {
  const { setProp, initialValue } = useNode(node => node.data.props);

  return (
    <Panel label="Initial Date">
      <DayPickerInput
        inputProps={{
          className: 'input is-small',
          required: true,
        }}
        onDayChange={(day) => {
          setProp(props => props.initialValue = (day ? formatDate(day, 'MM/dd/yyyy') : ''))
        }}
        style={{ display: 'block' }}
        formatDate={formatDate}
        format="MM/dd/yyyy"
        parseDate={parseDate}
        placeholder="MM/DD/YYYY"
        value={initialValue}
      />
    </Panel>
  );
};

const DateProperties = () => {
  return (
    <>
      <Name />
      <InputAttributes />
      <HelpText />
      <DefaultDate />
    </>
  );
};

export default DateProperties;
