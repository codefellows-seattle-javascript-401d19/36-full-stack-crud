import React from 'react';

let emptyState = {name: '', polyphony: ''};

class SynthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.synth || emptyState;

    let memberFunctions = Object.getOwnPropertyNames(SynthForm.prototype);
    for (let functionName of memberFunctions) {
      if (functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }
  handleChange(event) {
    let {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let synthCompanyID = this.props.synthCompany ? this.props.synthCompany.id : this.props.synth.synthCompanyID;

    this.props.onComplete({
      ...this.state,
      synthCompanyID,
    });

    this.setState(emptyState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.synth)
      this.setState(nextProps.synth);
  }

  render() {
    let buttonText = this.props.synth ? 'Update Synth' : 'Create New Synth';

    return (
      <form
        className='synth-form'
        onSubmit={this.handleSubmit}
      >

        <input
          type='text'
          name='name'
          placeholder='name'
          required='true'
          value={this.state.name}
          onChange={this.handleChange}
        />
        <br/>
        <input
          type='number'
          name='polyphony'
          placeholder='polyphony'
          required='true'
          value={this.state.polyphony}
          onChange={this.handleChange}
        />
        <br/>
        <button type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default SynthForm;