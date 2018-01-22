import uuidv1 from 'uuid/v1';

export const createAction = ({ name, price, categoryId }) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    name,
    price,
    id: uuidv1(),
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
