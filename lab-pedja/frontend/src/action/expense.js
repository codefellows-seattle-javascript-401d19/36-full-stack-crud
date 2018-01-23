import uuid from "uuid";

export const createAction = ({ countryID, name, price }) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    id: uuid.v1(),
    timestamp: new Date(),
    countryID,
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

