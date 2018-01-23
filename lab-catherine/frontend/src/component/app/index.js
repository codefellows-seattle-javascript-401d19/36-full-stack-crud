import './_app.scss';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from '../dashboard';
import {connect} from 'react-redux';
import * as continentActions from '../../action/continent';
import * as forestActions from '../../action/forest';

class App extends React.Component {

  render() {
    return (
      <div className='app'>
        <h1>Forest Tracker</h1>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;