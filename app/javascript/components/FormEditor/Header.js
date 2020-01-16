import React from 'react';

const Header = ({ form }) => {
  const { name } = form;
  return (
    <header>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <h2 className="title">{name}</h2>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <button className="button is-primary">Edit Form</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
