import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from '../expense-form';
import * as expense from '../../action/expense';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};
    this.update = this.update.bind(this);
  }

  update(expense){
    this.props.expenseUpdate(expense);
    this.setState({editing: false});
  }

  render() {
    const {
      expense,
      expenseRemove,
      expenseUpdate,
    } = this.props;

    const content = <React.Fragment>
      <h4> {expense.name} </h4>
      <h4> ${expense.amount} </h4>
    </React.Fragment>;
    
    const editing = <ExpenseForm expense={expense} onComplete={this.update}/>;
    const render = this.state.editing ? editing : content;

    return (
      <div className='expense'>
        <main onDoubleClick={() => this.setState({editing: true})}>
          {render}
        </main>
        <button className='delete-button' onClick={() => expenseRemove(expense)}>Remove This Expense</button>
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => ({
  expenseRemove: data => dispatch(expense.removeAction(data)),
  expenseUpdate: data => dispatch(expense.updateAction(data)),
});

export default connect(null, mapDispatchToProps)(ExpenseItem);