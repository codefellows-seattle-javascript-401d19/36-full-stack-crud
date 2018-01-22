
import React from 'react';
import {connect} from 'react-redux';
import Category from '../category';
import CategoryForm from '../category-form';
import * as categoryActions from '../../action/category';


class Dashboard extends React.Component{
  render(){
    let {
      categories,
      categoryCreate,
      categoryUpdate,
      categoryRemove,
    } = this.props;

    return(
      <div className='dashboard'>
        <div className='dashboard-banner'>
        </div>
        <CategoryForm onComplete={categoryCreate} />
        {
          categories.map((category, index) => 
            <Category key={index} category={category} />
          
          )}
      </div>
    );
  }
  

}


let mapStateToProps = (state) => {
  return{
    categories : state.categories,
  };
};


let mapDispatchToProps = (dispatch) => {
  return{
    categoryCreate : (data) => dispatch(categoryActions.createAction(data)),
    categoryUpdate : (data) => dispatch(categoryActions.updateAction(data)),
  };
};

// this connects the above two functions to the store
// takes original function and renames it as Landing (curried function)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);