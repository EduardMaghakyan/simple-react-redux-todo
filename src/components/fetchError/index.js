import React from 'react';
import { PropTypes } from 'prop-types';

const FetchError = ({ message, onRetry }) => (
  <div>
    <p>Couldn&apos;t fetch todos. {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

FetchError.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default FetchError;
