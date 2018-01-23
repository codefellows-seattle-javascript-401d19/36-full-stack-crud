import React from 'react';
import {connect} from 'react-redux';
import SynthForm from '../synth-form';
import * as synth from '../../action/synth';

class SynthItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editing: false};
    this.update = this.update.bind(this);
  }

  update(synth){
    this.props.synthUpdate(synth);
    this.setState({editing: false});
  }

  render() {
    const {
      synth,
      synthRemove,
      synthUpdate,
    } = this.props;

    const content = <React.Fragment>
      <h4> {synth.name} </h4>
      <h4> ${synth.amount} </h4>
    </React.Fragment>;
    
    const editing = <SynthForm synth={synth} onComplete={this.update}/>;
    const render = this.state.editing ? editing : content;

    return (
      <div className='synth'>
        <main onDoubleClick={() => this.setState({editing: true})}>
          {render}
        </main>
        <button className='delete-button' onClick={() => synthRemove(synth)}>Remove This Synth</button>
      </div>
    );
  }
}

let mapDispatchToProps = dispatch => ({
  synthRemove: data => dispatch(synth.removeAction(data)),
  synthUpdate: data => dispatch(synth.updateAction(data)),
});

export default connect(null, mapDispatchToProps)(SynthItem);