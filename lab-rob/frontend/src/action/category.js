import uuid from 'uuid/v1';
import superagent from 'superagent';

const apiUrl = 'http://localhost:3000';

export const createAction = category => ({
  type: 'CATEGORY_CREATE',
  payload: category,
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

export const reloadFromDatabaseAction = () => (store) => {
  return superagent.get(`${apiUrl}/api/categories`)
    .then(response => {
      let {categories} = response.body;

      store.dispatch(reloadAction(categories));
    });
};

export const createInDatabaseAction = (category) => (store) => {
  return superagent.post(`${apiUrl}/api/categories`)
    .send(category)
    .then(response => {
      let {category} = response.body;

      store.dispatch(createAction(category));
    });
};

export const updateInDatabaseAction = (category) => (store) => {
  return superagent.put(`${apiUrl}/api/categories/${category.id}`)
    .send(category)
    .then(response => {
      let {category} = response.body;

      store.dispatch(updateAction(category));
    });
};

export const destroyInDatabaseAction = (category) => (store) => {
  return superagent.delete(`${apiUrl}/api/categories/${category.id}`)
    .then(() => {
      store.dispatch(destroyAction(category));
    });
};

export const clearDatabaseAction = () => (store) => {
  return superagent.delete(`${apiUrl}/api/categories`)
    .then(() => {
      store.dispatch(clearAction());
    });
};

