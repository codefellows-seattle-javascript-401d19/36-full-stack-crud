import './_continent-form.scss';
import React from 'react';

let emptyState = {
  name: '',
  budget: '',
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

  handleBudgetChange(event) {
    let {value} = event.target;
    this.setState({budget: value});
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
    // let classNameGenerator = this.props.continent ? 'update-continent' : 'create-continent';

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
          name='budget'
          placeholder='budget'
          value={this.state.budget}
          onChange={this.handleBudgetChange}
        />
        <button type='submit'>{buttonText}</button>
      </form>
    );
  }
}

export default ContinentForm;