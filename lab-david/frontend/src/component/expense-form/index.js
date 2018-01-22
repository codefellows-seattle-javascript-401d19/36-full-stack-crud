import React from 'react';

let emptyState = {
  name : '',
  price : '',
};

class ExpenseForm extends React.Component {
  constructor(props){
    super(props);
    this.state = props.expense || emptyState;
    //-------------------------------------------------------------
    // Binding function
    //-------------------------------------------------------------
    let memberFunctions = Object.getOwnPropertyNames(ExpenseForm.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  //-------------------------------------------------------------
  // member functions
  //-------------------------------------------------------------
  handleNameChange(event){
    let {value} = event.target;
    this.setState({ name : value });
  }

  handleExpensePriceChange(event){
    let {value} = event.target;
    this.setState({ price : value });
  }

  handleSubmit(event){
    event.preventDefault();
    let categoryID = this.props.category ? this.props.category.id : this.props.expense.categoryID;

    this.props.onComplete({
      ...this.state,
      categoryID,
    });

    this.setState(emptyState);
  }

  //-------------------------------------------------------------
  // HOOKS
  //-------------------------------------------------------------

  componentWillReceiveProps(nextProps){
    if(nextProps.expense)
      this.setState(nextProps.expense);
  }

  render(){
    let buttonText = this.props.expense ? 'update expense' : 'create expense';

    return(
      <form
        className='expense-form'
        onSubmit={this.handleSubmit}
      >

        <input
          type='text'
          name='name'
          placeholder='Expense'
          value={this.state.name}
          onChange={this.handleNameChange}
          required
        />

        <input
          type='number'
          name='price'
          placeholder='Price'
          value={this.state.price}
          onChange={this.handleExpensePriceChange}
          required
        />

        <button type='submit'> {buttonText} </button>

      </form>
    );

  }

}

export default ExpenseForm;