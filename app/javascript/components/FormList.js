import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TimeAgo from 'react-timeago'

import Loader from './Loader';
import EmptyState from './EmptyState';
import NewForm from './modals/NewForm';
import DeleteForm from './modals/DeleteForm';

const FormTable = ({ forms, setDeletingForm }) => {
  return (
    <table className="table is-striped is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Results</th>
          <th>Updated</th>
          <th>Created</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {forms.map(form => (
          <tr key={form.id}>
            <td>
              <span
                className={`icon has-text-${form.published ? 'success' : 'grey'}`}
              >
                <i className={`fas fa-${form.published ? 'eye' : 'eye-slash'}`} />
              </span>
            </td>
            <td>
              <Link to={`/forms/${form.id}`} title="Edit">
                {form.name}
              </Link>
            </td>
            <td>
              {form.total_results > 0 ? (
                <Link
                  to={`/forms/${form.id}/results`}
                  title="Results"
                >
                  {form.total_results}
                </Link>
              ) : (
                <span>{form.total_results}</span>
              )}
            </td>
            <td>
              <TimeAgo date={form.updated_at}>
                {form.updated_at}
              </TimeAgo>
            </td>
            <td>
              <TimeAgo date={form.created_at}>
                {form.created_at}
              </TimeAgo>
            </td>
            <td>
              <div className="buttons">
                <a
                  className="has-text-danger"
                  onClick={() => setDeletingForm(form)}
                  title="Delete"
                  data-tooltip="Delete"
                >
                  <span className="icon is-small">
                    <i className="fas fa-trash" />
                  </span>
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingForm, setDeletingForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadForms = async () => {
    setLoading(true);
    await axios('/api/v1/forms')
      .then(({ data }) => setForms(data))
      .catch(() => setError(true))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    loadForms();
  }, []);

  const handleDeleted = () => {
    setDeletingForm(false);
    loadForms();
  }

  return (
    <>
      <Loader loading={loading} />
      <div id="form-list">
        {forms.length > 0 ? (
          <>
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <h3 className="title">Your Forms</h3>
                </div>
                <div className="level-item">
                  <button
                    className="button is-primary is-outlined is-small"
                    onClick={() => setIsCreating(true)}
                  >
                    <span className="icon">
                      <i className="fas fa-plus" />
                    </span>
                    <span>
                      New Form
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="table-container">
              <FormTable forms={forms} setDeletingForm={setDeletingForm} />
            </div>
          </>
        ) : (
          <EmptyState
            top="No Forms Found"
            middle="Let's get started by creating your first form."
            bottom={(
              <button
                className="button is-primary is-outlined is-large"
                onClick={() => setIsCreating(true)}
              >
                <span className="icon">
                  <i className="fas fa-edit" />
                </span>
                <span>
                  New Form
                </span>
              </button>
            )}
          />
        )}
        {isCreating && (
          <NewForm onClose={() => setIsCreating(false)} />
        )}
        {deletingForm && (
          <DeleteForm
            {...deletingForm}
            onClose={() => setDeletingForm(false)}
            onDeleted={() => handleDeleted()}
          />
        )}
      </div>
    </>
  );
};

export default FormList;
