import React from 'react';

let emptyState = {
  name: '',
  budget: '',
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

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category)
      this.setState(nextProps.category);
  }

  render() {
    const buttonText = this.props.category ? 'Update Category' : 'Create New Category';
    const formCategory = this.props.category ? 'update-form' : 'create-form';
    const header = !this.props.category ? <h2>Create New Budget Category</h2> : null;

    return (
      <form
        onSubmit={this.handleSubmit}
        className={formCategory}>
        {header}
        <input
          type='text'
          name='name'
          placeholder='name'
          required='true'
          value={this.state.name}
          onChange={this.handleChange}
        /><br/>
        <input 
          type='number'
          name='budget'
          placeholder='budget'
          required='true'
          value={this.state.budget}
          onChange={this.handleChange}
        /><br/>
        <button className='submit-button' type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default CategoryForm;