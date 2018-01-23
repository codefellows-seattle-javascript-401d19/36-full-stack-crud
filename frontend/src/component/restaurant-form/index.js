import React from 'react';

let emptyState = {
  name: '',
  cuisine: '',
  city: '',
  rating: '',
};

class RestaurantForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.restaurants || emptyState;
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
          placeholder='restaurant name'
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='cuisine'
          value={this.state.cuisine}
          placeholder='cuisine'
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='city'
          value={this.state.city}
          placeholder='city'
          onChange={this.handleChange}
        />
        <input
          type='number'
          step='1'
          max='5'
          name='rating'
          value={this.state.rating}
          placeholder='rating'
          onChange={this.handleChange}
        />
        <button type='submit'> {buttonText} </button>
      </form>
    );
  }
}

export default RestaurantForm;
