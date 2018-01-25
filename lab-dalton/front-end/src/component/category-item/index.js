import React from 'react';
import CategoryForm from '../category-form';
import * as categoryActions from '../../action/category';
import * as wizardActions from '../../action/wizard';
import {connect} from 'react-redux';
import WizardItem from '../wizard-item';
import WizardForm from '../wizard-form';

class CategoryItem extends React.Component {
  render() {
    let {category, categoryDestroy, categoryUpdate, wizards, wizardCreate} = this.props;

    let categoryWizards = wizards[category.id];

    return (
      <div className='category-item'>
        <CategoryForm category={category} onComplete={categoryUpdate} />
        <div className='new-item'>
          <div className='headers'>
            <h2>Name: {category.name}</h2>
            <h2>Budget: ${category.budget}</h2>
          </div>
          <button onClick={() => categoryDestroy(category)}>delete</button>
          <WizardForm category={category} onComplete={wizardCreate} />
          {
            categoryWizards.map((wizard, index) => <WizardItem  key={index} wizard={wizard} />
            )}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    wizards: state.wizards,
  };
};

let mapDispatchToProps = (dispatch) => ({
  wizardCreate: (data) => dispatch(wizardActions.createAction(data)),
  categoryUpdate: (data) => dispatch(categoryActions.updateAction(data)),
  categoryDestroy: (data) => dispatch(categoryActions.destroyAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);