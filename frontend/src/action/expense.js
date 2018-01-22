import uuid from 'uuid/v1';

export const createAction = ({ name, price, categoryID }) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    name,
    price,
    categoryID,
    id: uuid(),
    timeStamp: new Date(),
  },
});
export const updateAction = (expense) => ({
  type: 'EXPENSE_UPDATE',
  payload: expense,
});
export const removeAction = (expense) => ({
  type: 'EXPENSE_DESTROY',
  payload: expense,
});
