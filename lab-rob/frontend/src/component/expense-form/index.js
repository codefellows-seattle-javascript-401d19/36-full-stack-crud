import React from 'react';
import autoBind from '../../lib/auto-bind';

let emptyState = {
  name: '',
  price: '',
};

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.expense || emptyState;

    autoBind(this, ExpenseForm);
  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let categoryId = this.props.categoryId || this.props.expense.categoryId;

    this.props.onComplete({
      ...this.state,
      categoryId,
    });

    this.setState(emptyState);
  }

  componentWillReceiveProps(props) {
    if(props.expense)
      this.setState(props.expense);
  }

  render() {
    let buttonText = (this.props.expense ? 'Update' : 'Create') + ' Expense';

    return (
      <form className='expense-form' onSubmit={this.handleSubmit}>
        <input 
          type='text'
          name='name'
          placeholder='Expense name...'
          value={this.state.name}
          onChange={this.handleChange}
          required='required'
        />

        <input
          type='number'
          name='price'
          placeholder='Price...'
          value={this.state.price}
          onChange={this.handleChange}
          required='required'
        />

        <button type='submit'>{buttonText}</button>
      </form>
    );
  }
}

export default ExpenseForm;