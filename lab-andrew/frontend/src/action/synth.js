import superagent from 'superagent';

export const createAction = ({name, polyphony, synthCompanyID, id}) => ({
  type: 'SYNTH_CREATE',
  payload: {
    name,
    polyphony,
    synthCompanyID: synthCompanyID,
    id,
    createdOn: new Date(),
  },
});

export const updateAction = synth => ({
  type: 'SYNTH_UPDATE',
  payload: synth,
});

export const removeAction = synth => ({
  type: 'SYNTH_REMOVE',
  payload: synth,
});

export const getSynth = synthID => dispatch => {
  return superagent.get(`http://localhost:3000/api/synth/${synthID}`)
    .then(response => {
      console.log(response);
      dispatch(createAction({
        name: response.body.name,
        polyphony: response.body.polyphony,
        id: response.body._id,
        synthCompanyID: response.body.synthCompany,
      }));
    })
    .catch(err => console.log(err.message));
};

export const postSynth = synth => dispatch => {
  return superagent.post('http://localhost:3000/api/synth/')
    .send({name: synth.name, polyphony: synth.polyphony, synthCompany: synth.synthCompanyID})
    .then(response => {
      console.log(response);
      dispatch(createAction({
        name: response.body.name,
        polyphony: response.body.polyphony,
        id: response.body._id,
        synthCompanyID: response.body.synthCompany,
      }));
    })
    .catch(err => console.log(err.message));
};

export const putSynth = synth => dispatch => {
  return superagent.put(`http://localhost:3000/api/synth/${synth.id}`)
    .send({name: synth.name, polyphony: synth.polyphony})
    .then(response => {
      console.log(response);
      dispatch(updateAction({
        name: response.body.name,
        polyphony: response.body.polyphony,
        id: response.body._id,
        synthCompanyID: response.body.synthCompany,
      }));
    })
    .catch(err => console.log(err.message));
};

export const deleteSynth = synth => dispatch => {
  return superagent.delete(`http://localhost:3000/api/synth/${synth.id}`)
    .then(response => {
      console.log(response);
      return dispatch(removeAction(synth));
    })
    .catch(err => console.log(err.message));
};