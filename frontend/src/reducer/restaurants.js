const emptyState = [];

export default (state = emptyState, action) => {
  let {type, payload} = action;
  switch (type){
    case 'RESTAURANT_CREATE':
      return [...state, payload];
    case 'RESTAURANT_UPDATE':
      return state.map(restaurant => {
        if(restaurant.id == payload.id){
          return payload;
        }else{
          return restaurant;
        }
      });
    case 'RESTAURANT_DESTROY':
      return state.filter(category => {
        if(category.id !== payload.id){
          return category;
        }
      });
    default:
      return state;
  }
};
