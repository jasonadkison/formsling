import React from 'react';

const Usage = () => (
  <div id="usage">
    <h1 className="title">
      Usage
    </h1>
    <div className="box has-text-centered">
      <h3 className="title">Total Forms</h3>
      <progress className="progress is-large is-link" value="60" max="100">60%</progress>
      <p>You have used 15 out of your 100 allowed forms.</p>
      <div className="is-divider" />
      <h3 className="title">Monthly Results</h3>
      <progress className="progress is-large is-info" value="60" max="100">60%</progress>
      <p>You are using 60 out of 1000 of your monthly allowed results.</p>
    </div>
  </div>
);

export default Usage;
