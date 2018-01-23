import React from 'react';

let emptyState = {
  name: '',
  location: '',
};

class SynthCompanyForm extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.synthCompany || emptyState;
    let memberFunctions = Object.getOwnPropertyNames(SynthCompanyForm.prototype);
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
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.synthCompany)
      this.setState(nextProps.synthCompany);
  }

  render() {
    const buttonText = this.props.synthCompany ? 'Update Synth Company' : 'Create New Synth Company';
    const formSynthCompany = this.props.synthCompany ? 'update-form' : 'create-form';
    const header = !this.props.synthCompany ? <h2>Create New Synth Company</h2> : null;

    return (
      <form
        onSubmit={this.handleSubmit}
        className={formSynthCompany}>
        {header}
        <input
          type='text'
          name='name'
          placeholder='name'
          required='true'
          value={this.state.name}
          onChange={this.handleChange}
        /><br/>
        <input 
          type='text'
          name='location'
          placeholder='location'
          required='true'
          value={this.state.location}
          onChange={this.handleChange}
        /><br/>
        <button className='submit-button' type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default SynthCompanyForm;