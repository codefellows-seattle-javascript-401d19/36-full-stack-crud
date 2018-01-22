const emptyState = [];

const validateCategory = (category) => {
  if(!category.name)
    throw new Error ('category requires a name');
};

export default (state = emptyState, {type, payload}) => {
  switch(type) {
    case 'CATEGORY_CREATE':
      validateCategory(payload);
      return [...state, payload];
    case 'CATEGORY_UPDATE':
      return state.map(category => category.id === payload.id ? payload : category);
    case 'CATEGORY_DESTROY':
      return state.filter(category => category.id !== payload.id);
    default: 
      return state;
  }
};