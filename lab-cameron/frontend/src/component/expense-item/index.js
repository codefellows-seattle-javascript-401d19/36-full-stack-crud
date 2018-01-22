import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../expense-form';
import * as expenseActions from '../../action/expense';

class ExpenseItem extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(expense) {
    this.props.expenseUpdate(expense);
    this.setState({ editing: false });
  }

  render() {
    const {
      expense,
      expenseRemove,
      expenseUpdate,
    } = this.props;

    const contentJSX =
      <div>
        <h2>{expense.name}</h2>
        <h3>Price: ${expense.price}</h3>
      </div>;

    const editingJSX =
      <ExpenseForm
        expense={expense}
        onComplete={this.handleUpdate}
      />;

    const renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div onDoubleClick={() => this.setState({ editing: true })}>
        { renderJSX }
        <button onClick={() => expenseRemove(expense)}>delete</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  expenseRemove: data => dispatch(expenseActions.removeAction(data)),
  expenseUpdate: data => dispatch(expenseActions.updateAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);
