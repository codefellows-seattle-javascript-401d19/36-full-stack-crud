import './_app.scss';
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from '../dashboard';
import {connect} from 'react-redux';
import * as categoryActions from '../../action/category';
import * as expenseActions from '../../action/expense';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount(categories, expenses) {
    try {
      const cachedCategories = localStorage.getItem('categories');
      if(cachedCategories) {
        this.setState({ categories: JSON.parse(cachedCategories)});
      }

      const cachedExpenses = localStorage.getItem('expenses');
      if(cachedExpenses) {
        this.setState({expenses: JSON.parse(cachedExpenses)});
      }
    }
    catch(error) {} //eslint-disable-line
  }

  render() {
    return (
      <div className='app'>
        <h1>Budget Tracker</h1>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


let mapStateToProps = (state) => {
  return {
    categories: state.categories,
    expenses: state.expenses,
  };
};

let mapDispatchToProps = (dispatch) => ({
  expenseCreate: (data) => dispatch(expenseActions.createAction(data)),
  categoryCreate: (data) => dispatch(categoryActions.createAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);