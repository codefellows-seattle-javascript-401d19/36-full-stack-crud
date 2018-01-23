import React from 'react'
import {connect} from 'react-redux'
import CategoryForm from '../category-form'
import CategoryItem from '../category-item'
import * as category from '../../action/categories'


class Dashboard extends React.Component{
  render(){

    let {
      categories,
      categoryCreate,
      categoryUpdate,
      categoryRemove,
    } = this.props


  return (
    <div className = 'dashboard'>
      <CategoryForm onComplete={categoryCreate} /> 
          <CategoryItem 
            categories={categories}
            categoryRemove={categoryRemove}
            categoryUpdate={categoryUpdate}
          />       
    </div>
    )
  }
}

let mapStateToProps = (state) => {
  return{
    categories : state.category,
  }
}

let mapDispatchToProps = (dispatch) => {
  return{
    categoryCreate: (data) => dispatch(category.createAction(data)),
    categoryRemove: (data) => dispatch(category.removeAction(data)),
    categoryUpdate: (data) => dispatch(category.updateAction(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
