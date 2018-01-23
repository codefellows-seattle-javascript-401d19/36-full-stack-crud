import React from "react";

let emptyState = {
  name: '',
  budget: '',
}

class CountryForm extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.country ? this.props.country : emptyState;

    let memberFunctions = Object.getOwnPropertyNames(CountryForm.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
  }
//--------------------------------------------------
// Member Functions
//--------------------------------------------------

  handleChange(event) {
    let{name, value} = event.target;
    this.setState({
      [name] : value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

//--------------------------------------------------
// Hooks
//--------------------------------------------------

  componentWillReceiveProps(nextProps) {
    if(nextProps.country)  
      this.setState(nextProps.country);
  }

//--------------------------------------------------
// Render
//--------------------------------------------------

  render() {
    let buttonText = this.props.country ? 'update country' : 'create country';

    return (
      <form onSubmit={this.handleSubmit} className="country-form">
        <input
          type="text"
          name="name"
          placeholder="country name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="number"
          name="budget"
          placeholder="$ 0"
          value={this.state.budget}
          onChange={this.handleChange}
        />
        <button type="submit"> {buttonText} </button>
      </form>
    );
  }
}

export default CountryForm;
