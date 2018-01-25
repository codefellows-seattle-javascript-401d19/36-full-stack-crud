import React from 'react';
import {connect} from 'react-redux';
import WizardForm from '../wizard-form';
import * as wizard from '../../action/wizard';

class WizardItem extends React.Component {
  render() {
    let {
      wizard, 
      wizardDelete,
      wizardUpdate,
    } = this.props;

    return (
      <div className='wizard-item'>
        <h2>{wizard.name}</h2>
        <h2>${wizard.price}</h2>
        <button onClick={() => wizardDelete(wizard)}>delete</button>
        <WizardForm wizard={wizard} onComplete={wizardUpdate}/>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});

let mapDispatchToProps = (dispatch) => ({
  wizardDelete: (data) => dispatch(wizard.removeAction(data)),
  wizardUpdate: (data) => dispatch(wizard.updateAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardItem);