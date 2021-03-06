import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './scss/index.scss';

// * === Redux ===
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import Reducer from './Redux/Reducers'; // Main Reducer

export const store = createStore(Reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
