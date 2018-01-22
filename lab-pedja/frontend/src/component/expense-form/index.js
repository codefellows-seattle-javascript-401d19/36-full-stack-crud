import React from "react";

let emptyState = {
  name: '',
  price: '',
}

class ExpenseForm extends React.Component {
  constructor(props){
    super(props);
    this.state = props.expense || emptyState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    let{name, value} = event.target;
    this.setState({
      [name] : value
    });
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

  render() {
    let buttonText = this.props.expense ? 'update expense' : 'create expense';

    return (
      <form className="expense-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="expense name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="$ 0"
          value={this.state.price}
          onChange={this.handleChange}
        />
        <button type="submit"> {buttonText} </button>
      </form>
    );
  }
}

export default ExpenseForm;
