import './style/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './component/app';
import reducer from './reducer';
import reporter from './middleware/redux-reporter';
import session from './middleware/redux-session';

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(reporter, session)
));

let container = document.createElement('main');
document.body.appendChild(container);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, container
);