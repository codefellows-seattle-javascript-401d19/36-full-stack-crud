const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'CATEGORY_CREATE':
      return [...state, payload];
    case 'CATEGORY_UPDATE':
      return state.map(category => category.uuid === payload.uuid ? payload : category);
    case 'CATEGORY_DESTROY':
      return state.filter(category => category.uuid !== payload.uuid);
    default:
      return state;
  }
};
