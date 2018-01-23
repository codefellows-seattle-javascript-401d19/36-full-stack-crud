import React from 'react';
import { connect } from 'react-redux';
import * as category from '../../action/category';
import * as expense from '../../action/expense';
import CategoryForm from '../category-form';
import ExpenseForm from '../expense-form';
import ExpenseItem from '../expense-item';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { editing: false };

    this.handleForm = (category) => {
      this.props.putCategories(category);
      this.setState({editing: false});
      document.removeEventListener('mousedown', this.handleClickOutside);
    };
    this.setRef = (node) => {
      this.reference = node;
    };
    this.handleClickOutside = (event) => {
      if (this.reference && !this.reference.contains(event.target)) {
        this.setState({ editing : false });
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    };
    this.openForm = () => {
      document.addEventListener('mousedown', this.handleClickOutside);
      this.setState({editing: true});
    };
  }


  render() {
    let { expenses, category, categoryRemove, expenseCreate } = this.props;
    let categoryExpenseList = expenses[category._id];
    let name = category.name !== '' ? category.name : `'no name'`;

    let editingJSX =  <div ref={this.setRef} >
      <CategoryForm category={category} onComplete={this.handleForm} />
    </div>;
    let contentJSX = <div className='header'>
      <h2 onClick={this.openForm}> {name} </h2>
      <button onClick={() => categoryRemove(category)}> X </button>
    </div>;
    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return(
      <div className='category-item'>
        {renderJSX}
        <ExpenseForm category={category} onComplete={expenseCreate} />
        {
          categoryExpenseList.map((expense, index) => {
            return (
              <ExpenseItem key={index} expense={expense} />
            );
          })
        }
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    categoryUpdate: (data) => dispatch(category.updateAction(data)),
    putCategories: (data) => dispatch(category.putCategories(data)),
    categoryRemove: (data) => dispatch(category.removeAction(data)),
    expenseCreate: (data) => dispatch(expense.createAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);