import uuid from 'uuid';
import superagent from 'superagent';

export const createAction = ({name, budget}) => ({
  type: 'CATEGORY_CREATE',
  payload : {
    name,
    budget,
    id: uuid.v1(),
    timestamp: new Date(),
  },
});

export const updateAction = (category) => ({
  type : 'CATEGORY_UPDATE',
  payload : category,
});

export const removeAction = (category) => ({
  type : 'CATEGORY_REMOVE',
  payload : category,
});

export const postCategories = (category) => (dispatch) => {
  console.log('DISPATCH:', dispatch);
  console.log('DOING AJAX');
  return superagent.post('http://localhost:3000/api/categories')
    .send(category)
    .then((response) => {
      console.log('AJAX DONE', response);
      let count = response.body.count;
      let data = response.body.data;
      dispatch(createAction({name: 'Celebration!', budget: 'hi'}));
    });
};

export const getCategories = () => (dispatch) => {
  console.log('DISPATCH:', dispatch);
  console.log('DOING AJAX');
  return superagent.get('http://localhost:3000/api/categories/')
    .then((response) => {
      console.log('AJAX DONE', response);
      let count = response.body.count;
      let data = response.body.data;
      dispatch(createAction({name: 'Celebration!', budget: 'hi'}));
    });
};
