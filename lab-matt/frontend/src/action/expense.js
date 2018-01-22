import v1 from 'uuid';

export const createAction = ({ title, price, categoryID }) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    title,
    price, 
    id: v1(),
    categoryID,
    timestamp: new Date(),
  },
});

export const updateAction = (expense) => {
  return {
    type: 'EXPENSE_UPDATE',
    payload: expense,
  };
};

export const removeAction = (expense) => ({
  type: 'EXPENSE_REMOVE',
  payload: expense,
});
