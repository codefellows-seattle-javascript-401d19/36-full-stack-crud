
const uuidv1 = require('uuid/v1');

import superagent from 'superagent';

// create 
export const createAction = ({name, budgetTotal}) => ({
  type : 'CATEGORY_CREATE',
  payload : {
    name,
    budgetTotal,
    id: uuidv1(),
    timeStamp: new Date(), 
  },
});

// update 
export const updateAction = (category) => ({
  type : 'CATEGORY_UPDATE',
  payload : category,
});

// remove
export const removeAction = (category) => ({
  type : 'CATEGORY_DESTROY',
  payload : category,
});

// asynch action creator
export const getCategories = () => (dispatch) => {
  console.log('DISPATCH', dispatch);
  console.log('DOING AJAX');
  return superagent.get('http://localhost:3000/api/categories')
    .then((response) => {
      console.log('AJAX DONE', response);
      let count = response.body.count;
      let data = response.body.data;
      dispatch(createAction({name: 'Woot!'}));
    });
};

export const deleteCategory = () => (dispatch) => {
  console.log('DISPATCH delete category', dispatch);
  console.log('DOING AJAX on delete category');
  return superagent.delete('http://localhost:3000/api/categories/:id')
    .then((response) => {
      console.log('AJAX DONE', response);
      let count = response.body.count;
      let data = response.body.data;
      dispatch(removeAction({}));
    });
};