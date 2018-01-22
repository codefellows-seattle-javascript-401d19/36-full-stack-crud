import v1 from 'uuid';

export const createAction = ({ title }) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    title,
    id: v1(),
    timestamp: new Date(),
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
