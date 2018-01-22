import uuid from 'uuid';

export const createAction = ({name, amount, categoryID}) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    name,
    amount,
    categoryID,
    id: uuid.v1(),
    createdOn: new Date(),
  },
});

export const updateAction = (expense) => ({
  type: 'EXPENSE_UPDATE',
  payload: expense,
});

export const removeAction = (expense) => ({
  type: 'EXPENSE_REMOVE',
  payload: expense,
});