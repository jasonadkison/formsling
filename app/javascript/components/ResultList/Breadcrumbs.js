import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ id, name }) => (
  <ul>
    <li>
      <Link to="/forms">Forms</Link>
    </li>
    {id && name && (
      <>
        <li>
          <Link to={`/forms/${id}`}>{name}</Link>
        </li>
        <li className="is-active">
          <Link to={`/forms/${id}/results`}>Results</Link>
        </li>
      </>
    )}
  </ul>
);

Breadcrumbs.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
};

export default Breadcrumbs;
