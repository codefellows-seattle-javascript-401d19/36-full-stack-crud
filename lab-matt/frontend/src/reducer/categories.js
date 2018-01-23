const emptyState = [];

export default (state = emptyState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'CATEGORY_CREATE':
      return [...state, payload];
    
    case 'CATEGORY_UPDATE':
      return state.map((category) => {
        return category._id === payload._id ? payload : category;
      });
  
    case 'CATEGORY_REMOVE':
      return state.filter((category) => {
        return category._id !== payload._id;
      });
      
    case 'CATEGORY_CLEAR':
      return emptyState;
      
    default:
      return state;
  }
};