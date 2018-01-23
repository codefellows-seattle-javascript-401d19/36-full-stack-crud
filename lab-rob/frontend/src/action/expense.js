import uuid from 'uuid/v1';
import superagent from 'superagent';

const apiUrl = 'http://localhost:3000';

export const createAction = (expense) => ({
  type: 'EXPENSE_CREATE',
  payload: expense,
});

export const updateAction = expense => ({
  type: 'EXPENSE_UPDATE',
  payload: expense,
});

export const destroyAction = expense => ({
  type: 'EXPENSE_DESTROY',
  payload: expense,
});

export const clearAction = categoryId => ({
  type: 'EXPENSE_CLEAR',
  payload: categoryId,
});

export const reloadAction = expenses => ({
  type: 'EXPENSE_RELOAD',
  payload: expenses,
});

export const reloadFromDatabaseAction = () => (store) => {
  return superagent.get(`${apiUrl}/api/expenses`)
    .then(response => {
      let {expenses} = response.body;

      let mappedExpenses = {};
      expenses.forEach(expense => {
        if(!mappedExpenses[expense.categoryId])
          mappedExpenses[expense.categoryId] = [];

        mappedExpenses[expense.categoryId].push(expense);
      });

      store.dispatch(reloadAction(mappedExpenses));
    });
};

export const createInDatabaseAction = (expense) => (store) => {
  return superagent.post(`${apiUrl}/api/expenses`)
    .send(expense)
    .then(response => {
      let {expense} = response.body;

      store.dispatch(createAction(expense));
    });
};

export const updateInDatabaseAction = (expense) => (store) => {
  return superagent.put(`${apiUrl}/api/expenses/${expense.id}`)
    .send(expense)
    .then(response => {
      let {expense} = response.body;

      store.dispatch(updateAction(expense));
    });
};

export const destroyInDatabaseAction = (expense) => (store) => {
  return superagent.delete(`${apiUrl}/api/expenses/${expense.id}`)
    .then(() => {
      store.dispatch(destroyAction(expense));
    });
};

export const clearExpensesForCategoryInDatabaseAction = (categoryId) => (store) => {
  return superagent.delete(`${apiUrl}/api/expenses?category=${categoryId}`)
    .then(() => {
      store.dispatch(clearAction(categoryId));
    });
};