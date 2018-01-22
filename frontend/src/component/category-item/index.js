import React from 'react';
import {connect} from 'react-redux';
import CategoryForm from '../category-form';
import ExpenseForm from '../expense-form';
import ExpenseItem from '../expense-item';

import * as expenseActions from '../../action/expense';
import * as categoryActions from '../../action/category';

class CategoryItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {editing : false};


    let memberFunctions = Object.getOwnPropertyNames(CategoryItem.prototype);
    for (let functionName of memberFunctions) {
      if (functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleUpdate(category){
    this.props.categoryUpdate(category);
    this.setState({editing : false});
  }

  render() {
    let {
      expenses,
      category,
      expenseCreate,
      categoryUpdate,
      categoryDestroy
    } = this.props;

    let categoryExpenses = expenses[category.id];

    let contentJSX =
      <div>
        <h2 onDoubleClick={() => this.setState({editing : true})}>
        {category.name}: ${category.budget} / {category.period}</h2><button className='delete-button' onClick={() => categoryDestroy(category)}> X </button>
      </div>;
      
    let editingJSX =
      <div>
        <h2 onDoubleClick={() => this.setState({ editing: true })}>
        {category.name}: ${category.budget} / {category.period}</h2>  
        <CategoryForm category={category} onComplete={this.handleUpdate} />
      </div>;

    let renderJSX = this.state.editing ? editingJSX : contentJSX;

    return (
      <div className='category-item'>
        {renderJSX}
        <ExpenseForm category={category} onComplete={expenseCreate} />
        <main className='expense-container'>
        {
          categoryExpenses.map((expense, index) => 
            <ExpenseItem key={index} expense={expense} />)
        }
        </main>
      </div>
    );
  } 
}


let mapStateToProps = (state) => ({
  expenses : state.expenses,
});

let mapDispatchToProps = (dispatch) => ({
  expenseCreate: (data) => dispatch(expenseActions.createAction(data)),
  categoryRemove: (data) => dispatch(categoryActions.removeAction(data)),
  categoryUpdate: (data) => dispatch(categoryActions.updateAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
