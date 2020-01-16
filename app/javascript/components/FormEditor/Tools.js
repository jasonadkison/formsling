import React from 'react';

const Tools = () => {

  return (
    <div className="tools">
      <nav className="panel">
        <p className="panel-heading">
          Fields
          <span className="help">(Drag to add)</span>
        </p>
        <a className="panel-block is-active">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true" />
          </span>
          Text
        </a>
      </nav>
    </div>
  );
};

export default Tools;
