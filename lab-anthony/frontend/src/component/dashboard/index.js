import React from 'react';
import {connect} from 'react-redux';
import CategoryForm from '../category-form';
import CategoryItem from '../category-item';
import * as category from '../../action/category';
import './_dashboard.scss';

class Dashboard extends React.Component{
  render(){
    let {
      categories,
      categoryCreate,
      categoryUpdate,
      categoryRemove,
      handleAJAX,
    } = this.props;

    return(
      <div className='dashboard'>
        <button onClick={handleAJAX}> do AJAX </button>
        <CategoryForm onComplete={categoryCreate} />
        <div className="category-container">
          {categories.map((category, i) =>
            <CategoryItem key={i} category={category}/>
          )}
        </div>
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
    categoryCreate: (data) => dispatch(category.createAction(data)),
    handleAJAX: () => dispatch(category.getBeers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
