const emptyState = {};

export default (state = emptyState, { type, payload }) => {
  let categoryId, categoryExpenses, updatedExpenses, updatedState;

  switch (type) {
    case 'CATEGORY_CREATE':
      return {...state, [payload.uuid]: []};
    case 'CATEGORY_DESTROY':
      updatedState = {...state};
      delete updatedState[payload.uuid];

      return updatedState;
    case 'EXPENSE_CREATE':
      categoryId = payload.categoryId;
      categoryExpenses = state[categoryId];
      updatedExpenses = [...categoryExpenses, payload];

      return {...state, [categoryId]: updatedExpenses};
    case 'EXPENSE_UPDATE':
      categoryId = payload.categoryId;
      categoryExpenses = state[categoryId];
      updatedExpenses = categoryExpenses.map(expense => expense.uuid === payload.uuid ? payload : expense);

      return {...state, [categoryId]: updatedExpenses};
    case 'EXPENSE_DELETE':
      categoryId = payload.categoryId;
      categoryExpenses = state[categoryId];
      updatedExpenses = categoryExpenses.filter(expense => expense.uuid !== payload.uuid);

      return {...state, [categoryId]: updatedExpenses};
    case 'INITIALIZE_EXPENSES':
      categoryId = payload.uuid;
      categoryExpenses = state[categoryId];
      console.log(categoryExpenses);
      updatedExpenses = [...categoryExpenses, payload];

      return {...state, [categoryId]: updatedExpenses};
    default:
      return state;
  }
};
