import './_forest-form.scss';
import React from 'react';

let emptyState = {
  name : '',
  location: '',
};

class ForestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.forest || emptyState;

    let memberFunctions = Object.getOwnPropertyNames(ForestForm.prototype);
    for(let functionName of memberFunctions) {
      if(functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let continentID = this.props.continent ? this.props.continent.id : this.props.forest.continentID;

    this.props.onComplete({
      ...this.state,
      continentID,
    });

    this.setState(emptyState);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.forest)
      this.setState(nextProps.forest);
  }
  
  render() {
    let buttonText = this.props.forest ? 'update forest' : 'create forest';

    return (
      <form
        className='forest-form'
        onSubmit={this.handleSubmit}
      >

        <textarea
          type='text'
          name='name'
          placeholder='name'
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <textarea
          type='number'
          name='location'
          placeholder='location'
          value={this.state.location}
          onChange={this.handleLocationChange}
        />
          
        <button type='submit'>{buttonText}</button>

      </form>
    );
  }
}

export default ForestForm;