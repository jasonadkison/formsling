import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ text, textAlignment }) => (
  <div className="content">
    <p className={`has-text-${textAlignment}`}>
      {text}
    </p>
  </div>
);

Paragraph.propTypes = {
  name: PropTypes.string,
  textAlignment: PropTypes.oneOf(['left', 'centered', 'right']),
};

Paragraph.defaultProps = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  textAlignment: 'left',
};

export default Paragraph;
