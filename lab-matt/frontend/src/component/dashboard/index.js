import React from 'react';
import { connect } from 'react-redux';
import * as category from '../../action/category';
import CategoryForm from '../category-form';
import CategoryItem from '../category-item';

class Dashboard extends React.Component {
  render() {
    let { categories, categoryCreate, getCategories } = this.props;
    return (
      <div className='dashboard'>
        <button onClick={getCategories}> GET AJAX </button>
        <CategoryForm onComplete={categoryCreate} />
        {
          categories.map((category, index) => {
            return <CategoryItem key={index} category={category} />;
          })
        }
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    categoryCreate: (data) => dispatch(category.createAction(data)),
    getCategories: () => dispatch(category.getCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);