import React from 'react';
import {connect} from 'react-redux';
import SynthItem from '../synth-item';
import SynthForm from '../synth-form';
import SynthCompanyForm from '../synthcompany-form';

import * as synthActions from '../../action/synth';
import * as synthCompanyActions from '../../action/synthcompany';

import './synthcompany-item.scss';


class SynthCompanyItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      adding: false,
    };
    this.update = this.update.bind(this);
    this.createSynth = this.createSynth.bind(this);
  }

  update(synthCompany){
    this.props.synthCompanyUpdate(synthCompany);
    this.setState({editing: false});
  }

  createSynth(synth) {
    this.props.synthCreate(synth);
    this.setState({adding: false});
  }

  render() {
    const {
      synths,
      synthCompany,
      synthCreate,
      synthCompanyUpdate,
      synthCompanyRemove,
    } = this.props;

    const synthCompanySynths = synths[synthCompany.id];
    
    const editing = <React.Fragment>
      <SynthCompanyForm 
        synthCompany={synthCompany} 
        onComplete={this.update}
      />
      <button 
        className='delete-button' 
        onClick={() => synthCompanyRemove(synthCompany)}>Delete This Synth Company
      </button>
    </React.Fragment>;

    const content = <React.Fragment>
      <h2 className='item-text'> {synthCompany.name} </h2>
      <h2 className='item-text'> {synthCompany.location} </h2>
    </React.Fragment>;

    const render = this.state.editing ? editing : content;
    const synthForm = this.state.adding ? (
      <SynthForm 
        synthCompany={synthCompany} 
        onComplete={this.createSynth}
      />
    ) : (
      <button 
        className='add-synth-button' 
        onClick={() => this.setState({adding: true})}>Add Synth
      </button>
    );
    const header = synthCompanySynths.length ? <h2>Current Synths:</h2> : null;

    return(
      <div className='synthCompany-item'>
        <main onDoubleClick={() => this.setState({editing: true})}>
          {render}
        </main>
        {synthForm}
        {header}
        {
          synthCompanySynths.map(synth =>
            <SynthItem synth={synth} key={synth.id}/>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  synths: state.synths,
});

const mapDispatchToProps = dispatch => ({

  synthCreate: data => dispatch(synthActions.createAction(data)),
  synthCompanyUpdate: data => dispatch(synthCompanyActions.putSynthCompany(data)),
  synthCompanyRemove: data => dispatch(synthCompanyActions.deleteSynthCompany(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SynthCompanyItem);