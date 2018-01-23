import './dashboard.scss';

import React from 'react';
import {connect} from 'react-redux';

import {createAction, clearAction, getCategoriesAction} from '../../action/category';
import CategoryForm from '../category-form';
import CategoryItem from '../category-item';

class Dashboard extends React.Component {
  render() {
    let {
      categories, 
      categoryCreate,
      categoryClear,
      getCategories,
    } = this.props;

    return (
      <div className='dashboard'>
        <button className='clear-all' onClick={categoryClear}>Remove All Categories</button>
        <button onClick={getCategories}>get that stuff</button>
        <CategoryForm onComplete={categoryCreate} />
        <ul className='categories'>
          {categories.map(category => (
            <li className='category' key={category.id}>
              <CategoryItem category={category} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  categories: state.categories,
});

let mapDispatchToProps = dispatch => ({
  categoryCreate: (data) => dispatch(createAction(data)),
  categoryClear: (data) => dispatch(clearAction()),
  getCategories: () => dispatch(getCategoriesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);