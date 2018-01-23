import React from 'react';
import RestaurantForm from '../restaurant-form';

class RestaurantItem extends React.Component{
  render(){
    console.log(this.props);
    return(
      this.props.restaurants.map((restaurant, index) => {
        return (
          <div key={index}>
            <h4>Restaurant: {restaurant.name}</h4>
            <p>Cuisine: ${restaurant.cuisine}</p>
            <p>City: ${restaurant.city}</p>
            <p>Rating: ${restaurant.rating}</p>
            <button onClick={() => this.props.restaurantDestroy(restaurant)}> Delete </button>
            <RestaurantForm restaurant={restaurant} onComplete={this.props.restaurantUpdate}/>
          </div>
        );
      })
    );
  }
}

export default RestaurantItem;
