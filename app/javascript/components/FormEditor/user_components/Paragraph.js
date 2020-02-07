import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useTextAlignmentClass from 'components/hooks/useTextAlignmentClass';
import UserComponent from './UserComponent';
import ParagraphProperties from '../properties/Paragraph';

const Paragraph = (props) => {
  const { text, textAlignment } = props;
  const textAlignmentClass = useTextAlignmentClass(textAlignment);

  return (
    <UserComponent>
      <div className="content">
        <p data-testid="paragraph" className={textAlignmentClass}>{text}</p>
        <p />
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
