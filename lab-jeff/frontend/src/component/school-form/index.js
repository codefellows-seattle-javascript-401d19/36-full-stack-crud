import React from 'react';

let emptyState = {
  name: '',
  budget: '',
};

class SchoolForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.school || emptyState;

    let memberFunctions = Object.getOwnPropertyNames(SchoolForm.prototype);
    for (let functionName of memberFunctions) {
      if (functionName.startsWith('handle')) {
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleChange(event) {
    let { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.school) this.setState(nextProps.school);
  }

  render() {
    let buttonText = this.props.school ? 'update school' : 'create school';

    return (
      <form className="school-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="city"
          value={this.state.budget}
          onChange={this.handleChange}
        />
        <button type="submit">{buttonText} </button>
      </form>
    );
  }
}

export default SchoolForm;
