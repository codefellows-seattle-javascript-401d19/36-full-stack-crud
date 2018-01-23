import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../expense-form';
import * as expenseAction from '../../action/expense';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };

    let memberFunctions = Object.getOwnPropertyNames(ExpenseItem.prototype);
    for (let functionName of memberFunctions) {
      if (functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleUpdate(expense) {
    this.props.expenseUpdate(expense);
    this.setState({ editing: false });
  }

  render() {
    let {
      expense,
      expenseRemove,
      expenseUpdate,
    } = this.props;

    let editingJSX = <ExpenseForm expense={expense} onComplete={this.handleUpdate} />;
    let contentJSX =
      <div onDoubleClick={() => this.setState({ editing: true })}>
        <h3> {expense.name} </h3>
        <p> ${expense.price} </p>
      </div>;

    let renderJSX = this.state.editing ? editingJSX : contentJSX;
    return (
      <div className='expense-item'>
        <button onClick={() => expenseRemove(expense)}> delete </button>
        {renderJSX}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});

let mapDispatchToProps = (dispatch) => ({
  expenseRemove: (data) => dispatch(expenseAction.removeAction(data)),
  expenseUpdate: (data) => dispatch(expenseAction.updateAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);