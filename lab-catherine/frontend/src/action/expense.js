import uuidv1 from 'uuid/v1';

export const createAction = ({name, price, categoryID}) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    name,
    price,
    categoryID,
    id: uuidv1(),
    timestamp: new Date(),
  },
});

export const updateAction = (expense) => ({
  type: 'EXPENSE_UPDATE',
  payload: expense,
});

export const removeAction = (expense) => ({
  type: 'EXPENSE_DELETE',
  payload: expense,
});