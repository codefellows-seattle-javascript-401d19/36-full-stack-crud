import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './style/main.scss';

import App from './component/app';
import reducer from './reducer';
import reporter from './lib/redux-reporter';
import session from './lib/redux-session';

let store = createStore(reducer, composeWithDevTools(
  applyMiddleware(reporter, session)));

const container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(
  <Provider store={ store } >
    <App/>
  </Provider>, container);