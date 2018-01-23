import superagent from 'superagent';

export const createAction = ({name, location, id}) => ({
  type: 'SYNTHCOMPANY_CREATE',
  payload: {
    name,
    location,
    id,
    createdOn: new Date(),
  },
});

export const updateAction = synthCompany => ({
  type: 'SYNTHCOMPANY_UPDATE',
  payload: synthCompany,
});

export const removeAction = synthCompany => ({
  type: 'SYNTHCOMPANY_REMOVE',
  payload: synthCompany,
});

export const getSynthCompanies = () => dispatch => {
  return superagent.get('http://localhost:3000/api/company/')
    .then(response => {
      console.log(response);
      response.body.forEach(e => {
        dispatch(createAction({
          name: e.name, 
          location: e.location, 
          id: e._id,
        }));
      });
    })
    .catch(err => console.log(err.message));
};

export const postSynthCompany = synthCompany => dispatch => {
  return superagent.post('http://localhost:3000/api/company/')
    .send({name: synthCompany.name, location: synthCompany.location})
    .then(response => {
      console.log(response);
      dispatch(createAction({
        name: response.body.name,
        location: response.body.location,
        id: response.body._id,
      }));
    })
    .catch(err => console.log(err.message));
};

export const putSynthCompany = synthCompany => dispatch => {
  return superagent.put(`http://localhost:3000/api/company/${synthCompany.id}`)
    .send({name: synthCompany.name, location: synthCompany.location})
    .then(response => {
      console.log(response);
      dispatch(updateAction({
        name: response.body.name,
        location: response.body.location,
        id: response.body._id,
      }));
    })
    .catch(err => console.log(err.message));
};

export const deleteSynthCompany = synthCompany => dispatch => {
  return superagent.delete(`http://localhost:3000/api/company/${synthCompany.id}`)
    .then(response => {
      console.log(response);
      return dispatch(removeAction(synthCompany));
    })
    .catch(err => console.log(err.message));
};