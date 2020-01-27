import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TimeAgo from 'react-timeago'

import Loader from './Loader';
import NewForm from './modals/NewForm';
import DeleteForm from './modals/DeleteForm';
import FormButtons from './FormButtons';
import PublishForm from './modals/PublishForm';

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
              className="button is-primary"
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
                <th>Created</th>
                <th>Updated</th>
                <th>Total Results</th>
                <th style={{ minWidth: '372px' }} />
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
                    <TimeAgo date={form.created_at}>
                      {form.created_at}
                    </TimeAgo>
                  </td>
                  <td>
                    <TimeAgo date={form.updated_at}>
                      {form.updated_at}
                    </TimeAgo>
                  </td>
                  <td>{form.total_results}</td>
                  <td className="has-text-right">
                    <div className="buttons">
                      <Link
                        to={`/forms/${form.id}/results`}
                        title="Results"
                        className="button is-inline is-outlined is-link"
                      >
                        View Results
                      </Link>
                      <PublishForm form={form} />
                      <a
                        className="button is-danger is-inverted is-inline"
                        onClick={() => setDeletingForm(form)}
                        title="Delete"
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
