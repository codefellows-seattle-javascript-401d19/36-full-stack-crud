const emptyState = {};

export default (state = emptyState, { type, payload }) => {
  let categoryId, categoryExpenses, updatedExpenses, updatedState;

  switch (type) {
    case 'CATEGORY_CREATE':
      return {...state, [payload.id]: []};
    case 'CATEGORY_DESTROY':
      updatedState = {...state};
      delete updatedState[payload.id];

      return updatedState;
    case 'EXPENSE_CREATE':
      categoryId = payload.categoryId;
      categoryExpenses = state[categoryId];
      updatedExpenses = [...categoryExpenses, payload];

      return {...state, [categoryId]: updatedExpenses};
    case 'EXPENSE_UPDATE':
      categoryId = payload.categoryId;
      categoryExpenses = state[categoryId];
      updatedExpenses = categoryExpenses.map(expense => expense.id === payload.id ? payload : expense);

      return {...state, [categoryId]: updatedExpenses};
    case 'EXPENSE_DELETE':
      categoryId = payload.categoryId;
      categoryExpenses = state[categoryId];
      updatedExpenses = categoryExpenses.filter(expense => expense.id !== payload.id);

      return {...state, [categoryId]: updatedExpenses};
    default:
      return state;
  }
};
