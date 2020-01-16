import React from 'react';
import { useNode } from '@craftjs/core';

const Text = ({text, fontSize}) => {
  const { connectors: { connect, drag } } = useNode();
  return (
    <div ref={ref => connect(drag(ref))}>
      <div className="field">
        <label className="label">{text}</label>
        <div className="control">
          <input className="input" type="text" placeholder="Text input" />
        </div>
      </div>
    </div>
  );
};

/*
// Optional rules
Text.craft = {
  rules: {

  }
};
*/

export default Text;
