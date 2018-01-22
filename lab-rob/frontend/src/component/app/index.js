import './app.scss';

import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Landing from '../landing';
import Dashboard from '../dashboard';
import {reloadAction as categoryReload} from '../../action/category';
import {reloadAction as expenseReload} from '../../action/expense';

class App extends React.Component {
  componentWillMount() {
    if(localStorage.categories && localStorage.expenses) {
      let categories = JSON.parse(localStorage.categories);
      let expenses = JSON.parse(localStorage.expenses);
      this.props.reloadCategories(categories);
      this.props.reloadExpenses(expenses);
    }
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
  reloadCategories: (data) => dispatch(categoryReload(data)),
  reloadExpenses: (data) => dispatch(expenseReload(data)),
});

export default connect(null, mapDispatchToProps)(App);