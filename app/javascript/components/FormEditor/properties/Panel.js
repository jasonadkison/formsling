import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ label, children }) => (
  <div className="panel-block">
    <div className="control">
      <label className="label is-small">
        {label}
      </label>
      <div className="control">
        {children}
      </div>
    </div>
  </div>
);

Panel.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Panel.defaultProps = {
  label: '',
};

export default Panel;
