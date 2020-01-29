import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserComponent from './UserComponent';
import ParagraphProperties from '../properties/Paragraph';

const Paragraph = (props) => {
  const { text, textAlignment } = props;

  return (
    <UserComponent>
      <div className="content">
        <p className={`has-text-${textAlignment}`}>{text}</p>
      </div>
    </UserComponent>
  );
};

Paragraph.propTypes = {
  name: PropTypes.string,
  textAlignment: PropTypes.oneOf(['left', 'centered', 'right']),
};

Paragraph.defaultProps = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  textAlignment: 'left',
};

Paragraph.craft = {
  name: 'Paragraph',
  related: {
    properties: ParagraphProperties,
  },
};

export default Paragraph;
