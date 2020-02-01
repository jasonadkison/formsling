import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ top, middle, bottom }) => (
  <section className="hero">
    <div className="hero-body has-padding-top-40 has-padding-bottom-40">
      <div className="container has-text-centered">
        <div className="columns is-vcentered">
          <div className="column is-6 is-offset-3">
            <h1 className="title is-1 is-spaced">
              {top}
            </h1>
            <h2 className="subtitle is-5">
              {middle}
            </h2>
            <div className="buttons is-centered has-margin-top-40">
              {bottom}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

EmptyState.propTypes = {
  top: PropTypes.any.isRequired,
  middle: PropTypes.any.isRequired,
  bottom: PropTypes.any.isRequired,
};

export default EmptyState;
