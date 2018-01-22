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
