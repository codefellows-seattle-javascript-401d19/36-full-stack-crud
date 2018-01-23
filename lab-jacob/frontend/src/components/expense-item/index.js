import React from 'react'
import {connect} from 'react-redux'
import ExpenseForm from '../expense-form'
import * as expense from '../../action/expense'

class ExpenseItem extends React.Component{
  render(){
    let {
      expense,
      expenseRemove,
      expenseUpdate,
    } = this.props

    return(
      <div className='expenseitem'>
        <h1> Expense: {expense.name}</h1>
        <p> Price: {expense.price}</p>
        <button 
        onClick={() => expenseRemove(expense)}> Delete 
        </button>
        <ExpenseForm expense={expense} onComplete={expenseUpdate}/>
      </div>
    )
  }
 }



 let mapDispatchToProps = (dispatch) => ({
   expenseRemove: (data) => dispatch(expense.removeAction(data)),
   expenseUpdate: (data) => dispatch(expense.updateAction(data)),
 })

 export default connect(null, mapDispatchToProps)(ExpenseItem)
