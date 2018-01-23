import uuid from "uuid";
import superagent from "superagent";

export const createAction = ({ name, budget }) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    id: uuid.v1(),
    timestamp: new Date(),
    name,
    budget,
  }
});

export const updateAction = category => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
});

export const destroyAction = category => ({
  type: 'CATEGORY_DESTROY',
  payload: category,
});

export const postCountry = () => dispatch => {
  return superagent.post('http://localhost:3000/api/countries')
    .send({
      name : 'Costa Rica'
    })
    .then((response) => {
      dispatch(createAction({name: response.body.name}));
    });
}


// TODO: change category to country
export const deleteCountry = (country) => dispatch => {
  return superagent.delete(`http://localhost:3000/api/countries/${country._id}`)
    .then((response) => {
      dispatch(destroyAction(country));
      return response;
    })
}
