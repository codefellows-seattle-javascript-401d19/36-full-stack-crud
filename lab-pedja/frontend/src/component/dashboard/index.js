import React from "react";
import { connect } from "react-redux";

import CategoryForm from "../category-form";
import CategoryItem from "../category-item";
import * as category from '../../action/category';

class Dashboard extends React.Component {
  
  // componentDidMount() {
  //   this.props.handleAJAX();
  // }
  
  render() {
    
    let {
      categories,
      categoryCreate,
      categoryUpdate,
      categoryDestroy,
      countryCreateAjax,
      countryDestroyAjax,
    } = this.props;
    
    return (
      <div className="dashboard">
        <button onClick={countryCreateAjax}> Ajax Create Country </button>
        <button onClick={countryDestroyAjax}> Ajax Destroy Country </button>
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
    countryCreateAjax: () => dispatch(category.postCountry()),
    countryDestroyAjax: () => dispatch(category.deleteCountry()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
