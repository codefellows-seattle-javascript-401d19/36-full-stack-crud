import React from 'react';
import {connect} from 'react-redux';
import RestaurantForm from '../restaurant-form';
import RestaurantItem from '../restaurant-item';
import * as restaurant from '../../action/restaurant';

class Dashboard extends React.Component{
  componentWillMount(){
    this.props.getRestaurants();
  }

  render(){
    let {
      restaurants,
      restaurantCreate,
      restaurantUpdate,
      restaurantDestroy,
      getRestaurants,
    } = this.props;

    return(
      <div>
        <RestaurantForm onComplete={restaurantCreate}/>
        <RestaurantItem restaurants={restaurants} restaurantUpdate={restaurantUpdate} restaurantDestroy={restaurantDestroy}/>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {restaurants: state};
};

let mapDispatchToProps = (dispatch) => {
  return {
    restaurantCreate: (data) => {dispatch(restaurant.create(data));},
    restaurantUpdate: (data) => {dispatch(restaurant.update(data));},
    restaurantDestroy: (data) => {dispatch(restaurant.destroy(data));},
    getRestaurants: () => {dispatch(restaurant.getRestaurants());},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
