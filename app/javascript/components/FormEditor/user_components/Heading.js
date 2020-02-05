import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserComponent from './UserComponent';
import HeadingProperties from '../properties/Heading';

const Heading = (props) => {
  const { text, type, textAlignment } = props;

  const Heading = type;

  return (
    <UserComponent>
      <div className="content">
        <Heading data-testid="heading" className={`has-text-${textAlignment}`}>{text}</Heading>
      </div>
    </UserComponent>
  );
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

Heading.craft = {
  name: 'Heading',
  related: {
    properties: HeadingProperties,
  },
};

export default Heading;
