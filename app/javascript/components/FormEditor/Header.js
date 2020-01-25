import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useEditor } from '@craftjs/core';
import { Link } from 'react-router-dom';

import PublishForm from '../modals/PublishForm';

const Header = ({ form, onToggleEditor, editForm }) => (
  <header>
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <h2 className="title">
            {form.name}
          </h2>
        </div>
        <div className="level-item">
          {editForm}
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <div className="buttons">
            <PublishForm form={form} />
            <Link
              to={`/forms/${form.id}/results`}
              title="Results"
              className="button is-inline is-outlined is-link"
            >
              View Results
            </Link>
          </div>
        </div>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    payload: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  editForm: PropTypes.node.isRequired,
};

export default Header;
