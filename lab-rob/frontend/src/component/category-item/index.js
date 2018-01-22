import './category-item.scss';

import React from 'react';
import {connect} from 'react-redux';

import autoBind from '../../lib/auto-bind';
import CategoryForm from '../category-form';
import ExpenseItem from '../expense-item';
import ExpenseForm from '../expense-form';
import {updateAction, destroyAction} from '../../action/category';
import {createAction, clearAction} from '../../action/expense';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {editing: false};
    autoBind(this, CategoryItem);
  }

  handleUpdate(formState) {
    let {categoryUpdate} = this.props;
    
    this.setState({editing: false});
    categoryUpdate(formState);
  }

  handleEdit() {
    this.setState({editing: true});
  }

  getCategoryDisplay() {
    let {
      category,
      categoryDestroy,
    } = this.props;

    let categoryEditing = (
      <div className='category-editing'>
        <CategoryForm category={category} onComplete={this.handleUpdate} />
        <button onClick={categoryDestroy.bind(null, category)} className='destroy'>Remove Category</button>
      </div>
    );

    let categoryComplete = (
      <div className='category-complete' onDoubleClick={this.handleEdit}>
        <h2>Category: {category.name}</h2>
        <h3>Budget: ${Number(category.budget).toLocaleString()}</h3>
      </div>
    );

    return this.state.editing ? categoryEditing : categoryComplete;
  }

  getExpenses() {
    let {
      category,
      expenseClear,
      expenses,
    } = this.props;

    let categoryExpenses = expenses[category.id];

    if(categoryExpenses.length === 0)
      return null;

    return (
      <div className='expenses'>
        <h2>Expenses</h2>
        <button onClick={expenseClear.bind(null, category.id)}>Remove All Expenses</button>
        <ol>
          {categoryExpenses.map(expense => (
            <li key={expense.id}>
              <ExpenseItem expense={expense} />
            </li>
          ))}
        </ol>
      </div>
    );
  }

  render() {
    let {
      category,
      expenseCreate,
    } = this.props;

    return (
      <div className='category-item'>
        {this.getCategoryDisplay()}
        <ExpenseForm categoryId={category.id} onComplete={expenseCreate} />
        {this.getExpenses()}
      </div>
    );
  }
}

let mapStateToProps = state => ({
  expenses: state.expenses,
});

let mapDispatchToProps = dispatch => ({
  categoryUpdate: (data) => dispatch(updateAction(data)),
  categoryDestroy: (data) => dispatch(destroyAction(data)),
  expenseCreate: (data) => dispatch(createAction(data)),
  expenseClear: (data) => dispatch(clearAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);