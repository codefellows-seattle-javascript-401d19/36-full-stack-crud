import v1 from 'uuid';
import superagent from 'superagent';

const API_URL = 'http://localhost:3000';

export const createAction = ({ title, id, timestamp }) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    title,
    id,
    timestamp,
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

export const getCategories = () => (store) => {
  console.log('DISPATCHING', store);
  return superagent.get(`${API_URL}/api/category`)
    .then(response => {
      console.log('AJAX DONE', response.body);
      response.body.forEach(category => {
        store.dispatch(createAction({
          title: category.name, 
          id: category._id, 
          timestamp: category.timestamp,
        }));
      });
    });
};

export const postCategories = (category) => (store) => {
  console.log('DISPATCHING', store);
  return superagent.post(`${API_URL}/api/category`)
    .send({name: category.name})
    .then(response => {
      console.log('AJAX DONE', response.body);
      store.dispatch(createAction(response.body[0]));
    });
};