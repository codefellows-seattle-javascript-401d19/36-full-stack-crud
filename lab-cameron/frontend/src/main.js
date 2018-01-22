import './style/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

import App from './component/app';
import reducer from './reducer';
import { loadState } from './lib/load-state';

import session from './lib/redux-session';
import reporter from './lib/redux-reporter';

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(session, reporter)
  )
);

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, container);
