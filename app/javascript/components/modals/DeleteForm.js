import React, { useState } from 'react';
import axios from 'axios';

import { Modal } from './Modal';

const DeleteForm = ({ id, name, onClose, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const deleteForm = async () => {
    if (loading) return;

    const token = document.getElementsByName('csrf-token')[0].content;
    setLoading(true);

    await axios.delete(`/api/v1/forms/${id}`, { headers: { 'X-CSRF-TOKEN': token }})
      .then(() => onDeleted())
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <Modal>
      <div className="delete-form has-text-centered">
        <div className="content">
          {error && (
            <div className="notification is-danger">
              <p>An issue prevented this form from being deleted. Please try again.</p>
            </div>
          )}
          <h3>Confirmation</h3>
          <p>Are you sure you want to delete this form?</p>
          <p>{name}</p>
        </div>
        <div className="field is-grouped is-grouped-centered">
          <div className="control">
            <button
              type="button"
              className="button is-link"
              onClick={deleteForm}
              disabled={loading}
            >
              Yes
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-link is-light"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteForm;
