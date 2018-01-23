import superagent from 'superagent';

export const createAction = ({ name, budget }) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
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
      return response.body.forEach(category => {
        return dispatch(createAction({
          name: category.name,
          budget: category.budget,
          timestamp: category.timestamp,
        }));
      });
    });
};

export const createCategory = category => dispatch => {
  return superagent.post('http://localhost:3000/api/categorys')
    .send(category)
    .then(response => {
      dispatch(createAction(response.body));
    });
};

// delete incompleted

// update id's will need to be consistent

export const updateCategory = category => dispatch => {
  console.log(category);
  return superagent.put(`http://localhost:3000/api/categorys/${category._id}`)
    .send(category)
    .then(response => {
      dispatch(updateAction(category));
    });
};
