import React from 'react';
import PropTypes from 'prop-types';

const Property = ({ label, children }) => (
  <div className="control">
    <label className="label is-small">
      {label}
    </label>
    <div className="control">
      {children}
    </div>
  </div>
);

Property.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any.isRequired,
};

Property.defaultProps = {
  label: '',
};

export default Property;
