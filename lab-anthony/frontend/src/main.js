import React from 'react';
import ReactDom from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import './style/main.scss';

import App from './component/app';
import reducer from './reducer';


import session from './lib/redux-session';
import reporter from './lib/redux-reporter';
import thunk from './lib/redux-thunk';

let middleware = {};
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reporter, session, thunk)));

const container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,container);
