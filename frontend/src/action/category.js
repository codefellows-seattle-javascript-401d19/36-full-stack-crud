import uuid from 'uuid/v1';
import superagent from 'superagent';

export const createAction = ({name, budget, period}) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
    period,
    id: uuid(),
    timeStamp: new Date(),
  },
});
export const updateAction = (category) => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
});
export const removeAction = (category) => ({
  type: 'CATEGORY_DESTROY',
  payload: category,
});

// asynchronous action creators
export const getBudget = () => (dispatch) => {
  console.log('DISPATCH:', dispatch);
  console.log('DOING AJAX');
  return superagent.get('http://localhost:3000/api/notes')
    .then((response) => {
      console.log('AJAX DONE', response);
      let count = response.body.count;
      let data = response.body.data;
      dispatch(createAction({ title: 'Celebration!' }));
    });
};
