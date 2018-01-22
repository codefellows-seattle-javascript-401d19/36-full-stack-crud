let emptyState = {};

const validateExpense = expense => {
  if (!expense.name) {
    throw new Error('expense requires a name');
  }
};
export default (state = emptyState, { type, payload }) => {
  let schoolID, schoolExpenses, updatedExpenses, updatedState;

  switch (type) {
    case 'SCHOOL_CREATE':
      return { ...state, [payload.id]: [] };

    case 'SCHOOL_REMOVE':
      updatedState = { ...state };
      delete updatedState[payload.id];
      return updatedState;

    case 'EXPENSE_CREATE':
      validateExpense(payload);
      schoolID = payload.schoolID;
      schoolExpenses = state[schoolID];
      updatedExpenses = [...schoolExpenses, payload];
      return { ...state, [schoolID]: updatedExpenses };

    case 'EXPENSE_UPDATE':
      schoolID = payload.schoolID;
      schoolExpenses = state[schoolID];
      updatedExpenses = schoolExpenses.map(expense => (expense.id === payload.id ? payload : expense));
      return { ...state, [schoolID]: updatedExpenses };

    case 'EXPENSE_REMOVE':
      schoolID = payload.schoolID;
      schoolExpenses = state[schoolID];
      updatedExpenses = schoolExpenses.filter(expense => expense.id !== payload.id);
      return { ...state, [schoolID]: updatedExpenses };

    default:
      return state;
  }
};
