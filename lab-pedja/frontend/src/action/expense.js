import uuid from "uuid";

export const createAction = ({ categoryID, name, price }) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    id: uuid.v1(),
    timestamp: new Date(),
    categoryID,
    name,
    price,
  }
});

export const updateAction = expense => ({
  type: 'EXPENSE_UPDATE',
  payload: expense,
});

export const destroyAction = expense => ({
  type: 'EXPENSE_DESTROY',
  payload: expense,
});

