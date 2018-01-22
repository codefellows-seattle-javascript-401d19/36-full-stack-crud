let emptyState;
try {
  emptyState = JSON.parse(localStorage.categories) || {};
  console.log('__LOCALSTORAGE__ categories retrieved');
} catch(e) {
  emptyState = [];
}

export default (state = emptyState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'CATEGORY_CREATE':
      return [...state, payload];
    
    case 'CATEGORY_UPDATE':
      return state.map((category) => {
        return category.id === payload.id ? payload : category;
      });
  
    case 'CATEGORY_REMOVE':
      return state.filter((category) => {
        return category.id !== payload.id;
      });
      
    case 'CATEGORY_CLEAR':
      return emptyState;
      
    default:
      return state;
  }
};