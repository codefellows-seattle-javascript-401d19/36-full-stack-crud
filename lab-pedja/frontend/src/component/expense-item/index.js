import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "../expense-form";
import * as expense from '../../action/expense';

class Expense extends React.Component {
  constructor(props){
    super(props);
    this.state = {editing : false};

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(expense){
    this.props.expenseUpdate(expense);
    this.setState({editing : false});
  }

  render(){
    let {
      expense,
      expenseDestroy,
      expenseUpdate,
    } = this.props;

    let editingJSX = <ExpenseForm onComplete={this.handleUpdate} expense={expense} />;
    let contentJSX = 
      <div onDoubleClick={() => this.setState({ editing : true })} >
        <h4>{expense.name}</h4>
        <p> ${expense.price}</p>
      </div>;
    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div className="expense-item">
        <button onClick={expenseDestroy.bind(null, expense)}> X </button>
          {renderJSX}
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => ({
  expenseDestroy: data => dispatch(expense.destroyAction(data)),
  expenseUpdate: data => dispatch(expense.updateAction(data)),
});

export default connect(null, mapDispatchToProps)(Expense);