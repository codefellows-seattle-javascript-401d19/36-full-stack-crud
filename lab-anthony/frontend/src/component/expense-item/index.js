import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from '../expense-form';
import * as expenseActions from '../../action/expense';
import './_expense-item.scss';

class Expense extends React.Component{
  render(){
    let {
      expense,
      expenseRemove,
      expenseUpdate,
    } = this.props;

    return(
      <div className='expense'>
        <p>{expense.name}</p>
        <p>{expense.content}</p>
        <button onClick={() => expenseRemove(expense)}> delete </button>
        <ExpenseForm expense={expense} onComplete={expenseUpdate}/>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});

let mapDispatchToProps = (dispatch) => ({
  expenseUpdate : (data) => dispatch(expenseActions.updateAction(data)),
  expenseRemove : (data) => dispatch(expenseActions.removeAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
