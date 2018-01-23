import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './components/app'
import reducer from './reducer'
import moduleName from './lib/load-state'

import session from './lib/redux-session'
import reporter from './lib/redux-reporter'

let middleware = {}

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middleware),
))

store.subscribe(()=> {
  console.log('STATE', store.getState())
})

const container = document.createElement('div')
document.body.appendChild(container)

ReactDom.render(
  <Provider store={store}>
    <App /> 
  </Provider>, container
)