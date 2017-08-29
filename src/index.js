/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Root from './components/root';

const store = configureStore();
ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
registerServiceWorker();
