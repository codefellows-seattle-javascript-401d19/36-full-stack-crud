import uuidv1 from 'uuid/v1';
import superagent from 'superagent';

export const createAction = ({ name, price, categoryId }) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    name,
    price,
    uuid: uuidv1(),
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
      dispatch(createAction({
        type: 'GET_EXPENSES',
        payload: response.body,
      }));
    });
};
