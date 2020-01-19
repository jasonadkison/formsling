import React, { useState } from 'react';

import { Modal } from './Modal';

const PublishForm = ({ form, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClickClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
  }
  if (!isOpen) {
    return (
      <button
        className="button"
        onClick={() => setIsOpen(true)}
      >
        Share / Embed
      </button>
    )
  }
  return (
    <Modal>
      <button className="delete is-pulled-right" onClick={onClickClose}>
        Close
      </button>
      <h3 className="title">
        {form.name}
      </h3>
      <h4 className="subtitle">
        Share and embed your form
      </h4>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label htmlFor="share-link" className="label">
              Share Link
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={form.public_url}
                readOnly
                id="share-link"
              />
            </div>
            <p className="help">
              Share this link with anyone you'd like.
            </p>
          </div>
          <div className="field">
            <label htmlFor="embed-code" className="label">
              Embed Code
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={`<iframe src="${form.public_url}"></iframe>`}
                readOnly
                id="embed-code"
              />
            </div>
            <p className="help">
              Copy and paste embed code into any website's HTML.
            </p>
          </div>
        </div>
      </div>
      <div className="field is-grouped is-grouped-right">
        <div className="control">
          <button
            type="button"
            className="button is-link"
            onClick={onClickClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PublishForm;
