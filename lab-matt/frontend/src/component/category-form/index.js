import React from 'react';

let emptyState = {
  title: '',
};

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.category || emptyState;

    this.handleChange = (event) => {
      let { name, value } = event.target;
      return this.setState({ [name]: value });
    };

    this.handleSubmit = (event) => {
      event.preventDefault();

      this.props.onComplete(this.state);
      this.setState(emptyState);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category) {
      this.setState(nextProps.category);
    }
  }

  render() {
    let buttonText = this.props.category ? 'update category' : 'add category';

    return (
      <form onSubmit={this.handleSubmit} className='category-form'>
        <input 
          onChange={this.handleChange} 
          type="text" 
          name='title' 
          placeholder='title' 
          value={this.state.title} 
        />
        <button type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default CategoryForm;