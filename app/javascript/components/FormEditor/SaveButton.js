import React from 'react';
import PropTypes from 'prop-types';
import { useEditor } from '@craftjs/core';

const SaveButton = ({ handleSave }) => {
  const { query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const onClickSave = (e) => {
    e.preventDefault();
    const payload = query.serialize();
    handleSave(payload);
  };

  if (!enabled) return null;

  return (
    <button
      className="button is-primary is-medium"
      onClick={onClickSave}
    >
      <span className="icon">
        <i className="far fa-save" />
      </span>
      <span>
        Save Changes
      </span>
    </button>
  );
};

SaveButton.propTypes = {
  handleSave: PropTypes.func.isRequired,
};

export default SaveButton;
