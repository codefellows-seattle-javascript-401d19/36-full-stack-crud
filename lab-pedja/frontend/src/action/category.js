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

// TODO: add superagent NPM

export const postCountries = () => dispatch => {
  return superagent.post('http://localhost:3000/api/countries')
    .send({
      name : 'USA',
      keywords : ['animals', 'cute'],
    })
    .then((response) => {
      dispatch(createAction({title: response.body.name}));
    });
}
