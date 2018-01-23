import uuidv1 from 'uuid/v1';
import superagent from 'superagent';

export const createAction = ({ name, budget }) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
    uuid: uuidv1(),
    timestamp: new Date(),
  },
});

export const updateAction = category => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
});

export const removeAction = category => ({
  type: 'CATEGORY_DESTROY',
  payload: category,
});

export const getCategorys = () => dispatch => {
  return superagent.get(`http://localhost:3000/api/categorys`)
    .then(response => {
      dispatch(createAction({
        type: 'GET_CATEGORIES',
        payload: response.body,
      }));
    });
};
