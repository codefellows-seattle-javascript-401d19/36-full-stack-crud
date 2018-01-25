import superagent from 'superagent';
import uuid from 'uuid/v1';

export const create = ({name, cuisine, city, rating}) => ({
  type: 'RESTAURANT_CREATE',
  payload: {
    name,
    cuisine,
    city,
    rating,
    id: uuid(),
  },
});

export const update = (restaurant) => ({
  type: 'RESTAURANT_UPDATE',
  payload: restaurant,
});

export const destroy = (restaurant) => ({
  type: 'RESTAURANT_DESTROY',
  payload: restaurant,
});

export const getRestaurants = () => (dispatch) => {
  return superagent.get('http://localhost:3000/api/restaurants')
    .then(response => {
      if(response.body.length > 0){
        dispatch(create({response}));
      }
    });
};

export const addRestaurant = (restaurant) => (dispatch) => {
  return superagent.post('http://localhost:3000/api/restaurants')
    .send(restaurant)
    .then(response => {
      dispatch(create({response}));
    });
};
