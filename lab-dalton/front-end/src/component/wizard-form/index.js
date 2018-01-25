import React from 'react';

let emptyState = {
  name : '',
  price: '',
};

class WizardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.wizard || emptyState;

    let memberFunctions = Object.getOwnPropertyNames(WizardForm.prototype);
    for(let functionName of memberFunctions) {
      if(functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({price: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let categoryID = this.props.category ? this.props.category.id : this.props.wizard.categoryID;

    this.props.onComplete({
      ...this.state,
      categoryID,
    });

    this.setState(emptyState);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.wizard)
      this.setState(nextProps.wizard);
  }
  
  render() {
    let buttonText = this.props.wizard ? 'update wizard' : 'create wizard';

    return (
      <form
        className='wizard-form'
        onSubmit={this.handleSubmit}
      >

        <input
          type='text'
          name='name'
          placeholder='name'
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <input
          type='number'
          name='price'
          placeholder='power'
          value={this.state.price}
          onChange={this.handlePriceChange}
        />
          
        <button type='submit'>{buttonText}</button>

      </form>
    );
  }
}

export default WizardForm;