import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NewForm from './modals/NewForm';
import DeleteForm from './modals/DeleteForm';
import FormButtons from './FormButtons';

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingForm, setDeletingForm] = useState(false);

  const fetchForms = async () => {
    const response = await axios('/api/v1/forms');
    return response.data;
  };

  const loadForms = async () => {
    const forms = await fetchForms();
    setForms(forms);
  };

  useEffect(() => {
    loadForms();
  }, []);

  const handleDeleted = () => {
    setDeletingForm(false);
    loadForms();
  }

  return (
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
              <th>Recipient</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {forms.map(form => (
              <tr key={form.id}>
                <td>
                  {form.name}
                </td>
                <td>

                </td>
                <th>
                  <FormButtons {...form} onDelete={() => setDeletingForm(form)} />
                </th>
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
  );
};

export default FormList;
