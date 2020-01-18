import React from 'react';

const Usage = () => (
  <div id="usage">
    <h1 className="title">
      Usage
    </h1>
    <p className="subtitle">Your current usage this month.</p>
    <div className="has-text-centered">
      <h3 className="title">Total Forms</h3>
      <progress className="progress is-large is-link" value="30" max="100">30%</progress>
      <p>You have used 30 of 100 allowed forms.</p>
      <div className="is-divider" />
      <h3 className="title">Monthly Results</h3>
      <progress className="progress is-large is-info" value="70" max="100">70%</progress>
      <p>You have used 700 of 1000 allowed results.</p>
    </div>
  </div>
);

export default Usage;
