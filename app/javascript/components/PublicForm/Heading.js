import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ text, type, textAlignment }) => {
  const Heading = type;
  return <Heading className={`title has-text-${textAlignment}`}>{text}</Heading>;
};

Heading.propTypes = {
  name: PropTypes.string,
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  textAlignment: PropTypes.oneOf(['left', 'centered', 'right']),
};

Heading.defaultProps = {
  type: 'h1',
  text: 'Heading',
  textAlignment: 'left',
};

export default Heading;
