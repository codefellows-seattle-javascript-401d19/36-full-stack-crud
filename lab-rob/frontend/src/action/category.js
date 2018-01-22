import uuid from 'uuid/v1';

export const createAction = ({name, budget}) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
    timestamp: new Date(),
    id: uuid(),
  },
});

export const updateAction = category => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
});

export const destroyAction = category => ({
  type: 'CATEGORY_DESTROY',
  payload: category,
});

export const clearAction = () => ({
  type: 'CATEGORY_CLEAR',
});

export const reloadAction = catagories => ({
  type: 'CATEGORY_RELOAD',
  payload: catagories,
});