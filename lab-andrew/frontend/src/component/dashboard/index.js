import React from 'react';
import {connect} from 'react-redux';
import SynthCompanyForm from '../synthcompany-form';
import SynthCompanyItem from '../synthcompany-item';
import * as synthCompanyAction from '../../action/synthcompany';

class Dashboard extends React.Component {
  
  componentWillMount(){
    this.props.handleAJAX();
  }

  render(){
    let {
      synthCompanies,
      synthCompanyCreate,
      synthCompanyUpdate,
      synthCompanyRemove,
    } = this.props;

    const header = synthCompanies.length ? <h2>Synth Companies:</h2> : null;
    return (
      <div className='landing'>
        <SynthCompanyForm onComplete={synthCompanyCreate}/>
        {header}
        <ul>
          {
            synthCompanies.map((synthCompany) =>
              <li key={synthCompany.id}>
                <SynthCompanyItem
                  synthCompany={synthCompany}
                  synthCompanyRemove={synthCompanyRemove}
                  synthCompanyUpdate={synthCompanyUpdate}
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
    synthCompanies: state.synthCompanies,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    handleAJAX: () => dispatch(synthCompanyAction.getSynthCompanies()),
    synthCompanyCreate: data => dispatch(synthCompanyAction.createAction(data)),
    synthCompanyUpdate: data => dispatch(synthCompanyAction.updateAction(data)),
    synthCompanyRemove: data => dispatch(synthCompanyAction.removeAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);