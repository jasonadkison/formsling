import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// only show the loader if this many milliseconds have passed (prevent flickering)
const delay = 500;

const Loader = ({ loading }) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setShouldDisplay(true);
    }, delay);

    return () => {
      setShouldDisplay(false);
      clearTimeout(timer);
    }
  }, [loading]);

  if (!shouldDisplay) return null;

  return (
    <div id="loading-overlay">
      <div id="spinner"></div>
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
};

Loader.defaultProps = {
  loading: true,
};

export default Loader;
