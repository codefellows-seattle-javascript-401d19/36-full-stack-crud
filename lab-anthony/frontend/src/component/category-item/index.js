import React from 'react';
import {connect} from 'react-redux';
import Expense from '../expense-item';
import ExpenseForm from '../expense-form';
import CategoryForm from '../category-form';
import './_category-item.scss';

import * as categoryActions from '../../action/category';
import * as expenseActions from '../../action/expense';

class CategoryItem extends React.Component{
  render(){
    let {
      expenses,
      expenseCreate,
      category,
      categoryUpdate,
      categoryRemove,
    } = this.props;

    let categoryExpenses = expenses[category.id];
    
    return(
      <div className='category-item'>
        <h2> Category: {category.name} </h2>
        <h2> Budget: ${category.budget} </h2>
        <button className="delete" onClick={() => categoryRemove(category)}> X </button>
        <CategoryForm category={category} onComplete={categoryUpdate}/>
        <ExpenseForm category={category} onComplete={expenseCreate}/>
        {
          categoryExpenses.map((expense, i) => <Expense expense={expense} key={i}/>)
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

export default connect(mapStateToProps,mapDispatchToProps)(CategoryItem);
