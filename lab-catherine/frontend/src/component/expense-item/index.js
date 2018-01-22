import './_expense-item.scss';
import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from '../expense-form';
import * as expense from '../../action/expense';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};

    let memberFunctions = Object.getOwnPropertyNames(ExpenseItem.prototype);
    for(let functionName of memberFunctions) {
      if(functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleUpdate(expense) {
    this.props.expenseUpdate(expense);
    this.setState({editing: false});
  }
  render() {
    let {
      expense, 
      expenseDelete,
      expenseUpdate,
    } = this.props;

    let contentJSX = 
    <div> 
      <h2>{expense.name}</h2>
      <h2>${expense.price}</h2>
    </div>;  
    let editingJSX = 
    <ExpenseForm expense={expense} onComplete={this.handleUpdate}/>;
    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div onDoubleClick={() => this.setState({editing: true})} className='expense-item'>
        <button onClick={() => expenseDelete(expense)}>X</button>
        {renderJSX}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});

let mapDispatchToProps = (dispatch) => ({
  expenseDelete: (data) => dispatch(expense.removeAction(data)),
  expenseUpdate: (data) => dispatch(expense.updateAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);