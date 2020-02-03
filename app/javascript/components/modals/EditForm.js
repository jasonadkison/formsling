import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getToken } from '../utils';
import Loader from '../Loader';
import { Modal } from './Modal';

const EditForm = ({ form, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [published, setPublished] = useState('');

  const onClickClose = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleClose = () => {
    setName(form.name);
    setEmail(form.email_recipient);
    setUrl(form.url);
    setPublished(form.published);
    setIsOpen(false);
    setError(false);
    setLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError(false);
    const token = getToken();
    const nextForm = { name, email_recipient: email, url, published };
    const headers = { 'X-CSRF-TOKEN': token };

    await axios.patch(`/api/v1/forms/${form.id}`, { form: nextForm }, { headers })
      .then(({ data }) => {
        handleClose();
        onSuccess(data);
      })
      .catch(() => {
        setError(true);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    setName(form.name);
    setEmail(form.email_recipient);
    setUrl(form.url);
    setPublished(form.published);
  }, [form]);

  const modal = isOpen ? (
    <>
      <Loader loading={loading} />
      <Modal onClickOutside={handleClose}>
        <div className="edit-form">
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
              <div className="help">
                Where notifications are sent for this form.
              </div>
            </div>
            <div className="field">
              <label htmlFor="embed-url" className="label">
                Embed URL
              </label>
              <div className="control">
                <input
                  id="embed-url"
                  type="url"
                  className="input"
                  value={url || ''}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter the URL of any web page this form will be embedded."
                  disabled={loading}
                />
              </div>
              <div className="help">
                Only these hosts will be allowed to embed this form: <em>{form.csp_host}</em>.
              </div>
            </div>
            <div className="field">
              <label className="label">Visibility Settings</label>
              <div className="control">
                <input
                  id={`published-${form.id}`}
                  type="checkbox"
                  className="switch"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                <label htmlFor={`published-${form.id}`}>
                  Published
                </label>
              </div>
              <p className="help">
                Your form will not be visible to others unless it is published.
              </p>
            </div>
            {error && (
              <div className="notification is-danger">
                <p>An issue prevented your settings from being saved. Please try again.</p>
              </div>
            )}
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <button
                  type="submit"
                  className="button is-primary is-outlined"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-link is-outlined"
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
