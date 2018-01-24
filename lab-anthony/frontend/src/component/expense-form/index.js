import React from 'react';
import './_expense-form.scss';

let emptyState = {content : '', name : ''};

class ExpenseForm extends React.Component {
  constructor(props){
    super(props);
    this.state = props.expense || emptyState;

    let memberFunctions = Object.getOwnPropertyNames(ExpenseForm.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleChange(event){
    let {name, value} = event.target;
    this.setState({[name] : value});
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
          placeholder='name'
          value={this.state.name}
          onChange={this.handleChange}
        />

        <input
          type='text'
          name='content'
          placeholder='content'
          value={this.state.content}
          onChange={this.handleChange}
        />

        <button type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default ExpenseForm;
