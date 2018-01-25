import './_continent-form.scss';
import React from 'react';

let emptyState = {
  name: '',
  population: '',
};

class ContinentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.continent || emptyState;

    let memberFunctions = Object.getOwnPropertyNames(ContinentForm.prototype);
    for(let functionName of memberFunctions) {
      if(functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleNameChange(event) {
    let {value} = event.target;
    this.setState({name: value});
  }

  handlePopulationChange(event) {
    let {value} = event.target;
    this.setState({population: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.continent)
      this.setState(nextProps.continent);
  }

  render() {
    let buttonText = this.props.continent ? 'update continent' : 'create continent';

    return (
    
      <form
        onSubmit={this.handleSubmit}
        className='continent-form'>

        <input
          type='text'
          name='name'
          placeholder='name'
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <input
          type='number'
          name='population'
          placeholder='population'
          value={this.state.population}
          onChange={this.handlePopulationChange}
        />
        <button type='submit'>{buttonText}</button>
      </form>
    );
  }
}

export default ContinentForm;