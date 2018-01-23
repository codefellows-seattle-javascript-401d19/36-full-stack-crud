import React from 'react';
import { connect } from 'react-redux';
import * as category from '../../action/category';
import CategoryForm from '../category-form';
import CategoryItem from '../category-item';

class Dashboard extends React.Component {
  render() {
    let { categories, postCategories } = this.props;
    return (
      <div className='dashboard'>
        <CategoryForm onComplete={postCategories} />
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
    postCategories: (data) => dispatch(category.postCategories(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);