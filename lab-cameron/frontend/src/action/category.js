import superagent from 'superagent';

export const createAction = ({ name, budget, _id }) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
    timestamp: new Date(),
    _id,
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
          _id: category._id,
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

export const deleteCategory = category => dispatch => {
  return superagent.delete(`http://localhost:3000/api/categorys/${category._id}`)
    .send(category)
    .then(response => {
      dispatch(removeAction(category));
    });
};

export const updateCategory = category => dispatch => {
  console.log(category);
  return superagent.put(`http://localhost:3000/api/categorys/${category._id}`)
    .send(category)
    .then(response => {
      dispatch(updateAction(category));
    });
};
