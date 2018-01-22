import React from 'react';

let emptyState = {
  name: '',
  cuisine: '',
  city: '',
  rating: 0,
};

class RestaurantForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.restaurant || emptyState;
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(event){
    let {name, value} = event.target;
    this.setState({[name]: value});
  }

  onSubmit(event){
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps){
      this.setState(nextProps);
    }
  }

  render(){
    let buttonText = this.props.restaurant ? 'Update Restaurant' : 'Add Restaurant';
    return(
      <form onSubmit={this.onSubmit}>
        <input
          type='text'
          name='name'
          value={this.state.name}
          placeholder='label'
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='cuisine'
          value={this.state.cuisine}
          placeholder='label'
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='city'
          value={this.state.city}
          placeholder='label'
          onChange={this.handleChange}
        />
        <input
          type='number'
          step='1'
          name='rating'
          value={this.state.rating}
          placeholder='budget'
          onChange={this.handleChange}
        />
        <button type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default RestaurantForm;
