import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ id, name }) => (
  <ul>
    <li>
      <Link to="/forms">Forms</Link>
    </li>
    {id && name && (
      <li className="is-active">
        <Link to={`/forms/${id}`}>{name}</Link>
      </li>
    )}
  </ul>
);

Breadcrumbs.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  name: PropTypes.string,
};

export default Breadcrumbs;
