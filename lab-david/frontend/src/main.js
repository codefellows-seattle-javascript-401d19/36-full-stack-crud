'use strict'; 

import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import App from './component/app';
import reducer from './reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

import './style/main.scss';

import session from './lib/redux-session';
import reporter from './lib/redux-reporter';
import thunk from './lib/redux-thunk';


const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(reporter, session, thunk),
));

const container = document.createElement('div');
document.body.appendChild(container);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, container);
