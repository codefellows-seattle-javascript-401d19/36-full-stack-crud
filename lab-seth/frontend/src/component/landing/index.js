import React from 'react';
import {connect} from 'react-redux';
import CategoryForm from '../category-form';
import CategoryItem from '../category-item';
import * as categoryActions from '../../action/category';

import './landing.scss';

class Landing extends React.Component{

  componentWillMount() {
    this.props.handleGetCategory();
  }
  
  render() {
    let {
      categories,
      categoryCreate,
      categoryUpdate,
      categoryDestroy,
      handleGetCategory,
    } = this.props;

    return (
      <div className='landing'>
        <CategoryForm className='form' onComplete={categoryCreate} />
        {
          categories.map((category,index) => 
          <div key={index}>
            <CategoryItem 
              category={category}
              categoryUpdate={categoryUpdate}
              categoryDestroy={categoryDestroy}
            />
          </div>
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  //creating props in landing
  return {
    categories : state.categories,
  }
};

let mapDispatchToProps = (dispatch) => {
  // Creating props in landing that allow us to create update and remove
  return {
    categoryCreate: (data) => dispatch(categoryActions.postCategories(data)),
    categoryUpdate: (data) => dispatch(categoryActions.updateAction(data)),
    categoryDestroy: (data) => dispatch(categoryActions.removeAction(data)),
    handleGetCategory: () => dispatch(categoryActions.getCategories()),
  }
};

//this is the connection to the store, this is a curried function
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
