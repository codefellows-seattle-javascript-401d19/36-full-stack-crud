import uuid from 'uuid/v1';
import superagent from 'superagent';

const apiUrl = 'http://localhost:3000';

export const createAction = ({name, price, categoryId}) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    name,
    price,
    categoryId,
    timestamp: new Date(),
    id: uuid(),
  },
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
      console.log(response);
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