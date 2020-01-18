import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Modal } from './Modal';
import NewForm from './NewForm';
import FormButtons from './FormButtons';

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadForms = async () => {
      const result = await axios('/api/v1/forms');

      setForms(result.data);
    };

    loadForms();
  }, []);

  return (
    <div id="form-list">
      <div className="level">
        <div className="level-left">
          <h3 className="title">Your Forms</h3>
        </div>
        <div className="level-right">
          <button
            className="button is-primary"
            onClick={() => setIsModalOpen(true)}
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
                  <FormButtons {...form} />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NewForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default FormList;
