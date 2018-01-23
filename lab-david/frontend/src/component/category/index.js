import React from 'react';
import {connect} from 'react-redux';
import Expense from '../expense';
import ExpenseForm from '../expense-form';
import CategoryForm from '../category-form';

import * as expenseActions from '../../action/expense';
import * as categoryActions from '../../action/category';

class Category extends React.Component {
  render(){
    let {
      expenses,
      category,
      expenseCreate,
      categoryUpdate,
      categoryRemove,
    } = this.props;

    let categoryExpenses = expenses[category.id];

    return(
      <div className='category'>
        <h3> Category: {category.name} </h3>
        <p> Category Budget: {category.budgetTotal} </p>
        <button onClick={() => categoryRemove(category)}> delete </button> 
        <CategoryForm category={category} onComplete={categoryUpdate} />
        <ExpenseForm category ={category} onComplete={expenseCreate} />

        {
          categoryExpenses.map((expense, index) => <Expense expense={expense} key={index} />)
        }
        
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  expenses : state.expenses,
});

let mapDispatchToProps = (dispatch) => ({
  expenseCreate : (data) => dispatch(expenseActions.createAction(data)),
  categoryUpdate : (data) => dispatch(categoryActions.updateAction(data)),
  categoryRemove : (data) => dispatch(categoryActions.removeAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);