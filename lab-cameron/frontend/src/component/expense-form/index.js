import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

const emptyState = {
  name: '',
  price: '',
};

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.expense ? this.props.expense : emptyState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const categoryId = this.props.category ? this.props.category.id : this.props.expense.categoryId;

    this.props.onComplete({
      ...this.state,
      categoryId,
    });

    this.setState(emptyState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expense) {
      this.setState(nextProps.expense);
    }
  }

  render() {
    const buttonText = this.props.expense ? 'update expense' : 'create expense';
    return (
      <form id='main-form' className='expense-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='name'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <br/>
        <input
          type='text'
          name='price'
          placeholder='price'
          value={this.state.price}
          onChange={this.handleChange}
        />
        <br/>
        <button type='submit'>{ buttonText }</button>
      </form>
    );
  }
}

export default ExpenseForm;
