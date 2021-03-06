import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useEditor } from '@craftjs/core';
import { Link } from 'react-router-dom';

import ShareForm from '../modals/ShareForm';

const Header = ({ form, editForm }) => (
  <header>
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <h2 className="title">
                  {form.name}
                </h2>
              </div>
              <div className="level-item">
                <span
                  className="icon has-text-grey is-size-6"
                  data-tooltip={form.published ? 'Published' : 'Unpublished'}
                >
                  <i className={`fas fa-eye${!form.published ? '-slash' : ''}`} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="level-item">
          {editForm}
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <div className="buttons">
            {form.total_results > 0 && (
              <Link
                to={`/forms/${form.id}/results`}
                title="Results"
                className="button is-inline is-outlined is-link"
              >
                View Results
              </Link>
            )}
            {form.published && (
              <ShareForm form={form} />
            )}
          </div>
        </div>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string,
    payload: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  editForm: PropTypes.node.isRequired,
};

export default Header;
