import React from 'react';
import { connect } from 'react-redux';
import * as expense from '../../action/expense';
import ExpenseForm from '../expense-form';

class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editing: false };

    this.handleForm = (expense) => {
      this.props.expenseUpdate(expense);
      this.setState({ editing: false });
      document.removeEventListener('mousedown', this.handleClickOutside);
    };
    this.setRef = (node) => {
      this.reference = node;
    };
    this.handleClickOutside = (event) => {
      if (!this.reference.contains(event.target)) {
        this.setState({ editing : false });
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    };
    this.openForm = () => {
      document.addEventListener('mousedown', this.handleClickOutside);
      this.setState({editing: true});
    };
  }
  
  render() {
    let { expense, expenseUpdate, expenseRemove } = this.props;
    let price = expense.price.toString().startsWith('-') ?
      expense.price.toString().replace('-', '-$') : 
      `$${expense.price}`;
    let title = expense.title || `'no title'`;
    
    let editingJSX = <ExpenseForm expense={expense} onComplete={this.handleForm} />;
    let contentJSX = <h4 onClick={this.openForm}> {title} | {price} </h4>;
    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div className='expense-item' ref={this.setRef}>
        {renderJSX}
        <button onClick={() => expenseRemove(expense)}> delete </button>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    expenseUpdate: (data) => dispatch(expense.updateAction(data)),
    expenseRemove: (data) => dispatch(expense.removeAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);