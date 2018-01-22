
import React from 'react';

let emptyState = {
  name : '',
  budgetTotal : '',
};

class CategoryForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.category || emptyState;
  
    //-------------------------------------------------------------
    // Binding Handlers
    //-------------------------------------------------------------
    let memberFunctions = Object.getOwnPropertyNames(CategoryForm.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
  }


  // member functions

  handleNameChange(event){
    let {value} = event.target;
    this.setState({ name : value });
  }

  handleBudgetChange(event){
    let {value} = event.target;
    this.setState({ budgetTotal : value });
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  // hoooks

  componentWillReceiveProps(nextProps){
    if(nextProps.category)
      this.setState(nextProps.category);
  }

  render(){
    let buttonText = this.props.category ? 'update' : 'create category';

    return(
      <form
        onSubmit={this.handleSubmit}
        className='category-form'>

        <input
          type='text'
          name='name'
          placeholder='Category Name'
          value={this.state.name}
          onChange={this.handleNameChange}
        />


        <input
          type='number'
          name='budget-total'
          placeholder='Budget Total'
          value={this.state.budgetTotal}
          onChange={this.handleBudgetChange}
        />
      

        <button type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default CategoryForm;