import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../expense-form'
import * as expense from '../../action/expense';

class ExpenseItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {editing : false};

    let memberFunctions = Object.getOwnPropertyNames(ExpenseItem.prototype);
    for (let functionName of memberFunctions) {
      if (functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleUpdate(expense){
    this.props.expenseUpdate(expense);
    this.setState({editing : false});
  }

  render() {
    let {
      expense, // this is coming from the actual props
      expenseRemove,
      expenseUpdate,
    } = this.props;

    let contentJSX = <p> {expense.name}: ${expense.price} </p>;
    let editingJSX = <ExpenseForm expense={expense} onComplete={this.handleUpdate} />;
    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div className='expense-item'>
        <main onDoubleClick={() => this.setState({editing : true})}>
        {renderJSX}
        </main>
        <button className='delete-button' onClick={() => expenseRemove(expense)}> X </button>
      </div>
    );
  }
}

// let mapStateToProps = (state) => ({});

let mapDispatchToProps = (dispatch) => ({
  expenseRemove: (data) => dispatch(expense.removeAction(data)),
  expenseUpdate: (data) => dispatch(expense.updateAction(data)),
});

export default connect(null, mapDispatchToProps)(ExpenseItem);