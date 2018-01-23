import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../category-form';
import CategoryItem from '../category-item';
import * as category from '../../action/category';
import * as expense from '../../action/expense';

class Dashboard extends Component {
  componentWillMount() {
    this.props.initializeCategories()
      .then(() => {
        this.props.initializeExpenses();
      });
  }

  render() {
    const { categories, categoryCreate } = this.props;
    return (
      <div className='dashboard'>
        <h2 id='category-headline'>Create Category</h2>
        <CategoryForm onComplete={categoryCreate} />
        {
          categories.map(category => {
            return <div key={category.uuid}>
              <CategoryItem category={category} />
            </div>;
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category,
    expenses: state.expense,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryCreate: data => dispatch(category.createCategory(data)),
    initializeCategories: () => dispatch(category.getCategorys()),
    initializeExpenses: () => dispatch(expense.getExpenses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
