import React from 'react';
import {connect} from 'react-redux';
import ExpenseItem from '../expense-item';
import ExpenseForm from '../expense-form';
import CategoryForm from '../category-form';

import * as expenseActions from '../../action/expense';
import * as categoryActions from '../../action/category';


class CategoryItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      adding: false,
    };
    this.update = this.update.bind(this);
    this.createExpense = this.createExpense.bind(this);
  }

  update(category){
    this.props.categoryUpdate(category);
    this.setState({editing: false});
  }

  createExpense(expense) {
    this.props.expenseCreate(expense);
    this.setState({adding: false});
  }

  render() {
    const {
      expenses,
      category,
      expenseCreate,
      categoryUpdate,
      categoryRemove,
    } = this.props;

    const categoryExpenses = expenses[category.id];
    
    const editing = <React.Fragment>
      <CategoryForm 
        category={category} 
        onComplete={this.update}
      />
      <button 
        className='delete-button' 
        onClick={() => categoryRemove(category)}>Delete This Category
      </button>
    </React.Fragment>;

    const content = <React.Fragment>
      <h2 className='item-text'> {category.name} </h2>
      <h2 className='item-text'> ${category.budget} </h2>
    </React.Fragment>;

    const render = this.state.editing ? editing : content;
    const expenseForm = this.state.adding ? (
      <ExpenseForm 
        category={category} 
        onComplete={this.createExpense}
      />
    ) : (
      <button 
        className='add-expense-button' 
        onClick={() => this.setState({adding: true})}>Add Expense
      </button>
    );
    const header = categoryExpenses.length ? <h2>Current Expenses:</h2> : null;

    return(
      <div className='category-item'>
        <main onDoubleClick={() => this.setState({editing: true})}>
          {render}
        </main>
        {expenseForm}
        {header}
        {
          categoryExpenses.map(expense =>
            <ExpenseItem expense={expense} key={expense.id}/>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expenses: state.expenses,
});

const mapDispatchToProps = dispatch => ({
  expenseCreate: data => dispatch(expenseActions.createAction(data)),
  categoryUpdate: data => dispatch(categoryActions.updateAction(data)),
  categoryRemove: data => dispatch(categoryActions.removeAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);