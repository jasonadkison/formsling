import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FormButtons = ({ id, onDelete }) => (
  <>
    <Link
      to={`/forms/${id}/edit`}
      className="button is-primary is-inverted is-inline"
      title="Edit"
      data-tooltip="Edit"
    >
      <span className="icon is-small">
        <i className="fas fa-edit" />
      </span>
    </Link>
    <a
      className="button is-danger is-inverted is-inline"
      onClick={onDelete}
      title="Delete"
      data-tooltip="Delete"
    >
      <span className="icon is-small">
        <i className="fas fa-trash" />
      </span>
    </a>
  </>
);

FormButtons.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FormButtons;
