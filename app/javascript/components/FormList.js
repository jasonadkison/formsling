import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TimeAgo from 'react-timeago'

import Loader from './Loader';
import NewForm from './modals/NewForm';
import DeleteForm from './modals/DeleteForm';
import FormButtons from './FormButtons';
import ShareForm from './modals/ShareForm';

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingForm, setDeletingForm] = useState(false);
  const [loading, setLoading] = useState(false);
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
        <div className="level">
          <div className="level-left">
            <h3 className="title">Your Forms</h3>
          </div>
          <div className="level-right">
            <button
              className="button is-primary is-outlined"
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
        <div className="table-container">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Published</th>
                <th>Results</th>
                <th>Updated</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map(form => (
                <tr key={form.id}>
                  <td>
                    <Link to={`/forms/${form.id}`} title="Edit">
                      {form.name}
                    </Link>
                  </td>
                  <td>
                    <span
                      className={`icon has-text-${form.published ? 'success' : 'grey'}`}
                    >
                      <i className={`fas fa-${form.published ? 'check' : 'times'}-circle`} />
                    </span>
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
                      <Link
                        to={`/forms/${form.id}`}
                        title="Edit"
                        className="button is-link is-inverted is-inline"
                        data-tooltip="Edit"
                      >
                        <span className="icon is-small">
                          <i className="fas fa-edit" />
                        </span>
                      </Link>
                      <a
                        className="button is-danger is-inverted is-inline"
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
        </div>
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
