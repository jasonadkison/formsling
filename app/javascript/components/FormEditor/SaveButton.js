import React from 'react';
import PropTypes from 'prop-types';
import { useEditor } from '@craftjs/core';
import cx from 'classnames';

const SaveButton = ({ handleSave, loading }) => {
  const { query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const onClickSave = (e) => {
    e.preventDefault();
    const payload = query.serialize();
    handleSave(payload);
  };

  const classNames = cx('button is-primary is-medium', { 'is-loading': loading });

  if (!enabled) return null;

  return (
    <button
      className={classNames}
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
  loading: PropTypes.bool.isRequired,
};

export default SaveButton;
