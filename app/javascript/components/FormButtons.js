import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FormButtons = ({ id }) => (
  <p className="buttons">
    <Link
      to={`/forms/${id}/edit`}
      className="button is-primary is-inverted"
      title="Edit Form"
    >
      <span className="icon is-small">
        <i className="fas fa-edit" />
      </span>
    </Link>
    <Link
      to={`/forms/${id}/results`}
      className="button is-info is-inverted"
      title="View Results"
    >
      <span className="icon">
        <i className="fas fa-th-list" />
      </span>
    </Link>
    <Link
      to={`/forms/${id}/example`}
      className="button is-link is-inverted"
      title="View Example"
    >
      <span className="icon">
        <i className="fas fa-code" />
      </span>
    </Link>
    <a href="" className="button is-danger is-inverted">
      <span className="icon is-small">
        <i className="fas fa-trash" />
      </span>
    </a>
  </p>
);

FormButtons.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FormButtons;
