import superagent from 'superagent';

export const create = ({name, cuisine, city, rating}) => ({
  type: 'RESTAURANT_CREATE',
  payload: {
    name,
    cuisine,
    city,
    rating,
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
