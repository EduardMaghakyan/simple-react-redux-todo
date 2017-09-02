import React from 'react';

const FetchError = ({ message, onRetry }) => (
  <div>
    <p>Couldn't fetch todos. {message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

export default FetchError;
