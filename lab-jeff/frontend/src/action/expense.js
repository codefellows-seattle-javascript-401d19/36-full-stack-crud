const uuidv1 = require('uuid/v1');

export const createAction = ({ schoolID, name, price }) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    schoolID,
    name,
    price,
    id: uuidv1(),
    timestamp: new Date(),
  },
});

export const updateAction = expense => ({
  type: 'EXPENSE_UPDATE',
  payload: expense,
});

export const removeAction = expense => ({
  type: 'EXPENSE_REMOVE',
  payload: expense,
});
