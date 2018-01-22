let emptyState = {};

const validateExpense = (expense) => {
  if (!expense.name) {
    throw new Error('expense requires a name');
  }
};
export default (state = emptyState, { type, payload }) => {
  let categoryID, categoryExpenses, updatedExpenses, updatedState;

  switch (type) {
    case 'CATEGORY_CREATE':
      return { ...state, [payload.id]: [] };

    case 'CATEGORY_REMOVE':
      updatedState = { ...state };
      delete updatedState[payload.id];
      return updatedState;

    case 'EXPENSE_CREATE':
      validateExpense(payload);
      categoryID = payload.categoryID;
      categoryExpenses = state[categoryID];
      updatedExpenses = [...categoryExpenses, payload];
      return { ...state, [categoryID]: updatedExpenses };

    case 'EXPENSE_UPDATE':
      categoryID = payload.categoryID;
      categoryExpenses = state[categoryID];
      updatedExpenses = categoryExpenses.map(expense => expense.id === payload.id ? payload : expense);
      return { ...state, [categoryID]: updatedExpenses };

    case 'EXPENSE_REMOVE':
      categoryID = payload.categoryID;
      categoryExpenses = state[categoryID];
      updatedExpenses = categoryExpenses.filter(expense => expense.id !== payload.id);
      return { ...state, [categoryID]: updatedExpenses };

    default:
      return state;
  }
};