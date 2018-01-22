import React from "react";
import { connect } from "react-redux";

import CategoryForm from "../category-form";
import CategoryItem from "../category-item";
import * as category from '../../action/category';

class Dashboard extends React.Component {
  render() {
    
    let {
      categories,
      categoryCreate,
      categoryUpdate,
      categoryDestroy,
    } = this.props;
    
    return (
      <div className="dashboard">
        <CategoryForm onComplete={categoryCreate} />
        <div className="categories">
          {categories.map((category, index) => (
            <CategoryItem 
              key={index} 
              category={category}
              destroyCategory={categoryDestroy} 
              updateCategory={categoryUpdate}
            />
          ))}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    categories : state.categories,
  }
};

let mapDispatchToProps = (dispatch) => {
  return{
    categoryCreate: (data) => dispatch(category.createAction(data)),
    categoryUpdate: (data) => dispatch(category.updateAction(data)),
    categoryDestroy: (data) => dispatch(category.destroyAction(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
