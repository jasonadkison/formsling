import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FormButtons = ({ id, onDelete }) => (
  <p className="buttons">
    <Link
      to={`/forms/${id}/edit`}
      className="button is-primary is-inverted"
      title="Edit"
      data-tooltip="Edit"
    >
      <span className="icon is-small">
        <i className="fas fa-edit" />
      </span>
    </Link>
    <a
      href={`/f/${id}`}
      className="button is-info is-inverted"
      title="Open"
      data-tooltip="Open"
      rel="noreferer noopener"
      target="_blank"
    >
      <span className="icon">
        <i className="fas fa-external-link-alt" />
      </span>
    </a>
    <button
      className="button is-danger is-inverted"
      onClick={onDelete}
      title="Delete"
      data-tooltip="Delete"
    >
      <span className="icon is-small">
        <i className="fas fa-trash" />
      </span>
    </button>
  </p>
);

FormButtons.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FormButtons;
