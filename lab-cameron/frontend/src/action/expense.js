import superagent from 'superagent';

export const createAction = ({ name, price, categoryId }) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    name,
    price,
    categoryId,
    timestamp: new Date(),
  },
});

export const updateAction = expense => ({
  type: 'EXPENSE_UPDATE',
  payload: expense,
});

export const removeAction = expense => ({
  type: 'EXPENSE_DELETE',
  payload: expense,
});

export const getExpenses = () => dispatch => {
  return superagent.get(`http://localhost:3000/api/expenses`)
    .then(response => {
      return response.body.forEach(expense => {
        return dispatch(createAction({
          name: expense.name,
          price: expense.price,
          categoryId: expense.categoryId,
          timestamp: expense.timestamp,
        }));
      });
    });
};
