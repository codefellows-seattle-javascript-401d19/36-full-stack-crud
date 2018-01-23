import uuid from "uuid";
import superagent from "superagent";


// ====================================================
// SYNC ACTIONS
// ====================================================
export const getAction = countries => ({
  type: 'GET_CREATE',
  payload: countries,
});

export const createAction = country => ({
  type: 'COUNTRY_CREATE',
  payload: country
});

export const updateAction = country => ({
  type: 'COUNTRY_UPDATE',
  payload: country,
});

export const destroyAction = country => ({
  type: 'COUNTRY_DESTROY',
  payload: country,
});


// ====================================================
// ASYNC ACTIONS
// ====================================================

export const postCountry = country => dispatch => {
  return superagent.post('http://localhost:3000/api/countries')
    .send(country)
    .then((response) => {
      dispatch(createAction(response.body));

      return response;
    });
}

export const getCountry = () => dispatch => {
  return superagent.get('http://localhost:3000/api/countries')
    .then((response) => {
      dispatch(getAction(response.body));

      return response;
    });
}

export const deleteCountry = country => dispatch => {
  return superagent.delete(`http://localhost:3000/api/countries/${country._id}`)
    .then((response) => {      
      dispatch(destroyAction(country));

      return response;
    })
}

