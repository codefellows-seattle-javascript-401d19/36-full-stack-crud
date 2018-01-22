import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from '../expense-form';
import * as expenseActions from '../../action/expense';

class Expense extends React.Component{
  constructor(props){
    super(props);
    this.state = {editing : false};
    //-------------------------------------------------------------
    // Binding Handlers
    //-------------------------------------------------------------
    let memberFunctions = Object.getOwnPropertyNames(Expense.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  //-------------------------------------------------------------
  // member functions
  //-------------------------------------------------------------

  handleUpdate(expense){
    this.props.expenseUpdate(expense);
    this.setState({editing : false});
  }

  //-------------------------------------------------------------
  // life-cycle hooks
  //-------------------------------------------------------------

  render(){
    let {
      expense,
      expenseRemove,
      expenseUpdate,
    } = this.props;

    let expenseContentJSX =  <p>{expense.name}{expense.price}</p>;

    let editingJSX = <ExpenseForm expense={expense} onComplete={expenseUpdate} />;
    let renderJSX = this.state.editing ? editingJSX : expenseContentJSX;

    return(
      <div className='expense'>
        <div onDoubleClick={() => this.setState({editing: true}) }>
          {renderJSX}
        </div>
        <button onClick={() => expenseRemove(expense)}> delete expense </button>
        <ExpenseForm expense={expense} onComplete={expenseUpdate} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});

let mapDispatchToProps = (dispatch) => ({
  expenseRemove : (data) => dispatch(expenseActions.removeAction(data)),
  expenseUpdate : (data) => dispatch(expenseActions.updateAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);