import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../category-form';
import ExpenseForm from '../expense-form';
import ExpenseItem from '../expense-item';

import * as expenseActions from '../../action/expense';
import * as categoryActions from '../../action/category';

class CategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(category) {
    this.props.categoryUpdate(category);
    this.setState({ editing: false });
  }

  render() {
    const {
      expenses,
      category,
      expenseCreate,
      categoryRemove,
      categoryUpdate,
    } = this.props;

    const categoryExpenses = expenses[category.id];

    const editingJSX =
      <CategoryForm
        category={category}
        onComplete={this.handleUpdate}
      />;

    const contentJSX =
      <div onDoubleClick={() => this.setState({ editing: true })}>
        <h2>{category.name}</h2>
        <h3>Budget: ${category.budget}</h3>
        <button
          className='delete-button'
          onClick={() => categoryRemove(category)}
        >
          &#10006;
        </button>
      </div>;

    const renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div id='item'>
        { renderJSX }
        <h2>Create Expense</h2>
        <ExpenseForm category={category} onComplete={expenseCreate} />
        {
          categoryExpenses.map(expense => {
            return <div key={expense.id}>
              <ExpenseItem expense={expense} />
            </div>;
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    expenses: state.expense,
  };
};

const mapDispatchToProps = dispatch => ({
  expenseCreate: data => dispatch(expenseActions.createAction(data)),
  categoryUpdate: data => dispatch(categoryActions.updateAction(data)),
  categoryRemove: data => dispatch(categoryActions.removeAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
