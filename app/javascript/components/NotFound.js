import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  return (
    <div className="columns is-vcentered" style={{ flexDirection: 'row', minHeight: '50vh' }}>
      <div className="column">
        <div className="content has-text-centered">
          <h1>Not Found</h1>
          <p>Sorry, the page at <strong>{location.pathname}</strong> does not exist.</p>
          <p><Link to="/" className="button">Return to the dashboard</Link></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
