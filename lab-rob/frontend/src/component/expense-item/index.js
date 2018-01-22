import './expense-item.scss';

import React from 'react';
import {connect} from 'react-redux';

import autoBind from '../../lib/auto-bind';
import ExpenseForm from '../expense-form';
import {updateAction, destroyAction} from '../../action/expense';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {editing: false};

    autoBind(this, ExpenseItem);
  }

  handleEdit() {
    this.setState({editing: true});
  }

  handleUpdate(formState) {
    let {expenseUpdate} = this.props;

    this.setState({editing: false});
    expenseUpdate(formState);
  }

  render() {
    let {
      expense,
      expenseDestroy,
    } = this.props;

    let expenseEditing = (
      <div className='expense-item-editing'>
        <ExpenseForm expense={expense} onComplete={this.handleUpdate} />
        <button onClick={expenseDestroy.bind(null, expense)} className='destroy'>Remove Expense</button>
      </div>
    );

    let expenseComplete = (
      <div className='expense-item' onDoubleClick={this.handleEdit}>
        <h3>{expense.name}</h3>
        <h4>Price: ${Number(expense.price).toLocaleString()}</h4>
      </div>
    );

    return this.state.editing ? expenseEditing : expenseComplete;
  }
}

let mapDispatchToProps = dispatch => ({
  expenseUpdate: (data) => dispatch(updateAction(data)),
  expenseDestroy: (data) => dispatch(destroyAction(data)),
});

export default connect(null, mapDispatchToProps)(ExpenseItem);