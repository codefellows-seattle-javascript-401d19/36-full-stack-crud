const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'CATEGORY_CREATE':
      return [...state, payload];
    case 'CATEGORY_UPDATE':
      return state.map(category => category._id === payload._id ? payload : category);
    case 'CATEGORY_DESTROY':
      return state.filter(category => category._id !== payload._id);
    default:
      return state;
  }
};
