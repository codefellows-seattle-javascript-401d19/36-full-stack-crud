import React from 'react';
import {connect} from 'react-redux';
import RestaurantForm from '../restaurant-form';
import * as restaurant from '../../action/restaurant';

class Dashboard extends React.Component{
  render(){
    let {
      restaurants,
      restaurantCreate,
      restaurantUpdate,
      restaurantDestroy,
    } = this.props;

    return(
      <div>
        <RestaurantForm onComplete={restaurantCreate}/>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {restaurants: state.restaurants};
};

let mapDispatchToProps = (dispatch) => {
  return {
    restaurantCreate: (data) => {dispatch(restaurant.create(data));},
    restaurantUpdate: (data) => {dispatch(restaurant.update(data));},
    restaurantDestroy: (data) => {dispatch(restaurant.destroy(data));},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
