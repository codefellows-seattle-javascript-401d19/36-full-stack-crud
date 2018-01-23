import v1 from 'uuid';
import superagent from 'superagent';

const API_URL = 'http://localhost:3000/api/house';

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

export const getCategories = () => (dispatch) => {
  console.log('DISPATCHING');
  return superagent.get(API_URL)
    .then(response => {
      console.log('AJAX DONE');
      dispatch(createAction({title: 'AJAX IT UP!'}));
    });
};