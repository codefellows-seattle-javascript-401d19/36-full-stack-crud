import React from 'react';
import CategoryForm from '../category-form';
import * as categoryActions from '../../action/category';
import * as expenseActions from '../../action/expense';
import { connect } from 'react-redux';
import ExpenseItem from '../expense-item';
import ExpenseForm from '../expense-form';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };

    let memberFunctions = Object.getOwnPropertyNames(CategoryItem.prototype);
    for (let functionName of memberFunctions) {
      if (functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleUpdate(category) {
    this.props.categoryUpdate(category);
    this.setState({ editing: false });
  }
  render() {
    let { category, categoryRemove, categoryUpdate, expenses, expenseCreate } = this.props;

    let categoryExpenses = expenses[category.id];

    let editingJSX = <CategoryForm onComplete={this.handleUpdate} category={category} />;
    let contentJSX =
      <div onDoubleClick={() => this.setState({ editing: true })}>
        <h2> Title: {category.name} </h2>
        <p> Budget: ${category.budget} </p>
        <button onClick={() => { categoryRemove(category); }}> Delete </button>
      </div>;


    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <li className="category-item">
        {renderJSX}
        <ExpenseForm category={category} onComplete={expenseCreate} />
        <main className='expense-container'>
          {
            categoryExpenses.map((expense, i) => <ExpenseItem expense={expense} key={i} />)
          }
        </main>
      </li>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
  };
};

let mapDispatchToProps = (dispatch) => ({
  expenseCreate: (data) => dispatch(expenseActions.createAction(data)),
  categoryUpdate: (data) => dispatch(categoryActions.updateAction(data)),
  categoryRemove: (data) => dispatch(categoryActions.removeAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);