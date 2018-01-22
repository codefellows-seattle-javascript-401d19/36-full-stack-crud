import React from 'react';
import {connect} from 'react-redux';
import CategoryForm from '../category-form';
import CategoryItem from '../category-item';
import * as categoryAction from '../../action/category';

class Dashboard extends React.Component {
  
  componentWillMount(){
    this.props.handleAJAX();
  }

  render(){
    let {
      categories,
      categoryCreate,
      categoryUpdate,
      categoryRemove,
    } = this.props;

    const header = categories.length ? <h2>Categories:</h2> : null;
    return (
      <div className='landing'>
        <CategoryForm onComplete={categoryCreate}/>
        {header}
        <ul>
          {
            categories.map((category) =>
              <li key={category.id}>
                <CategoryItem
                  category={category}
                  categoryRemove={categoryRemove}
                  categoryUpdate={categoryUpdate}
                />
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}


let mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    handleAJAX: () => dispatch(categoryAction.getSynth()),
    categoryCreate: data => dispatch(categoryAction.createAction(data)),
    categoryUpdate: data => dispatch(categoryAction.updateAction(data)),
    categoryRemove: data => dispatch(categoryAction.removeAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);