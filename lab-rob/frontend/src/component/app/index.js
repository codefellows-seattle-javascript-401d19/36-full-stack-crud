import './app.scss';

import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Landing from '../landing';
import Dashboard from '../dashboard';
import {reloadFromDatabaseAction} from '../../action/category';

class App extends React.Component {
  componentWillMount() {
    this.props.reloadFromDatabase();
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <header>
              <h1>Budget Calculator - <em>React!</em></h1>
              <nav>
                <ul>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/dashboard'>Calculator</Link></li>
                </ul>
              </nav>
            </header>
            <Route exact path='/' component={Landing} />
            <Route exact path='/dashboard' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => ({
  reloadFromDatabase: () => dispatch(reloadFromDatabaseAction()),
});

export default connect(null, mapDispatchToProps)(App);