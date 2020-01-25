import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Loader from '../Loader';
import { Modal } from './Modal';

const NewForm = ({ onClose }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onClickClose = (e) => {
    e.preventDefault();
    if (loading) return;

    onClose();
  };

  const handleSave = async (form) => {

    setLoading(false);

    return result;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    const token = document.getElementsByName('csrf-token')[0].content;
    const form = { name, email_recipient: email };

    await axios.post(`/api/v1/forms`, { form }, { headers: { 'X-CSRF-TOKEN': token }})
      .then(({ data }) => history.push(`/forms/${data.id}`))
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <>
      <Loader loading={loading} />
      <Modal onClickOutside={onClose}>
        <div className="new-form">
          {error && (
            <div className="notification is-danger">
              <p>An issue prevented this form from being created. Please try again.</p>
            </div>
          )}
          <button className="delete is-pulled-right" onClick={onClickClose}>
            Close
          </button>
          <h3 className="title">New Form</h3>
          <form onSubmit={onSubmit}>
            <div className="field">
              <label htmlFor="name" className="label">
                Form Name
              </label>
              <div className="control">
                <input
                  id="name"
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a name for your new form"
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="email" className="label">
                Email Recipient
              </label>
              <div className="control">
                <input
                  id="email"
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter the email address for notifications"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <button
                  type="submit"
                  className="button is-link"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-link is-light"
                  onClick={onClickClose}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default NewForm;
