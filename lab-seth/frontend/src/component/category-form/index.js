import React from 'react';
import './category-form.scss';

let emptyState = {
  name: '',
  budget: 0,
};

class CategoryForm extends React.Component {
  constructor(props){
    super(props);

    this.state = this.props.category || emptyState;


    let memberFunctions = Object.getOwnPropertyNames(CategoryForm.prototype);
    for (let functionName of memberFunctions) {
      if (functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleChange(event){
    let {name, value} = event.target;
        
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.category)
      this.setState(nextProps.category);
  }


  render() {
    let buttonText = this.props.category ? 'Update' : 'Create Category';

    return (
      <form
        onSubmit={this.handleSubmit}
        className='category-form'>

        <input
          type='text'
          name='name'
          placeholder='Budget Name'
          value={this.state.name}
          onChange={this.handleChange}
          required
        />

        <input
          type='number'
          name='budget'
          placeholder='Budget Limit, Whole Dollars($) Only'
          value={this.state.budget}
          onChange={this.handleChange}
          required
        />

        <select value={this.state.period} onChange={this.handleChange} name='period' required>
          <option value="" disabled>Period</option>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="year">Year</option>
        </select>

        <button type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default CategoryForm;