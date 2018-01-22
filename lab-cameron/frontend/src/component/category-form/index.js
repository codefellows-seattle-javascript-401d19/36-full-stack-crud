import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

const emptyState = {
  name: '',
  budget: '',
};

class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.category ? this.props.category : emptyState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category) {
      this.setState(nextProps.category);
    }
  }

  render() {
    const buttonText = this.props.category ? 'update category' : 'create category';
    return (
      <form id='main-form' className='category-form' onSubmit={this.handleSubmit}>
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
          name='budget'
          placeholder='budget'
          value={this.state.budget}
          onChange={this.handleChange}
        />
        <br/>
        <button type='submit'>{ buttonText }</button>
      </form>
    );
  }
}

export default CategoryForm;
