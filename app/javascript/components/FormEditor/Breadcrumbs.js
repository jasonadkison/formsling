import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ id }) => (
  <ul>
    <li>
      <Link to="/app">Dashboard</Link>
    </li>
    <li>
      <Link to="/app">Forms</Link>
    </li>
    <li className="is-active">
      <Link to={`/forms/${id}/edit`}>Edit Form</Link>
    </li>
  </ul>
);

Breadcrumbs.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Breadcrumbs;
