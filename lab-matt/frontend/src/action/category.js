import v1 from 'uuid';
import superagent from 'superagent';

const API_URL = 'http://localhost:3000';

export const createAction = (category) => ({
  type: 'CATEGORY_CREATE',
  payload: category,
});

export const updateAction = (category) => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
});

export const removeAction = (category) => ({
  type: 'CATEGORY_REMOVE',
  payload: category,
});

// routes
export const getCategories = () => (store) => {
  return superagent.get(`${API_URL}/api/category`)
    .then(response => {
      console.log('GETTING CATEGORIES', response.body);
      response.body.forEach(category => {
        store.dispatch(createAction(category));
      });
    });
};

export const postCategories = (category) => (store) => {
  return superagent.post(`${API_URL}/api/category`)
    .send({name: category.name})
    .then(response => {
      console.log('CREATING CATEGORY', response.body);
      store.dispatch(createAction(response.body));
    });
};

export const putCategories = (category) => (store) => {
  return superagent.put(`${API_URL}/api/category/${category._id}`)
    .send(category)
    .then(response => {
      console.log('UPDATING CATEGORY', response.body);
      store.dispatch(updateAction(response.body));
    });
};

export const deleteCategories = (category) => (store) => {
  return superagent.delete(`${API_URL}/api/category/${category._id}`)
    .then(response => {
      console.log('DELETING CATEGORY?', 
        response.body ? false : true);
      store.dispatch(removeAction(category));
    });
};