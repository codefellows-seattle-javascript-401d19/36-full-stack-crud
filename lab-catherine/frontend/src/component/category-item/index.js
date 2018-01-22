import './_category_item.scss';
import React from 'react';
import CategoryForm from '../category-form';
import * as categoryActions from '../../action/category';
import * as expenseActions from '../../action/expense';
import {connect} from 'react-redux';
import ExpenseItem from '../expense-item';
import ExpenseForm from '../expense-form';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};

    let memberFunctions = Object.getOwnPropertyNames(CategoryItem.prototype);
    for(let functionName of memberFunctions) {
      if(functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleUpdate(category) {
    this.props.categoryUpdate(category);
    this.setState({editing: false});
  }

  render() {
    let {category, categoryDestroy, categoryUpdate, expenses, expenseCreate} = this.props;

    let categoryExpenses = expenses[category.id];

    let editingJSX = <CategoryForm category={category} onComplete={this.handleUpdate} />;
    let contentJSX =
    <div className='new-item'>
      <div onDoubleClick={() => this.setState({editing: true})} className='headers'>
        <h2>Name: {category.name}</h2>
        <h2>Budget: ${category.budget}</h2>
      </div>
      <button className='delete' onClick={() => categoryDestroy(category)}>X</button>
    </div>;
    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div className='category-item'>
        {renderJSX}
        <ExpenseForm category={category} onComplete={expenseCreate} />
        {
          categoryExpenses.map((expense, index) => <ExpenseItem  key={index} expense={expense} />
          )}
      </div>
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
  categoryDestroy: (data) => dispatch(categoryActions.destroyAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);