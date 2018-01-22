import React from 'react';

let emptyState = {name: '', amount: ''};

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.expense || emptyState;

    let memberFunctions = Object.getOwnPropertyNames(ExpenseForm.prototype);
    for (let functionName of memberFunctions) {
      if (functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }
  handleChange(event) {
    let {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let categoryID = this.props.category ? this.props.category.id : this.props.expense.categoryID;

    this.props.onComplete({
      ...this.state,
      categoryID,
    });

    this.setState(emptyState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expense)
      this.setState(nextProps.expense);
  }

  render() {
    let buttonText = this.props.expense ? 'Update Expense' : 'Create New Expense';

    return (
      <form
        className='expense-form'
        onSubmit={this.handleSubmit}
      >

        <input
          type='text'
          name='name'
          placeholder='name'
          required='true'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <br/>
        <input
          type='number'
          name='amount'
          placeholder='amount'
          required='true'
          value={this.state.amount}
          onChange={this.handleChange}
        />
        <br/>
        <button type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default ExpenseForm;