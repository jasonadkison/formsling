import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Loader from '../Loader';
import { Modal } from './Modal';

const EditForm = ({ form, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onClickClose = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleClose = () => {
    setName(form.name);
    setEmail(form.email_recipient);
    setIsOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    const token = document.getElementsByName('csrf-token')[0].content;
    const nextForm = { name, email_recipient: email };
    const headers = { 'X-CSRF-TOKEN': token };

    await axios.patch(`/api/v1/forms/${form.id}`, { form: nextForm }, { headers })
      .then(({ data }) => {
        handleClose();
        onSuccess();
      })
      .catch(() => {
        setError(true);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    setName(form.name);
    setEmail(form.email_recipient);
  }, [form]);

  const modal = isOpen ? (
    <>
      <Loader loading={loading} />
      <Modal onClickOutside={handleClose}>
        <div className="edit-form">
          {error && (
            <div className="notification is-danger">
              <p>An issue prevented your settings from being saved. Please try again.</p>
            </div>
          )}
          <button className="delete is-pulled-right" onClick={onClickClose}>
            Close
          </button>
          <h3 className="title">Edit Form</h3>
          <h4 className="subtitle">{form.name}</h4>
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
  ) : null;

  return (
    <>
      <a
        className="button is-outlined is-small"
        onClick={() => setIsOpen(true)}
      >
        <span className="icon">
          <i className="fas fa-cog" />
        </span>
        <span>Form Settings</span>
      </a>
      {modal}
    </>
  );
};

export default EditForm;
