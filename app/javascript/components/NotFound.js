import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  return (
    <div className="columns is-vcentered" style={{ flexDirection: 'row', minHeight: '50vh' }}>
      <div className="column">
        <div className="content has-text-centered">
          <h1>404 Not Found</h1>
          <p>Sorry, the URL you requested could not be found.</p>
          <p><Link to="/" className="button">Return to the dashboard</Link></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
