const uuidv1 = require('uuid/v1');

export const createAction = ({ name, budget }) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    id: uuidv1(),
    timestamp: new Date(),
    budget,
  },
});

export const updateAction = (category) => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
});

export const removeAction = (category) => ({
  type: 'CATEGORY_REMOVE',
  payload: category,
});