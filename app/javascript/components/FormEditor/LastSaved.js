import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago'

const LastSaved = ({ timestamp }) => {
  return (
    <p className="is-small">
      Last updated:&nbsp;
      <TimeAgo date={timestamp}>
        {timestamp}
      </TimeAgo>
    </p>
  );
};

LastSaved.propTypes = {
  timestamp: PropTypes.string.isRequired,
};

export default LastSaved;
