import uuid from 'uuid/v1';
import superagent from 'superagent';

const apiUrl = 'http://localhost:3000';

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

export const reloadAction = categories => ({
  type: 'CATEGORY_RELOAD',
  payload: categories,
});

export const getCategoriesAction = () => (store) => {
  return superagent.get(`${apiUrl}/api/shows?populate=true`)
    .then(response => {
      console.log(response.body);
    });
};