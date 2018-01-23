const emptyState = {};

export default (state = emptyState, { type, payload }) => {
  let categoryId, categoryExpenses, updatedExpenses, updatedState;

  switch (type) {
    case 'CATEGORY_CREATE':
      return {...state, [payload._id]: []};
    case 'CATEGORY_DESTROY':
      updatedState = {...state};
      delete updatedState[payload._id];

      return updatedState;
    case 'EXPENSE_CREATE':
      categoryId = payload.categoryId;
      categoryExpenses = state[categoryId];
      updatedExpenses = [...categoryExpenses, payload];

      return {...state, [categoryId]: updatedExpenses};
    case 'EXPENSE_UPDATE':
      categoryId = payload.categoryId;
      categoryExpenses = state[categoryId];
      updatedExpenses = categoryExpenses.map(expense => expense._id === payload._id ? payload : expense);

      return {...state, [categoryId]: updatedExpenses};
    case 'EXPENSE_DELETE':
      categoryId = payload.categoryId;
      categoryExpenses = state[categoryId];
      updatedExpenses = categoryExpenses.filter(expense => expense._id !== payload._id);

      return {...state, [categoryId]: updatedExpenses};
    case 'INITIALIZE_EXPENSES':
      categoryId = payload._id;
      categoryExpenses = state[categoryId];
      console.log(categoryExpenses);
      updatedExpenses = [...categoryExpenses, payload];

      return {...state, [categoryId]: updatedExpenses};
    default:
      return state;
  }
};
