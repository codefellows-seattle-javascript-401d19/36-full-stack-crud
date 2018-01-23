import superagent from 'superagent';

export const createAction = ({ name, price, categoryId, _id }) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    name,
    price,
    categoryId,
    timestamp: new Date(),
    _id,
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
          _id: expense._id,
        }));
      });
    });
};

export const createExpense = expense => dispatch => {
  return superagent.post(`http://localhost:3000/api/expenses`)
    .send(expense)
    .then(response => {
      console.log(response.body);
      dispatch(createAction(response.body));
    });
};

export const updateExpense = expense => dispatch => {
  return superagent.put(`http://localhost:3000/api/expenses/${expense._id}`)
    .send(expense)
    .then(response => {
      dispatch(updateAction(expense));
    });
};

export const removeExpense = expense => dispatch => {
  return superagent.delete(`http://localhost:3000/api/expenses/${expense._id}`)
    .then(expense)
    .then(response => {
      dispatch(removeAction(expense));
    });
};
