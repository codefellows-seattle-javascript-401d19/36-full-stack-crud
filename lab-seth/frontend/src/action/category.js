import superagent from 'superagent';

export const createAction = ({ name, budget, period, id}) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    budget,
    period,
    id,
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
export const postCategories = (data) => (dispatch) => {
  return superagent.post('http://localhost:7000/api/categories')
    .send({
      name: data.name,
      budget: data.budget,
      period: data.period,
    })
    .then((response) => {
      console.log('CATEGORY POST Response:', response);
      let data = response.body;
      if (data) {
        dispatch(createAction({ name: data.name, budget: data.budget, period: data.period, id: data._id }));
      }
      else {
        console.log('NO RESPONSE DATA SENT BACK FROM DB');
        throw new TypeError('__ERROR__ No Response back From Database!');
      }
    })
    .catch(next);
};

export const getCategories = () => (dispatch) => {
  console.log('DISPATCH:', dispatch);
  return superagent.get('http://localhost:7000/api/categories')
    .then((response) => {
      console.log('CATEGORY GET DONE', response);
      let data = response.body;
      if (data) {
        data.map(category => {
          console.log('EACH CATEGORY:', category);
          dispatch(createAction({ name: category.name, budget: category.budget, period: category.period, id: category._id }));
        });
      }
      else {
        console.log('NO RESPONSE DATA SENT BACK FROM DB');
        throw new TypeError('__ERROR__ No Response back From Database!');
      }
    })
    .catch(next);
};
